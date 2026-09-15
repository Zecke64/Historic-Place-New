import {iconRules, invisibleStyle} from "../config/icons.js";
import {getIconRule} from "./icons.js";
import {clearPendingPermalinkPoi, getPendingPermalinkPoi} from "./permalink.js";
import {showPopup} from "./popup.js";
import {normalizeTags} from "./utils.js";
import {prefetchWikidata} from "./wikidata.js";
import {resolvedZoomClasses as zoomClasses} from "./zoomclasses.js";

const ENABLE_POI_CLUSTERING = false;

// diese Werte werden für members von site-Relationen benötigt
const iconCheckMinZoom = Math.min(
    ...zoomClasses.map(zoomClass => zoomClass.min_zoom)
);
const iconCheckMaxZoom = Math.max(
    ...iconRules.flatMap(rule =>
        Object.keys(rule.zoom || {}).map(Number)
    )
);

const loadedFeatureIds = new Set();
const loadedFeatures = new Map();

const zoomClassState = new Map();

for (const zoomClass of zoomClasses) {
    zoomClassState.set(zoomClass.id, {
        loadedTiles : new Set(),
        loadingTiles : new Set(),
        features : [],
    });
}

const OVERPASS_URL =
    //    "https://overpass.maprva.org/api/interpreter";
    //    "https://overpass-api.de/api/interpreter";
    //    "https://overpass.private.coffee/api/interpreter";
    //"https://mystic.historic.place:4443/api/interpreter";
    "https://mystic.historic.place:4445/api/interpreter";
    //"https://mystic.historic.place:4446/api/interpreter";

const sourceId = "osm-pois";
const MAX_PARALLEL_REQUESTS = 8;

//const DEBUG_WAY = "way/24606979";   // Nikolaikirche Leipzig

// reine Hilfsfunktion für's debuggen
function debugWay(featureOrElement, message, data = null) {
    const type = featureOrElement.type ?? featureOrElement.properties?._osm_type;
    const id = featureOrElement.id ?? featureOrElement.properties?._osm_id;

    if (`${type}/${id}` !== DEBUG_WAY)
        return;

    if (data !== null)
        console.log(`[DEBUG ${DEBUG_WAY}] ${message}`, data);
    else
        console.log(`[DEBUG ${DEBUG_WAY}] ${message}`);
}



let loadPOIsRunning = false;
let loadPOIsPending = false;
let loadPOIsController = null;
let prefetchTimer = null;
let prefetchController = null;
let prefetchPending = false;

export function initOverpassLayer(map) {

    // GeoJSON Source mit aktiviertem Clustering
    map.addSource(sourceId, {
        type : "geojson",
        data : {type : "FeatureCollection", features : []},

        ...(ENABLE_POI_CLUSTERING ? {cluster : true, clusterRadius : 30, clusterMaxZoom : 16} : {})
    });

    map.addSource("osm-object-polygons",
                  {type : "geojson", data : {type : "FeatureCollection", features : []}});

    map.addSource("osm-object-lines",
                  {type : "geojson", data : {type : "FeatureCollection", features : []}});

    if (ENABLE_POI_CLUSTERING) {
        // Cluster-Kreise
        map.addLayer({
            id : "poi-clusters",
            type : "circle",
            source : sourceId,
            filter : [ "has", "point_count" ],
            paint : {
                "circle-radius" : [ "step", [ "get", "point_count" ], 18, 20, 24, 50, 32, 100, 40 ],
                "circle-stroke-width" : 2,
                "circle-stroke-color" : "#ffffff",
                "circle-color" : "#3388ff"
            }
        });

        // Cluster Anzahl
        map.addLayer({
            id : "poi-cluster-count",
            type : "symbol",
            source : sourceId,
            filter : [ "has", "point_count" ],
            layout : {"text-field" : "{point_count}", "text-size" : 14},
            paint : {"text-color" : "#ffffff"}
        });
    }

    // Flächen füllen
    map.addLayer({
        id : "osm-object-fill",
        type : "fill",
        source : "osm-object-polygons",
        paint :
            {"fill-color" : [ "get", "_fill_color" ], "fill-opacity" : [ "get", "_fill_opacity" ]}
    });

    // Polygonumrisse
    map.addLayer({
        id : "osm-object-line",
        type : "line",
        source : "osm-object-polygons",
        paint : {"line-color" : [ "get", "_line_color" ], "line-width" : [ "get", "_line_width" ]}
    });

    // Linienobjekte
    map.addLayer({
        id : "osm-object-lines",
        type : "line",
        source : "osm-object-lines",
        paint : {"line-color" : [ "get", "_line_color" ], "line-width" : [ "get", "_line_width" ]}
    });

    map.addSource("osm-object-icons",
                  {type : "geojson", data : {type : "FeatureCollection", features : []}});

    map.addLayer({
        id : "osm-object-icons",
        type : "symbol",
        source : "osm-object-icons",
        layout : {
            "icon-image" : [ "get", "_app_icon" ],
            "icon-size" : [ "get", "_app_icon_size" ],
            "icon-allow-overlap" : true
        }
    });

    // Einzelne POIs
    map.addLayer({
        id : "osm-pois",
        type : "symbol",
        source : sourceId,
        filter : [ "!", [ "has", "point_count" ] ],
        layout : {
            "icon-image" : [ "get", "_app_icon" ],
            "icon-size" : [ "get", "_app_icon_size" ],
            "icon-rotate": ["get", "_app_icon_rotate"],
            "icon-allow-overlap" : true
        }
    });

    // Cluster anklicken
    map.on("click", "poi-clusters", async e => {
        const feature = e.features[0];
        const clusterId = feature.properties.cluster_id;
        const source = map.getSource(sourceId);

        try {
            const zoom = await source.getClusterExpansionZoom(clusterId);
            map.easeTo({center : feature.geometry.coordinates, zoom : zoom});
        } catch (error) {
            console.error("Cluster Zoom Fehler:", error);
        }
    });

    // Cursor
    map.on("mouseenter", "poi-clusters", () => { map.getCanvas().style.cursor = "pointer"; });

    map.on("mouseleave", "poi-clusters", () => { map.getCanvas().style.cursor = ""; });

    // POIs laden
    loadPOIs(map);

    // Zoomvorgang merken
    map.on("zoomstart", () => {
        if (loadPOIsRunning && loadPOIsController) {
            console.log("ZOOM START – laufende Requests abbrechen");
            loadPOIsController.abort();
        }
    });

    map.on("zoomend", () => {
        updateFeatureStyles(map.getZoom());
        updateMapSources(map);
        // Hier müssen die drei/vier GeoJSON-Sources
        // mit den aktualisierten Features neu gesetzt werden.
    });

    // Nach Kartenbewegung neu laden
    map.on("moveend", () => { loadPOIs(map); });
}

function lon2tileX(lon, zoom) { return Math.floor((lon + 180) / 360 * Math.pow(2, zoom)); }

function lat2tileY(lat, zoom) {
    const latRad = lat * Math.PI / 180;
    return Math.floor((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2 * Math.pow(2, zoom));
}

function tile2lon(x, zoom) { return x / Math.pow(2, zoom) * 360 - 180; }

function tile2lat(y, zoom) {
    const n = Math.PI - 2 * Math.PI * y / Math.pow(2, zoom);
    return 180 / Math.PI * Math.atan(Math.sinh(n));
}

function getTilesForBounds(bounds, zoom) {
    const xMin = lon2tileX(bounds.getWest(), zoom);
    const xMax = lon2tileX(bounds.getEast(), zoom);
    const yMin = lat2tileY(bounds.getNorth(), zoom);
    const yMax = lat2tileY(bounds.getSouth(), zoom);

    const tiles = [];

    for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
            tiles.push({x : x, y : y, zoom : zoom});
        }
    }

    return tiles;
}




function updateMapSources(map) {

    const features = [];

    for (const state of zoomClassState.values()) {
        features.push(...state.features);
    }

    const poiFeatures =
        features.filter(feature =>
            feature.geometry.type === "Point" &&
            feature.properties._app_icon !== "null");

    const objectFeatures =
        features.filter(feature =>
            feature.geometry.type !== "Point");

    const polygonFeatures =
        objectFeatures.filter(feature =>
            feature.geometry.type === "Polygon");

    const lineFeatures =
        objectFeatures.filter(feature =>
            feature.geometry.type === "LineString");

    const objectIconFeatures =
        objectFeatures
            .filter(feature =>
                feature.properties._app_icon !== "null")
            .map(feature => {

                const coordinates =
                    feature.properties._icon_coordinates;

                if (!coordinates)
                    return null;

                return {
                    type : "Feature",
                    geometry : {
                        type : "Point",
                        coordinates : coordinates
                    },
                    properties : {
                        ...feature.properties
                    }
                };
            })
            .filter(Boolean);

    map.getSource(sourceId)?.setData({
        type : "FeatureCollection",
        features : poiFeatures
    });

    map.getSource("osm-object-polygons")?.setData({
        type : "FeatureCollection",
        features : polygonFeatures
    });

    map.getSource("osm-object-lines")?.setData({
        type : "FeatureCollection",
        features : lineFeatures
    });

    map.getSource("osm-object-icons")?.setData({
        type : "FeatureCollection",
        features : objectIconFeatures
    });
}



function getTileBounds(tile) {
    return new maplibregl.LngLatBounds(
        [ tile2lon(tile.x, tile.zoom), tile2lat(tile.y + 1, tile.zoom) ],
        [ tile2lon(tile.x + 1, tile.zoom), tile2lat(tile.y, tile.zoom) ]);
}

function getRectangleBounds(rectangle) {
    const zoom = rectangle.tiles[0].zoom;

    const firstTile = {zoom : zoom, x : rectangle.minX, y : rectangle.minY};

    const lastTile = {zoom : zoom, x : rectangle.maxX, y : rectangle.maxY};

    const firstBounds = getTileBounds(firstTile);
    const lastBounds = getTileBounds(lastTile);

    return new maplibregl.LngLatBounds([ firstBounds.getWest(), lastBounds.getSouth() ],
                                       [ lastBounds.getEast(), firstBounds.getNorth() ]);
}



function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}


function createObjectTypeQuery(key, values, lifecycle = false) {

    const valueRegex =
        values.length === 1
            ? `^${escapeRegex(values[0])}$`
            : `^(${values.map(escapeRegex).join("|")})$`;

    if (!lifecycle) {
        return `["${key}"~"${valueRegex}"]`;
    }

    return `[~"^(disused:|abandoned:|razed:)*${key}$"~"${valueRegex}"]`;
}




function createQueryForZoomClass(zoomClass, bounds) {

    const bbox =
        `${bounds.getSouth()},${bounds.getWest()},` +
        `${bounds.getNorth()},${bounds.getEast()}`;

    // Gleiche Keys zusammenfassen.
    //
    // lifecycle und key bilden gemeinsam den Gruppierungsschlüssel,
    // weil z. B. "historic" und "disused:historic" unterschiedliche
    // Overpass-Selektoren ergeben.
    const grouped = new Map();

    for (const group of zoomClass.groups) {

        const lifecycle = group.lifecycle === true;

        for (const [key, value] of group.objectTypes) {

            const groupKey = `${lifecycle}:${key}`;

            if (!grouped.has(groupKey)) {
                grouped.set(groupKey, {
                    key,
                    lifecycle,
                    values: []
                });
            }

            grouped.get(groupKey).values.push(value);
        }
    }

    const queries = [];

    for (const { key, lifecycle, values } of grouped.values()) {

        const uniqueValues = [...new Set(values)];

        const objectTypeQuery =
            createObjectTypeQuery(
                key,
                uniqueValues,
                lifecycle
            );

        queries.push(
            `nwr${objectTypeQuery}(${bbox});`
        );
    }

    return `
[out:json][timeout:30];

(
    ${queries.join("\n")}
);

out geom qt 500;
`;
}




//möglichst wenige Rechtecke bilden
function mergeTilesIntoRectangles(tiles) {

    if (tiles.length === 0)
        return [];

    const tileMap = new Map(
        tiles.map(tile => [`${tile.x}/${tile.y}`, tile])
    );

    const rectangles = [];

    // ------------------------------------------------------------
    // 1. Horizontale Segmente bilden
    // ------------------------------------------------------------

    const rows = new Map();

    for (const tile of tiles) {

        if (!rows.has(tile.y))
            rows.set(tile.y, []);

        rows.get(tile.y).push(tile.x);
    }

    for (const [y, xs] of rows) {

        xs.sort((a, b) => a - b);

        let start = xs[0];
        let previous = xs[0];

        for (let i = 1; i <= xs.length; i++) {

            const x = xs[i];

            if (x === previous + 1) {
                previous = x;
                continue;
            }

            rectangles.push({
                minX : start,
                maxX : previous,
                minY : y,
                maxY : y
            });

            start = x;
            previous = x;
        }
    }

    // ------------------------------------------------------------
    // 2. Identische Segmente über mehrere Zeilen zusammenfassen
    // ------------------------------------------------------------

    rectangles.sort((a, b) =>
        a.minY - b.minY ||
        a.minX - b.minX
    );

    let merged = [];

    for (const rectangle of rectangles) {

        const previous = merged[merged.length - 1];

        if (
            previous &&
            previous.minX === rectangle.minX &&
            previous.maxX === rectangle.maxX &&
            previous.maxY + 1 === rectangle.minY
        ) {
            previous.maxY = rectangle.maxY;
        }
        else {
            merged.push({...rectangle});
        }
    }

    rectangles.length = 0;
    rectangles.push(...merged);

    // ------------------------------------------------------------
    // 3. Rechtecke horizontal oder vertikal zusammenführen
    // ------------------------------------------------------------

    let changed = true;

    while (changed) {

        changed = false;

        outer:
        for (let i = 0; i < rectangles.length; i++) {

            for (let j = i + 1; j < rectangles.length; j++) {

                const a = rectangles[i];
                const b = rectangles[j];

                // Vertikal direkt übereinander und gleiche Breite.
                if (
                    a.minX === b.minX &&
                    a.maxX === b.maxX &&
                    (
                        a.maxY + 1 === b.minY ||
                        b.maxY + 1 === a.minY
                    )
                ) {
                    rectangles[i] = {
                        minX : a.minX,
                        maxX : a.maxX,
                        minY : Math.min(a.minY, b.minY),
                        maxY : Math.max(a.maxY, b.maxY)
                    };

                    rectangles.splice(j, 1);

                    changed = true;
                    break outer;
                }

                // Horizontal direkt nebeneinander und gleiche Höhe.
                if (
                    a.minY === b.minY &&
                    a.maxY === b.maxY &&
                    (
                        a.maxX + 1 === b.minX ||
                        b.maxX + 1 === a.minX
                    )
                ) {
                    rectangles[i] = {
                        minX : Math.min(a.minX, b.minX),
                        maxX : Math.max(a.maxX, b.maxX),
                        minY : a.minY,
                        maxY : a.maxY
                    };

                    rectangles.splice(j, 1);

                    changed = true;
                    break outer;
                }
            }
        }
    }

    // ------------------------------------------------------------
    // 4. Tiles der Rechtecke wieder zuordnen
    // ------------------------------------------------------------

    for (const rectangle of rectangles) {

        rectangle.tiles = [];

        for (let y = rectangle.minY; y <= rectangle.maxY; y++) {

            for (let x = rectangle.minX; x <= rectangle.maxX; x++) {

                const tile = tileMap.get(`${x}/${y}`);

                if (tile)
                    rectangle.tiles.push(tile);
            }
        }
    }

    return rectangles;
}



/*
   Variante klassisch

function mergeTilesIntoRectangles(tiles) {
    if (tiles.length === 0)
        return [];

    const tileMap = new Map(tiles.map(tile => [`${tile.x}/${tile.y}`, tile]));
    const remaining = new Set(tileMap.keys());
    const rectangles = [];

    while (remaining.size > 0) {
        let best = null;

        // Jedes noch vorhandene Tile als möglichen
        // linken oberen/rechten Ausgangspunkt testen.

        for (const key of remaining) {
            const [x0, y0] = key.split("/").map(Number);

            // Zunächst maximale Breite in dieser Zeile.

            let maxWidth = 0;

            while (remaining.has(`${x0 + maxWidth}/${y0}`)) {
                maxWidth++;
            }

            let width = maxWidth;
            let height = 0;

            // Rechteck zeilenweise nach unten erweitern.

            while (width > 0) {
                const y = y0 + height;

                let rowWidth = 0;

                while (rowWidth < width && remaining.has(`${x0 + rowWidth}/${y}`)) {
                    rowWidth++;
                }
                width = rowWidth;
                if (width === 0)
                    break;
                height++;
                const area = width * height;
                if (!best || area > best.area) {
                    best = {minX : x0, minY : y0, width : width, height : height, area : area};
                }
            }
        }

        if (!best)
            break;

        const rectangleTiles = [];

        for (let y = best.minY; y < best.minY + best.height; y++) {
            for (let x = best.minX; x < best.minX + best.width; x++) {
                const key = `${x}/${y}`;
                rectangleTiles.push(tileMap.get(key));
                remaining.delete(key);
            }
        }

        rectangles.push({
            minX : best.minX,
            maxX : best.minX + best.width - 1,
            minY : best.minY,
            maxY : best.minY + best.height - 1,
            tiles : rectangleTiles
        });
    }

    return rectangles;
}
*/


async function loadPOIs(map) {
    
    if (loadPOIsRunning) {
        console.log("LOAD POIS bereits aktiv – neuer Aufruf vorgemerkt");

        loadPOIsPending = true;
        return;
    }

    loadPOIsRunning = true;
    loadPOIsPending = false;
    loadPOIsController = new AbortController();

    console.log("LOAD POIS START");

    try {
        const zoom = map.getZoom();

        // Unterhalb der ersten Zoomklasse

        if (zoom < 6) {
            clearSource(map);
            return;
        }

        // Alle Zoomklassen ermitteln, die bei diesem Zoom aktiv sind.
        //
        // Die Klassen sind kumulativ:
        // Bei z14 sind also z12_13 UND z14 aktiv.

        const activeClasses = zoomClasses.filter(zoomClass => zoom >= zoomClass.minZoom);
        const bounds = map.getBounds();

        // Aktive Zoomklassen laden

        for (const zoomClass of activeClasses) {

            // Laufzeitdaten dieser Zoomklasse holen.
            const state = zoomClassState.get(zoomClass.id);
            if (!state)
                continue;

            // Kacheln für diese Zoomklasse bestimmen.
            //
            // Wichtig:
            // Die Kachelgröße richtet sich nach dem minZoom der jeweiligen Zoomklasse.
            const tiles = getTilesForBounds(bounds, zoomClass.minZoom);

            // Bereits geladene Tiles brauchen keinen Request.
            const tilesToLoad = tiles.filter(tile => {
                const tileId = `${tile.zoom}/${tile.x}/${tile.y}`;

                return !state.loadedTiles.has(tileId);
            });

            console.log("TILES ZU LADEN:", zoomClass.id, tilesToLoad.length);

            // Benachbarte Tiles zu möglichst großen Rechtecken zusammenfassen.
            const rectangles = mergeTilesIntoRectangles(tilesToLoad);

            console.log("RECTANGLES:", zoomClass.id, rectangles.length,
                        rectangles.map(rectangle => ({
                                           x : `${rectangle.minX}..${rectangle.maxX}`,
                                           y : `${rectangle.minY}..${rectangle.maxY}`,
                                           tiles : rectangle.tiles.length
                                       })));

            // Rechtecke laden.
            //
            // Vorerst bewusst sequentiell:
            // Ein Rechteck = ein Overpass-Request.
            for (const rectangle of rectangles) {
                await loadTileRectangle(rectangle, zoomClass, state, loadPOIsController.signal, zoom);
            }
        }

        // Alle Features der momentan aktiven Zoomklassen zusammenführen.
        //
        // Beispiel:
        //
        // z12_13:  70 Objekte
        // z14:     25 Objekte
        //
        // => bei Zoom 14 werden 95 Objekte angezeigt.

        const features = [];
        const globalIds = new Set();

        for (const zoomClass of activeClasses) {
            const state = zoomClassState.get(zoomClass.id);

            if (!state)
                continue;

            for (const feature of state.features) {
                const id = feature.properties._osm_type + "/" + feature.properties._osm_id;

                // Sicherheitshalber auch zoomklassenübergreifend
                // doppelte OSM-Objekte vermeiden.
                if (!globalIds.has(id)) {
                    globalIds.add(id);
                    features.push(feature);
                }
            }
        }

        console.log("Gesamt POIs:", features.length);

        // GeoJSON für MapLibre erzeugen.

        const allPointFeatures = features.filter(feature => feature.geometry.type === "Point");
        const poiFeatures = features.filter(feature => feature.geometry.type === "Point" &&
                                                       feature.properties._app_icon !== "null");

        console.log("POINTS GESAMT:", allPointFeatures.length);
        console.log("POINTS MIT ICON:", poiFeatures.length);

        updateMapSources(map);

        // Prüfen, ob ein POI aus einem Permalink geöffnet werden soll.
        const pendingPoi = getPendingPermalinkPoi();

        if (pendingPoi) {
            console.log("PERMALINK POI gefunden:", pendingPoi);

            const [osmType, osmId] = pendingPoi.split("/");
            const feature =
                features.find(feature => feature.properties._osm_type === osmType &&
                                         String(feature.properties._osm_id) === String(osmId));

            if (feature) {
                console.log("PERMALINK POI Feature gefunden:", feature);

                await showPopup(map, feature);
            } else {
                console.log("PERMALINK POI nicht in geladenen Features:", pendingPoi);
            }
        }

    } // try

    finally {
        const pending = loadPOIsPending;

        loadPOIsPending = false;
        loadPOIsRunning = false;
        loadPOIsController = null;

        console.log("LOAD POIS END");

        if (pending) {
            console.log("LOAD POIS – vorgemerkten Aufruf starten");

            // Erst nach Abschluss des aktuellen Aufrufs den nächsten Durchlauf starten.
            setTimeout(() => loadPOIs(map), 0);
        } else if (prefetchPending) {
            console.log("LOAD POIS END – Prefetch starten");

            prefetchPending = false;
            prefetchPOIs(map);
        }
    }
}



async function loadTiles(tiles, bounds, zoomClass, state, signal, zoom) {

    // Alle Tiles des Requests als "loading" markieren.
    for (const tile of tiles) {
        const tileId = `${tile.zoom}/${tile.x}/${tile.y}`;
        state.loadingTiles.add(tileId);
    }

    const query = createQueryForZoomClass(zoomClass, bounds);

    console.log ("QUERY:",query);
    
    try {
        const response = await fetch(OVERPASS_URL, {
            method : "POST",
            headers : {"Content-Type" : "application/x-www-form-urlencoded"},
            body : "data=" + encodeURIComponent(query),
            signal : signal
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const text = await response.text();

        let data;

        try {
            data = JSON.parse(text);
        } catch (error) {
            console.error("Overpass-Antwort:", text.substring(0, 1000));
            throw error;
        }

        // Overpass-Daten in GeoJSON umwandeln.
        const geojson = convertToGeoJSON(data, zoomClass, zoom);

        // Features übernehmen.
        for (const feature of geojson.features) {

            const id =
                feature.properties._osm_type + "/" +
                feature.properties._osm_id;

            const existing = loadedFeatures.get(id);

            // Das aktuelle Feature ist noch nirgendwo vorhanden.
            if (!existing) {

                state.features.push(feature);
                loadedFeatureIds.add(id);

                // In loadedFeatures merken, ob ein Feature real oder
                // synthetisch ist.
                loadedFeatures.set(id, {
                    real : feature.properties._site_synthetic
                        ? null
                        : {state, feature},

                    synthetic : feature.properties._site_synthetic
                        ? {state, feature}
                        : null
                });

                continue;
            }

            // Reales Feature kommt nach einem synthetischen.
            if (!feature.properties._site_synthetic && !existing.real) {

                state.features.push(feature);
                existing.real = {state, feature};
            }
        }

        // Erst nach erfolgreicher Verarbeitung gilt der Request
        // als geladen.
        for (const tile of tiles) {
            const tileId = `${tile.zoom}/${tile.x}/${tile.y}`;
            state.loadedTiles.add(tileId);
        }
    }

    catch (error) {
        if (error.name !== "AbortError") {
            console.error("Overpass Fehler:", error);
        }
    }

    finally {
        // Bei Fehler bleiben die Tiles bewusst NICHT in
        // loadedTiles und können später erneut geladen werden.
        for (const tile of tiles) {
            const tileId = `${tile.zoom}/${tile.x}/${tile.y}`;
            state.loadingTiles.delete(tileId);
        }
    }
}



function getTilesToLoad(tiles, state, zoomClass) {

    return tiles.filter(tile => {
        const tileId = `${tile.zoom}/${tile.x}/${tile.y}`;

        if (state.loadedTiles.has(tileId))
            return false;

        if (state.loadingTiles.has(tileId)) {
            console.log("Kachel bereits in Bearbeitung:",
                        zoomClass.id, tileId);
            return false;
        }

        return true;
    });
}



async function loadTile(tile, zoomClass, state, signal, zoom) {

    const tiles = getTilesToLoad(
        [tile],
        state,
        zoomClass
    );

    if (tiles.length === 0)
        return;

    const bounds = getTileBounds(tile);

    await loadTiles(
        tiles,
        bounds,
        zoomClass,
        state,
        signal,
        zoom
    );
}




async function loadTileRectangle(rectangle, zoomClass, state, signal, zoom) {

    const tiles = getTilesToLoad(
        rectangle.tiles,
        state,
        zoomClass
    );

    if (tiles.length === 0)
        return;

    const bounds = getRectangleBounds({
        ...rectangle,
        tiles
    });

    await loadTiles(
        tiles,
        bounds,
        zoomClass,
        state,
        signal,
        zoom
    );
}




function convertToGeoJSON(data, zoomClass) {

    const features = [];

    const siteMembers = new Map();

    // Baue für Site-Relationen einen Index, den Members eine oder mehrere Relationen zuordnet
    for (const relation of data.elements) {
        if (relation.type !== "relation" || relation.tags?.type !== "site")
            continue;

        for (const member of relation.members || []) {
            const key = `${member.type}/${member.ref}`;

            if (!siteMembers.has(key))
                siteMembers.set(key, []);

            siteMembers.get(key).push(relation.id);
        }
    }

    const existingElements = new Set(
        data.elements.map(e => `${e.type}/${e.id}`)
    );

    for (const e of data.elements) {

        let geometry = null;
        let iconLon;
        let iconLat;

        // Original-Tags unverändert erhalten.
        const originalTags = e.tags || {};

        let matchedTags = null;

        // Prüfen, ob das Objekt mindestens eine Gruppe der Zoomklasse erfüllt.
        for (const group of zoomClass.groups) {

            // lifecycle tags (disused etc.): aus Präfix tag machen
            const tags = group.lifecycle
                ? normalizeTags(originalTags)
                : originalTags;

            const matchesObjectType =
                group.objectTypes.some(([ key, value ]) => tags[key] === value);

            if (!matchesObjectType)
                continue;

            // die erste matching group gewinnt
            if (!group.requiredTags || group.requiredTags.length === 0) {
                matchedTags = tags;
                break;
            }

            const matchesRequiredTags = group.requiredTags.some(
                tag => tags[tag] !== undefined &&
                       tags[tag] !== null &&
                       tags[tag] !== ""
            );

            // die Group hat required Tags und auch damit passt es
            if (matchesRequiredTags) {
                matchedTags = tags;
                break;
            }

        } //end of loop über alle groups

        const style = matchedTags
            ? getIconRule(matchedTags, zoom)
            : invisibleStyle;

        // Drehung des Icons nur, wenn rotation explizit auf true gesetzt ist
        const direction = parseFloat(originalTags?.direction);
        const iconRotation = style.rotation && Number.isFinite(direction)
            ? direction-180     // wir drehen um 180° damit wir in Richtung des Objekts schauen
            : 0;

        // Node
        if (e.type === "node") {
            iconLon = e.lon;
            iconLat = e.lat;
            geometry = {type : "Point", coordinates : [ e.lon, e.lat ]};
        }

        // Way
        else if (e.type === "way") {
            if (!e.geometry || e.geometry.length < 2)
                continue;

            const coordinates = e.geometry.map(point => [point.lon, point.lat]);

            iconLon = (e.bounds.minlon + e.bounds.maxlon) / 2;
            iconLat = (e.bounds.minlat + e.bounds.maxlat) / 2;

            // Geschlossener Way
            const first = coordinates[0];
            const last = coordinates[coordinates.length - 1];
            const isClosed =
                coordinates.length >= 4 && first[0] === last[0] && first[1] === last[1];

            if (isClosed) {
                geometry = {type : "Polygon", coordinates : [ coordinates ]};
            } else {
                geometry = {type : "LineString", coordinates : coordinates};
            }
        }

        // Relation: zunächst nur den vorhandenen Center-Punkt
        else if (e.type === "relation") {

            if (e.tags?.type === "site") {

                // Relation ohne passende Icon rules fliegen raus
                if (!matchedTags)
                    continue;

                // Mittelpunkt der Summe aller members finden
                const memberCoordinates = [];

                for (const member of e.members || []) {
                    if (!member.geometry)
                        continue;

                    for (const point of member.geometry) {
                        memberCoordinates.push([ point.lon, point.lat ]);
                    }
                }

                if (memberCoordinates.length === 0)
                    continue;

                const [ lon, lat ] = getGeometryCenter(memberCoordinates);

                // dorthin kommt das Relationsicon
                iconLon = lon;
                iconLat = lat;

                // Eine Site-Relation wird zunächst als Punkt dargestellt. 
                // Die Geometrien der Member werden später separat behandelt.
                geometry = {
                    type : "Point",
                    coordinates : [ lon, lat ]
                };

                /*
                const existingElements = new Set(
                    data.elements.map(e => `${e.type}/${e.id}`)
                );
                */

                // Fehlende Way-Member als eigene Features erzeugen.
                for (const member of e.members || []) {

                    if (member.type !== "way")
                        continue;

                    const memberKey = `${member.type}/${member.ref}`;

                    // Bereits separat vorhandener Way wird ignoriert
                    if (existingElements.has(memberKey))    // im Datensatz der zoom-Klasse
                        continue;
                    if (loadedFeatureIds.has(memberKey))    // in den bereits fertig geladenen
                        continue;

                    if (!member.geometry || member.geometry.length < 2)
                        continue;

                    const coordinates = member.geometry.map(
                        point => [ point.lon, point.lat ]
                    );

                    const first = coordinates[0];
                    const last = coordinates[coordinates.length - 1];

                    const isClosed =
                        coordinates.length >= 4 &&
                        first[0] === last[0] &&
                        first[1] === last[1];

                    const memberGeometry = isClosed
                        ? {
                            type : "Polygon",
                            coordinates : [ coordinates ]
                        }
                        : {
                            type : "LineString",
                            coordinates
                        };

                    const [ memberLon, memberLat ] =
                        getGeometryCenter(coordinates);

                    features.push({
                        type : "Feature",
                        geometry : memberGeometry,
                        properties : {
                            _osm_type : member.type,
                            _osm_id : member.ref,
                            _geometry_type : memberGeometry.type,
                            _icon_coordinates : [ memberLon, memberLat ],
                            _site_member : true,
                            _site_synthetic : true,
                            _site_relations : [ e.id ],
                            _matched_tags : matchedTags,
                            _app_icon : style.icon,
                            _app_icon_size : style.iconSize * style.membersIconSize,
                            _app_icon_rotate : iconRotation,
                            _line_width : style.membersLine ? style.lineWidth : 0,
                            _line_color : style.membersLine ? style.lineColor : null,
                            _fill_color : style.membersLine ? style.fillColor : null,
                            _fill_opacity : style.membersLine ? style.fillOpacity : 0,
                        }
                    });
                }


            }

            else {
                // bisherige Relation-Behandlung
                if (!e.bounds || !e.members)
                    continue;

                // Iconposition = Mittelpunkt der Bounds
                iconLon = (e.bounds.minlon + e.bounds.maxlon) / 2;
                iconLat = (e.bounds.minlat + e.bounds.maxlat) / 2;

                // Member-Ringe sammeln
                const outerRings = [];
                const innerRings = [];

                for (const member of e.members) {
                    if (!member.geometry || member.geometry.length < 4)
                        continue;

                    const coordinates = member.geometry.map(point => [point.lon, point.lat]);

                    if (member.role === "outer") {
                        outerRings.push(coordinates);
                    } else if (member.role === "inner") {
                        innerRings.push(coordinates);
                    }
                }

                // Noch keine brauchbare Geometrie
                if (outerRings.length === 0)
                    continue;

                // Einfacher Fall: genau ein Outer-Ring.
                // Weitere Inner-Ringe werden als Löcher hinzugefügt.
                if (outerRings.length === 1) {
                    geometry = {type : "Polygon", coordinates : [ outerRings[0], ...innerRings ]};
                }

                // Mehrere Outer-Ringe: zunächst als MultiPolygon behandeln.
                //
                // Die Zuordnung von Inner-Ringen zu den jeweiligen Outer-Ringen ist später
                // noch zu verfeinern.
                else {
                    geometry = {type : "MultiPolygon", coordinates : outerRings.map(ring => [ring])};
                }
            }
        }

        if (iconLon === undefined || iconLat === undefined || !geometry) {
            continue;
        }

        const geometryType = geometry.type;

        const memberSites = siteMembers.get(`${e.type}/${e.id}`);

        if (!matchedTags && !memberSites)
            continue;

        const feature = {
            type : "Feature",
            geometry : geometry,
            properties : {
                // Ausschließlich die originalen OSM-Tags ins Feature übernehmen.
                ...originalTags,
                _osm_type : e.type,
                _osm_id : e.id,
                _geometry_type : geometryType,
                _icon_coordinates : [ iconLon, iconLat ],
                _matched_tags : matchedTags,
                _app_icon : style.icon,
                _app_icon_size : style.iconSize,
                _app_icon_rotate : iconRotation,
                _line_width : style.lineWidth,
                _line_color : style.lineColor,
                _fill_color : style.fillColor,
                _fill_opacity : style.fillOpacity
            }
        };

        if (memberSites) {
            feature.properties._site_member = true;
            feature.properties._site_relations = memberSites;
        }

        features.push(feature);

        /*
         * Maximal 200 Objekte pro Overpass-Abfrage.
        if (features.length >= 200)
            break;
         */
    }

    return {type : "FeatureCollection", features : features};
}



function clearSource(map) {
    const source = map.getSource(sourceId);

    if (source) {
        source.setData({type : "FeatureCollection", features : []});
    }
}



function getGeometryCenter(coordinates) {
    let minLon = Infinity;
    let maxLon = -Infinity;
    let minLat = Infinity;
    let maxLat = -Infinity;

    for (const [lon, lat] of coordinates) {
        minLon = Math.min(minLon, lon);
        maxLon = Math.max(maxLon, lon);
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
    }

    return [ (minLon + maxLon) / 2, (minLat + maxLat) / 2 ];
}



function getPrefetchTiles(bounds, zoom) {
    const xMin = lon2tileX(bounds.getWest(), zoom);
    const xMax = lon2tileX(bounds.getEast(), zoom);
    const yMin = lat2tileY(bounds.getNorth(), zoom);
    const yMax = lat2tileY(bounds.getSouth(), zoom);

    const width  = xMax - xMin + 1;
    const height = yMax - yMin + 1;

    const marginX = Math.ceil(width / 2);
    const marginY = Math.ceil(height / 2);

    const tiles = [];

    for (let x = xMin - marginX; x <= xMax + marginX; x++) {
        for (let y = yMin - marginY; y <= yMax + marginY; y++) {

            // Sichtbaren Bereich auslassen
            if (x >= xMin && x <= xMax &&
                y >= yMin && y <= yMax) {
                continue;
            }

            tiles.push({
                x: x,
                y: y,
                zoom: zoom
            });
        }
    }

    return tiles;
}




function schedulePrefetch(map) {
    if (prefetchTimer) {
        clearTimeout(prefetchTimer);
    }

    prefetchPending = true;

    prefetchTimer = setTimeout(() => {
        prefetchTimer = null;

        if (loadPOIsRunning) {
            console.log("PREFETCH wartet auf LOAD POIS");
            return;
        }

        prefetchPending = false;
        prefetchPOIs(map);

    }, 1000);
}



function cancelPrefetch() {
    if (prefetchTimer) {
        clearTimeout(prefetchTimer);
        prefetchTimer = null;
    }

    prefetchPending = false;

    if (prefetchController) {
        prefetchController.abort();
        prefetchController = null;
    }
}



async function prefetchPOIs(map) {
    if (prefetchController) {
        return;
    }

    const controller = new AbortController();
    prefetchController = controller;

    try {
        const bounds = map.getBounds();
        const zoom = map.getZoom();

        const activeClasses =
            zoomClasses.filter(
                zoomClass => zoom >= zoomClass.minZoom
            );

        for (const zoomClass of activeClasses) {

            const state = zoomClassState.get(zoomClass.id);

            if (!state)
                continue;

            const tiles =
                getPrefetchTiles(
                    bounds,
                    zoomClass.minZoom
                );

            const tilesToLoad = tiles.filter(tile => {
                const tileId =
                    `${tile.zoom}/${tile.x}/${tile.y}`;

                return !state.loadedTiles.has(tileId) &&
                       !state.loadingTiles.has(tileId);
            });

            console.log(
                "PREFETCH:",
                zoomClass.id,
                tilesToLoad.length,
                "Tiles"
            );

            for (
                let i = 0;
                i < tilesToLoad.length;
                i += MAX_PARALLEL_REQUESTS
            ) {
                const batch =
                    tilesToLoad.slice(
                        i,
                        i + MAX_PARALLEL_REQUESTS
                    );

                await Promise.all(
                    batch.map(tile =>
                        loadTile(
                            tile,
                            zoomClass,
                            state,
                            controller.signal,
                            zoom
                        )
                    )
                );
            }
        }

    } catch (error) {

        if (error.name !== "AbortError") {
            console.error("Prefetch Fehler:", error);
        }

    } finally {

        // Nur den globalen Controller löschen, wenn er noch unser Controller ist.
        if (prefetchController === controller) {
            prefetchController = null;
        }
    }
}



export function initPrefetch(map) {

    map.on("movestart", () => {
        cancelPrefetch();
    });

    map.on("zoomstart", () => {
        cancelPrefetch();
    });

    map.on("moveend", () => {
        schedulePrefetch(map);
    });
}



function applyFeatureStyle(feature, style) {

    // style weiß bei real/synthetisch welches feature sichtbar ist
    feature.properties._app_visible = style.visible;

    const isSynthetic =
        feature.properties._site_synthetic === true;

    feature.properties._app_icon =
        style.icon;

    feature.properties._app_icon_size =
        isSynthetic
            ? style.iconSize * style.membersIconSize
            : style.iconSize;

    const tags =
        feature.properties._matched_tags ??
        feature.properties;

    const direction = parseFloat(tags?.direction);

    feature.properties._app_icon_rotate =
        style.rotation && Number.isFinite(direction)
            ? direction-180
            : 0;

    feature.properties._line_width =
        isSynthetic && !style.membersLine
            ? 0
            : style.lineWidth;

    feature.properties._line_color =
        isSynthetic && !style.membersLine
            ? null
            : style.lineColor;

    feature.properties._fill_color =
        isSynthetic && !style.membersLine
            ? null
            : style.fillColor;

    feature.properties._fill_opacity =
        isSynthetic && !style.membersLine
            ? 0
            : style.fillOpacity;
}



function updateFeatureStyles(zoom) {

    for (const entry of loadedFeatures.values()) {

        // --------------------------------------------------------
        // Reales Feature
        // --------------------------------------------------------

        if (entry.real) {

            const feature = entry.real.feature;

            const tags =
                feature.properties._matched_tags ??
                feature.properties;

            const style =
                getIconRule(tags, zoom);

            applyFeatureStyle(feature, style);

            // Kein synthetisches Gegenstück vorhanden.
            if (!entry.synthetic)
                continue;

            const syntheticFeature =
                entry.synthetic.feature;

            if (style.visible) {

                // Real sichtbar → Synthetic unsichtbar.
                applyFeatureStyle(
                    syntheticFeature,
                    invisibleStyle
                );

            } else {

                // Real unsichtbar → Synthetic bekommt
                // seinen eigenen Style.
                const syntheticTags =
                    syntheticFeature.properties._matched_tags ??
                    syntheticFeature.properties;

                const syntheticStyle =
                    getIconRule(syntheticTags, zoom);

                applyFeatureStyle(
                    syntheticFeature,
                    syntheticStyle
                );
            }

            continue;
        }

        // --------------------------------------------------------
        // Nur synthetisches Feature vorhanden
        // --------------------------------------------------------

        if (entry.synthetic) {

            const feature =
                entry.synthetic.feature;

            const tags =
                feature.properties._matched_tags ??
                feature.properties;

            const style =
                getIconRule(tags, zoom);

            applyFeatureStyle(
                feature,
                style
            );
        }
    }
}



