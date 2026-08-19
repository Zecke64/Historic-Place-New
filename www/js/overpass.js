import { prefetchWikidata } from "./wikidata.js";
import { getIcon } from "./icons.js";
import { normalizeTags } from "./utils.js";
import { resolvedZoomClasses as zoomClasses } from "./zoomclasses.js";
import { getPendingPermalinkPoi, clearPendingPermalinkPoi } from "./permalink.js";
import { showPopup } from "./popup.js";



const zoomClassState = new Map();

for(const zoomClass of zoomClasses)
{
    zoomClassState.set(
        zoomClass.id,
        {
            loadedTiles: new Set(),
	    features: []
        }
    );
}

const OVERPASS_URL =
//    "https://overpass.maprva.org/api/interpreter";
//    "https://overpass-api.de/api/interpreter";
//    "https://overpass.private.coffee/api/interpreter";
      "https://mystic.historic.place:4443/api/interpreter";

const sourceId = "osm-pois";
const MAX_PARALLEL_REQUESTS = 8;


//let currentRequest = null;
let loadPOIsRunning = false;
//let zoomAtStart = null;
let loadPOIsPending = false;
let loadPOIsController = null;

export function initOverpassLayer(map)
{
    /*
     * GeoJSON Source mit aktiviertem Clustering
     */
    map.addSource(
        sourceId,
        {
            type: "geojson",
            data:
            {
                type:"FeatureCollection",
                features:[]
            },
            cluster:true,
            clusterRadius:5,
            clusterMaxZoom:16
        }
    );

    /*
     * Cluster-Kreise
     */
    map.addLayer(
        {
            id:"poi-clusters",
            type:"circle",
            source:sourceId,
            filter:
            [
                "has",
                "point_count"
            ],
            paint:
            {
                "circle-radius":
                [
                    "step",
                    [ "get", "point_count" ],
                    18,
                    20,
                    24,
                    50,
                    32,
                    100,
                    40
                ],
                "circle-stroke-width":2,
                "circle-stroke-color": "#ffffff",
                "circle-color": "#3388ff"
            }
        }
    );


    /*
     * Cluster Anzahl
     */
    map.addLayer(
        {
            id:"poi-cluster-count",
            type:"symbol",
            source:sourceId,
            filter: [ "has", "point_count" ],
            layout:
            {
                "text-field": "{point_count}",
                "text-size":14
            },
            paint:
            {
                "text-color": "#ffffff"
            }
        }
    );


    /*
     * Einzelne POIs
     */
    map.addLayer(
        {
            id:"osm-pois",
            type:"symbol",
            source:sourceId,
            filter:
            [
                "!",
                [ "has", "point_count" ]
            ],
            layout:
            {
                "icon-image": [ "get", "_app_icon" ],
                "icon-size":0.8,
                "icon-allow-overlap":true
            }
        }
    );


    /*
     * Cluster anklicken
     */
    map.on(
        "click",
        "poi-clusters",
        async e =>
        {
            const feature = e.features[0];
            const clusterId = feature.properties.cluster_id;
            const source = map.getSource(sourceId);

            try
            {
                const zoom =
                    await source.getClusterExpansionZoom( clusterId);
                map.easeTo(
                {
                    center: feature.geometry.coordinates,
                    zoom: zoom
                });
            }
            catch(error)
            {
                console.error( "Cluster Zoom Fehler:", error);
            }
        }
    );


    /*
     * Cursor
     */
    map.on(
        "mouseenter",
        "poi-clusters",
        () =>
        {
            map.getCanvas().style.cursor = "pointer";
        }
    );


    map.on(
        "mouseleave",
        "poi-clusters",
        () =>
        {
            map.getCanvas().style.cursor = "";
        }
    );


    /*
     * POIs laden
     */
    loadPOIs(map);


    /*
     * Zoomvorgang merken
     */
    map.on(
        "zoomstart",
        () =>
        {
            if(loadPOIsRunning && loadPOIsController)
            {
                console.log("ZOOM START – laufende Requests abbrechen");
                loadPOIsController.abort();
            }
        }
    );


    /*
     * Nach Kartenbewegung neu laden
     */
    map.on(
        "moveend",
        () =>
        {
            loadPOIs(map);
        }
    );

}



function lon2tileX(lon, zoom)
{
    return Math.floor( (lon + 180) / 360 * Math.pow(2, zoom));
}


function lat2tileY(lat, zoom)
{
    const latRad = lat * Math.PI / 180;
    return Math.floor( ( 1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2 * Math.pow(2, zoom));
}


function tile2lon(x, zoom)
{
    return x / Math.pow(2, zoom) * 360 - 180;
}


function tile2lat(y, zoom)
{
    const n = Math.PI - 2 * Math.PI * y / Math.pow(2, zoom);
    return 180 / Math.PI * Math.atan(Math.sinh(n));
}



function getTilesForBounds(bounds, zoom)
{
    const xMin = lon2tileX(bounds.getWest(), zoom);
    const xMax = lon2tileX(bounds.getEast(), zoom);
    const yMin = lat2tileY(bounds.getNorth(), zoom);
    const yMax = lat2tileY(bounds.getSouth(), zoom);

    const tiles = [];

    for(let x = xMin; x <= xMax; x++)
    {
        for(let y = yMin; y <= yMax; y++)
        {
            tiles.push(
                {
                    x: x,
                    y: y,
                    zoom: zoom
                }
            );
        }
    }

    return tiles;
}



function getTileBounds(tile)
{
    return new maplibregl.LngLatBounds(
        [
            tile2lon(tile.x, tile.zoom),
            tile2lat(tile.y + 1, tile.zoom)
        ],
        [
            tile2lon(tile.x + 1, tile.zoom),
            tile2lat(tile.y, tile.zoom)
        ]
    );
}




function createQueryForZoomClass(zoomClass, bounds)
{
    const south = bounds.getSouth();
    const west  = bounds.getWest();
    const north = bounds.getNorth();
    const east  = bounds.getEast();

    const queries = [];

    for(const group of zoomClass.groups)
    {
        for(const [key, value] of group.objectTypes)
        {
            const objectTypeQuery =
                createObjectTypeQuery(
                    key,
                    value,
                    group.lifecycle === true
                );

            queries.push(
                `nwr${objectTypeQuery}(${south},${west},${north},${east});`
            );
        }
    }

    return `
[out:json][timeout:30];

(
    ${queries.join("\n")}
);

out center qt 500;
`;
}



function getZoomClass(zoom)
{
    return zoomClasses.find(
        z =>
            zoom >= z.minZoom &&
            zoom <= z.maxZoom
    );
}



async function loadPOIs(map)
{
    if(loadPOIsRunning)
    {
        console.log(
            "LOAD POIS bereits aktiv – neuer Aufruf vorgemerkt"
        );

        loadPOIsPending = true;
        return;
    }

    loadPOIsRunning = true;
    loadPOIsPending = false;
    loadPOIsController = new AbortController();

    console.log("LOAD POIS START");

    try {
    const zoom = map.getZoom();

    /*
     * Unterhalb der ersten Zoomklasse
     */
    if(zoom < 6)
    {
        clearSource(map);
        return;
    }

    /*
     * Alle Zoomklassen ermitteln, die bei diesem
     * Zoom aktiv sind.
     *
     * Die Klassen sind kumulativ:
     * Bei z14 sind also z12_13 UND z14 aktiv.
     */
    const activeClasses = zoomClasses.filter(
        zoomClass =>
            zoom >= zoomClass.minZoom
    );

    const bounds = map.getBounds();

    /*
     * Aktive Zoomklassen laden
     */
    for(const zoomClass of activeClasses)
    {
        /*
         * Laufzeitdaten dieser Zoomklasse holen.
         */
        const state =
            zoomClassState.get(
                zoomClass.id
            );

        if(!state)
        {
            console.error(
                "Kein Zustand für Zoomklasse:",
                zoomClass.id
            );

            continue;
        }

        /*
         * Kacheln für diese Zoomklasse bestimmen.
         *
         * Wichtig:
         * Die Kachelgröße richtet sich nach dem minZoom
         * der jeweiligen Zoomklasse.
         */
        const tiles =
            getTilesForBounds(
                bounds,
                zoomClass.minZoom
            );

        for(
            let i = 0;
            i < tiles.length;
            i += MAX_PARALLEL_REQUESTS
        )
        {
            const batch =
                tiles.slice(
                    i,
                    i + MAX_PARALLEL_REQUESTS
                );

            await Promise.all(
                batch.map(
                    tile =>
                        loadTile(
                            tile,
                            zoomClass,
                            state,
    			    loadPOIsController.signal
                        )
                )
            );
        }
    }

    /*
     * Alle Features der momentan aktiven Zoomklassen
     * zusammenführen.
     *
     * Beispiel:
     *
     * z12_13:  70 Objekte
     * z14:     25 Objekte
     *
     * => bei Zoom 14 werden 95 Objekte angezeigt.
     */
    const features = [];

    const globalIds = new Set();

    for(const zoomClass of activeClasses)
    {
        const state =
            zoomClassState.get(
                zoomClass.id
            );

        if(!state)
            continue;

        for(const feature of state.features)
        {
            const id =
                feature.properties._osm_type +
                "/" +
                feature.properties._osm_id;

            /*
             * Sicherheitshalber auch zoomklassenübergreifend
             * doppelte OSM-Objekte vermeiden.
             */
            if(!globalIds.has(id))
            {
                globalIds.add(id);
                features.push(feature);
            }
        }
    }

    console.log(
        "Gesamt POIs:",
        features.length
    );

    /*
     * Wikidata-Daten vorbereiten.
     */
    const ids =
        features
            .map(
                feature =>
                    feature.properties.wikidata
            )
            .filter(Boolean);

    prefetchWikidata(ids);

    /*
     * GeoJSON für MapLibre erzeugen.
     */
    const geojson =
    {
        type:"FeatureCollection",
        features:features
    };

    /*
     * Karte aktualisieren.
     */
    const source =
        map.getSource(sourceId);

    if(source)
    {
        source.setData(geojson);
    }

    /*
     * Prüfen, ob ein POI aus einem Permalink
     * geöffnet werden soll.
     */
    const pendingPoi =
        getPendingPermalinkPoi();

    if(pendingPoi)
    {
        console.log(
            "PERMALINK POI gefunden:",
            pendingPoi
        );

        const [osmType, osmId] =
            pendingPoi.split("/");

        const feature =
            features.find(
                feature =>
                    feature.properties._osm_type === osmType &&
                    String(feature.properties._osm_id) === String(osmId)
            );

        if(feature)
        {
            console.log(
                "PERMALINK POI Feature gefunden:",
                feature
            );

            await showPopup(
                map,
                feature
            );
        }
        else
        {
            console.log(
                "PERMALINK POI nicht in geladenen Features:",
                pendingPoi
            );
        }
    }

    } 		// try

    finally
    {
        loadPOIsRunning = false;
        loadPOIsController = null;

        console.log("LOAD POIS END");

        if(loadPOIsPending)
        {
            loadPOIsPending = false;

            console.log(
                "LOAD POIS – vorgemerkten Aufruf starten"
            );

            loadPOIs(map);
        }
    }
}


async function loadTile(tile, zoomClass, state, signal)
{
    const tileId =
        `${tile.zoom}/${tile.x}/${tile.y}`;

    /*
     * Kachel wurde bereits erfolgreich geladen.
     */
    if(state.loadedTiles.has(tileId))
    {
        return;
    }

    const tileBounds =
        getTileBounds(tile);

    const query =
        createQueryForZoomClass(
            zoomClass,
            tileBounds
        );

    console.log(
        "OVERPASS REQUEST:",
        zoomClass.id,
        tileId
    );

    try
    {
        const response =
            await fetch(
                OVERPASS_URL,
                {
                    method:"POST",

                    headers:
                    {
                        "Content-Type":
                            "application/x-www-form-urlencoded"
                    },

                    body:
                        "data=" +
                        encodeURIComponent(query),

                    signal: signal
                }
            );

        if(!response.ok)
        {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        const text =
            await response.text();

        let data;

        try
        {
            data =
                JSON.parse(text);
        }
        catch(error)
        {
            console.error(
                "Overpass-Antwort:",
                text.substring(0, 1000)
            );

            throw error;
        }

        /*
         * Overpass-Daten in GeoJSON umwandeln.
         */
        const geojson =
            convertToGeoJSON(
                data,
                zoomClass
            );

        /*
         * Bereits vorhandene OSM-Objekte
         * dieser Zoomklasse nicht doppelt übernehmen.
         */
        const existingIds =
            new Set(
                state.features.map(
                    feature =>
                        feature.properties._osm_type +
                        "/" +
                        feature.properties._osm_id
                )
            );

        for(const feature of geojson.features)
        {
            const id =
                feature.properties._osm_type +
                "/" +
                feature.properties._osm_id;

            if(!existingIds.has(id))
            {
                state.features.push(feature);
                existingIds.add(id);
            }
        }

        /*
         * Erst nach erfolgreicher Verarbeitung
         * gilt die Kachel als geladen.
         */
        state.loadedTiles.add(tileId);
    }

    catch(error)
    {
        if(error.name !== "AbortError")
        {
            console.error(
                "Overpass Fehler:",
                error
            );
        }
    }
}




function convertToGeoJSON(data, zoomClass)
{
    const features = [];

    for(const e of data.elements)
    {
        let lat;
        let lon;

        if(e.type === "node")
        {
            lat = e.lat;
            lon = e.lon;
        }
        else if(e.center)
        {
            lat = e.center.lat;
            lon = e.center.lon;
        }

        if(lat === undefined || lon === undefined)
            continue;

	// Original-Tags unverändert erhalten.
        const originalTags = e.tags || {};

        let matchedTags = null;

        /*
         * Prüfen, ob das Objekt mindestens eine
         * Gruppe der Zoomklasse erfüllt.
         */
        for(const group of zoomClass.groups)
        {
            /*
             * Für Lifecycle-Gruppen eine normalisierte
             * Sicht der Tags verwenden.
             *
             * Für alle anderen Gruppen die
             * Original-Tags.
             */
            const tags =
                group.lifecycle
                ? normalizeTags(originalTags)
                : originalTags;

	    // Passt der OSM-Typ?
            const matchesObjectType =
                group.objectTypes.some(
                    ([key, value]) =>
                        tags[key] === value
                );

            if(!matchesObjectType)
                continue;

            /*
             * Keine requiredTags:
             * Objekt ist zugelassen.
             */
            if(!group.requiredTags ||
               group.requiredTags.length === 0)
            {
                matchedTags = tags;
                break;
            }

            /*
             * Mindestens eines der requiredTags
             * muss vorhanden und nicht leer sein.
             */
            const matchesRequiredTags =
                group.requiredTags.some(
                    tag =>
                        tags[tag] !== undefined &&
                        tags[tag] !== null &&
                        tags[tag] !== ""
                );

            if(matchesRequiredTags)
            {
                matchedTags = tags;
                break;
            }
        }

        /*
         * Keine passende Gruppe.
         */
        if(!matchedTags)
            continue;

        features.push(
        {
            type: "Feature",

            geometry:
            {
                type: "Point",
                coordinates: [lon, lat]
            },

            properties:
            {
                /*
                 * Ausschließlich die originalen
                 * OSM-Tags ins Feature übernehmen.
                 */
                ...originalTags,

                _osm_type: e.type,
                _osm_id: e.id,

                _app_icon:
                    getIcon(matchedTags)
		    //"poi"
            }
        });

        /*
         * Maximal 200 Objekte pro Overpass-Abfrage.
         */
        if(features.length >= 200)
            break;
    }

    return {
        type: "FeatureCollection",
        features: features
    };
}




function clearSource(map)
{
    const source = map.getSource(sourceId);

    if(source)
    {
        source.setData(
            {
                type:"FeatureCollection",
                features:[]
            }
        );
    }

}


function createObjectTypeQuery(
    key,
    value,
    lifecycle = false
)
{
    if(!lifecycle)
    {
        return `["${key}"="${value}"]`;
    }

    return `[ ~"^(disused:|abandoned:|razed:)*${key}$"~"^${value}$" ]`;
}
