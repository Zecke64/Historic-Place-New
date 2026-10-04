/**
 * Verwaltung der Kartenlayer
 */

import {resolvedLayerConfig as layerConfig} from "./layerconfig.js";



export async function initLayerManager(map) {

    for (const layer of layerConfig) {

        if (layer.source && layer.source.type === "raster") {
            addRasterLayer(map, layer);
        }

        if (layer.source && layer.source.type === "wms") {
            addWmsLayer(map, layer);
        }

        if (layer.shape) {
            await addGeoJsonLayer(map, layer);
        }
    }
}



// Rasterlayer hinzufügen
export function addRasterLayer(map, options) {

    const {id, source, opacity = 1, visible = true} = options;

    const {tiles, tileSize = 256} = source;

    const mapLayer = options.mapLayers.find(l => l.type === "raster");
    if (!mapLayer) {
        console.warn("Kein Raster MapLayer:", options.id);

        return;
    }

    map.addSource(mapLayer.id + "-source", {type : "raster", tiles : tiles, tileSize : tileSize});

    map.addLayer({
        id : mapLayer.id,
        type : "raster",
        source : mapLayer.id + "-source",
        layout : {visibility : visible ? "visible" : "none"},
        paint : {"raster-opacity" : opacity}
    });

}



function addWmsLayer(map, layer) {

    const sourceId = `${layer.id}-wms-source`;
    const layerId = `${layer.id}-wms`;

    const version = layer.source.version ?? "1.3.0";

    const params = new URLSearchParams({
        SERVICE: "WMS",
        VERSION: layer.source.version ?? "1.3.0",
        REQUEST: "GetMap",
        LAYERS: layer.source.layers,
        STYLES: "",
        FORMAT: layer.source.format ?? "image/png",
        TRANSPARENT: layer.source.transparent ? "TRUE" : "FALSE",
        WIDTH: "256",
        HEIGHT: "256"
    });

    params.set(
        version === "1.1.1" ? "SRS" : "CRS",
        layer.source.crs
    );

    const separator =
    layer.source.url.includes("?") ? "&" : "?";

    const url =
        `${layer.source.url}${separator}${params.toString()}` +
        "&BBOX={bbox-epsg-3857}";

    map.addSource(sourceId, {
        type: "raster",
        tiles: [url],
        tileSize: layer.source.tileSize ?? 256
    });

    map.addLayer({
        id: layerId,
        type: "raster",
        source: sourceId,
        layout: {
            visibility: layer.visible ? "visible" : "none"
        },
        paint: {
            "raster-opacity": layer.opacity ?? 1
        }
    });
}



export async function addGeoJsonLayer(map, options) {
    const {id, shape, mapLayers, visible = true} = options;

    if (!shape || shape.type !== "geojson") {
        return;
    }

    // Shape laden
    const response = await fetch(shape.url);

    if (!response.ok) {
        throw new Error(`Shape konnte nicht geladen werden: ${shape.url}`);
    }

    const shapeData = await response.json();

    // Shape-Daten im Layer selbst ablegen.
    // Das brauchen wir später für die Prüfung,
    // ob die Shape den Kartenausschnitt schneidet.
    options._shapeData = shapeData;
    options._shapeBounds = getGeoJsonBounds(shapeData);

    const sourceId = id + "-shape-source";

    map.addSource(sourceId, {type : "geojson", data : shapeData});

    for (const mapLayer of mapLayers) {
        if (mapLayer.type !== "fill" && mapLayer.type !== "line") {
            continue;
        }

        const layer = {
            id : mapLayer.id,
            type : mapLayer.type,
            source : sourceId,
            layout : {visibility : visible ? "visible" : "none"}
        };

        if (mapLayer.type === "fill") {
            layer.paint = {"fill-opacity" : options.shape?.style?.fillOpacity ?? 0.3};
        }

        if (mapLayer.type === "line") {
            layer.paint = {
                "line-width" : 2,
                "line-opacity" : options.shape?.style?.lineOpacity ?? 1
            };
        }

        map.addLayer(layer);
    }
}


export function getGeoJsonBounds(geojson) {

    let minLon = Infinity;
    let minLat = Infinity;
    let maxLon = -Infinity;
    let maxLat = -Infinity;

    function processCoordinates(coordinates) {
        if (typeof coordinates[0] === "number" && typeof coordinates[1] === "number") {
            const lon = coordinates[0];
            const lat = coordinates[1];

            minLon = Math.min(minLon, lon);
            minLat = Math.min(minLat, lat);
            maxLon = Math.max(maxLon, lon);
            maxLat = Math.max(maxLat, lat);

            return;
        }

        for (const child of coordinates) {
            processCoordinates(child);
        }
    }

    if (geojson.type === "FeatureCollection") {
        for (const feature of geojson.features) {
            if (feature.geometry) {
                processCoordinates(feature.geometry.coordinates);
            }
        }
    } else if (geojson.type === "Feature") {
        if (geojson.geometry) {
            processCoordinates(geojson.geometry.coordinates);
        }
    } else if (geojson.type === "GeometryCollection") {
        for (const geometry of geojson.geometries) {
            if (geometry) {
                processCoordinates(geometry.coordinates);
            }
        }
    } else if (geojson.coordinates) {
        processCoordinates(geojson.coordinates);
    }

    if (minLon === Infinity) {
        return null;
    }

    return {minLon, minLat, maxLon, maxLat};
}




export function updateLayerVisibility(map) {

    const zoom = map.getZoom();

    for (const layer of layerConfig) {

        // WMS-Raster
        if (layer.source?.type === "wms") {

            const mapLayerId = `${layer.id}-wms`;

            if (map.getLayer(mapLayerId)) {

                const minZoom =
                    layer.display?.detail?.minZoom ?? 0;

                const visible =
                    layer.visible &&
                    zoom >= minZoom;

                map.setLayoutProperty(
                    mapLayerId,
                    "visibility",
                    visible ? "visible" : "none"
                );
            }
        }

        // Shape bzw. sonstige MapLayers
        for (const mapLayer of layer.mapLayers ?? []) {

            let visible = false;

            if (layer.type === "poi") {

                visible =
                    layer.visible &&
                    zoom >= layer.display.overview.minZoom;

            }
            else if (mapLayer.type === "fill" ||
                     mapLayer.type === "line") {

                visible =
                    layer.visible &&
                    zoom >= layer.display.overview.minZoom &&
                    zoom < layer.display.detail.minZoom;

            }
            else if (mapLayer.type === "raster") {

                visible =
                    layer.visible &&
                    zoom >= layer.display.detail.minZoom;
            }

            if (map.getLayer(mapLayer.id)) {

                map.setLayoutProperty(
                    mapLayer.id,
                    "visibility",
                    visible ? "visible" : "none"
                );
            }
        }
    }
}



export function initZoomHandling(map) {

    map.on("zoom", () => { updateLayerVisibility(map); });
}



// layer config in template reinmergen
function deepMerge(base, override) {

    const result = {...base};

    for (const key of Object.keys(override)) {
        const value = override[key];

        if (value && typeof value === "object" && !Array.isArray(value) && base[key] &&
            typeof base[key] === "object" && !Array.isArray(base[key])) {
            result[key] = deepMerge(base[key], value);
        } else {
            result[key] = value;
        }
    }

    return result;
}
