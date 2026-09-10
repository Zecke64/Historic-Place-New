import {resolvedLayerConfig as layerConfig} from "./layerconfig.js";
import {layerRegistry, updateLayerVisibility} from "./layers.js";
import {tr} from "./language.js";

let activeCredits = [];
let creditElement = null;

const osmCredit = "© OpenStreetmap Contributors";


export function createLayerControl(map) {

    const button = document.createElement("button");
    button.className = "map-control-button";
    button.id = "layer-button";
    button.dataset.i18n = "button.layers";
    button.title = tr("button.layers");
    const icon = document.createElement("img");
    icon.src = "img/map_icons/layers.svg";
    icon.alt = "Layer";
    button.appendChild(icon);

    const control = document.createElement("div");
    control.className = "layer-control";
    control.style.display = "none";

    createBaseSection(control, map);
    const overlaySection = createOverlaySection(control, map);
    createHistObjSection(control, map);

    map.on("moveend", () => { updateOverlaySection(overlaySection, map); });
    map.on("zoomend", () => { updateOverlaySection(overlaySection, map); });

    button.addEventListener(
        "click",
        () => { control.style.display = control.style.display === "none" ? "block" : "none"; });

    const mapContainer = map.getContainer();

    mapContainer.appendChild(button);
    mapContainer.appendChild(control);

    creditElement = document.createElement("div");
    creditElement.id = "map-credits";

    mapContainer.appendChild(creditElement);

    activeCredits = [];

    for (const layer of layerConfig) {
        if (!layer.visible)
            continue;

        if (!layer.credit)
            continue;

        activeCredits.push(layer.id);
    }

    updateLayerCredits();
}


async function copyPermalink(map) {

    const center = map.getCenter();
    const zoom = map.getZoom();
    const bearing = map.getBearing();
    const pitch = map.getPitch();

    /*
     * Sichtbare Layer ermitteln.
     */
    const layers = [];

    for (const layer of layerConfig) {
        if (!map.getLayer(layer.id))
            continue;
        const visibility = map.getLayoutProperty(layer.id, "visibility");
        if (visibility !== "none") {
            layers.push(layer.id);
        }
    }

    /*
     * URL erzeugen.
     */
    const url = new URL(window.location.href);
    url.search = "";
    const params = new URLSearchParams();
    params.set("lat", center.lat.toFixed(6));
    params.set("lon", center.lng.toFixed(6));
    params.set("zoom", zoom.toFixed(2));

    if (Math.abs(bearing) > 0.01) {
        params.set("bearing", bearing.toFixed(2));
    }

    if (Math.abs(pitch) > 0.01) {
        params.set("pitch", pitch.toFixed(2));
    }

    if (layers.length > 0) {
        params.set("layers", layers.join(","));
    }

    url.search = params.toString();

    try {
        await navigator.clipboard.writeText(url.toString());

        console.log("Permalink kopiert:", url.toString());
    } catch (error) {
        console.error("Permalink konnte nicht kopiert werden:", error);
    }
}


// Basiskarten
function createBaseSection(parent, map) {

    const section = document.createElement("div");
    section.className = "layer-section";
    section.id = "base-layer-section";
    section.appendChild(createHeading("layer.baseMaps"));

    for (const layer of layerConfig) {
        if (layer.category !== "base")
            continue;

        section.appendChild(createBaseEntry(layer, map));
    }

    parent.appendChild(section);
}


// Overlays
function createOverlaySection(parent, map) {

    const section = document.createElement("div");
    section.className = "layer-section";
    section.id = "overlay-layer-section";

    section.appendChild(createHeading("layer.histMaps"));

    updateOverlaySection(section, map);

    parent.appendChild(section);

    return section;
}


function updateOverlaySection(section, map) {
    /*
     * Alle bisherigen Einträge entfernen,
     * die Überschrift aber behalten.
     */
    while (section.children.length > 1) {
        section.removeChild(section.lastChild);
    }

    for (const layer of layerConfig) {
        if (layer.category !== "overlay")
            continue;

        if (!layerIsAvailable(map, layer))
            continue;

        section.appendChild(createOverlayEntry(layer, map));
    }
}


// Historische Objekte
function createHistObjSection(parent, map) {

    const section = document.createElement("div");
    section.className = "layer-section";

    section.appendChild(createHeading("layer.historicalObjects"));

    for (const layer of layerConfig) {
        if (layer.category !== "hist-objects")
            continue;

        section.appendChild(createOverlayEntry(layer, map));
    }

    parent.appendChild(section);
}


function createOpacityControl(layer, map) {

    if (layer.opacityControl === false)
        return null;

    const container = document.createElement("span");
    const slider = document.createElement("input");
    container.className = "layer-opacity-container";

    slider.type = "range";
    slider.min = 0;
    slider.max = 100;
    slider.className = "layer-opacity";

    // Aktuelle Transparenz aus MapLibre lesen.
    let opacity = layer.opacity;

    const rasterId = `${layer.id}-raster`;

    if (map.getLayer(rasterId)) {
        const mapOpacity = map.getPaintProperty(rasterId, "raster-opacity");
        if (mapOpacity != null)
            opacity = mapOpacity;
    }

    slider.value = Math.round(opacity * 100);
    const value = document.createElement("span");
    value.className = "layer-opacity-value";
    value.textContent = Math.round(opacity * 100) + "%";

    slider.addEventListener("input", () => {
        const percent = slider.value;
        value.textContent = percent + "%";
        setLayerOpacity(map, layer, percent / 100);
    });

    container.append(slider, value);

    return container;
}


// eine Zeile erzeugen
function createOverlayEntry(layer, map) {

    const {row, label} = createLayerRow(layer, "layer-base");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.checked = layer.visible;

    checkbox.addEventListener("change", () => {
        layer.visible = checkbox.checked;

        if (layer.visible) {
            activeCredits = activeCredits.filter(id => id !== layer.id);
            activeCredits.push(layer.id);
        } else {
            activeCredits = activeCredits.filter(id => id !== layer.id);
        }

        updateLayerVisibility(map);
        updateLayerCredits();
    });

    const opacityControl = createOpacityControl(layer, map);
    row.append(checkbox, label);

    if (opacityControl) {
        row.append(opacityControl);
    }

    return row;
}


function setLayerOpacity(map, layer, opacity) {

    layer.opacity = opacity;

    for (const mapLayer of layer.mapLayers) {
        if (!map.getLayer(mapLayer.id))
            continue;

        switch (mapLayer.type) {
        case "raster":
            map.setPaintProperty(mapLayer.id, "raster-opacity", opacity);
            break;

            // Shapes haben immer eine fixe Transparenz
        case "fill":
        case "line":
            break;

        case "circle":
            map.setPaintProperty(mapLayer.id, "circle-opacity", opacity);
            break;

        case "symbol":
            map.setPaintProperty(mapLayer.id, "icon-opacity", opacity);

            map.setPaintProperty(mapLayer.id, "text-opacity", opacity);

            break;
        }
    }
}


function createHeading(i18nKey) {

    const heading = document.createElement("div");

    heading.className = "layer-heading";
    heading.dataset.i18n = i18nKey;
    heading.textContent = tr(i18nKey);

    return heading;
}


function createLayerRow(layer, className) {

    const row = document.createElement("div");
    row.className = "layer-row " + className;

    const label = document.createElement("span");
    label.dataset.i18n = layer.titleKey;
    label.textContent = tr(layer.titleKey);

    return {row, label};
}


function createBaseEntry(layer, map) {

    const {row, label} = createLayerRow(layer, "layer-base");
    const radio = document.createElement("input");

    radio.type = "radio";
    radio.name = "base-layer";

    // Aktuelle Sichtbarkeit aus MapLibre lesen.
    const rasterId = `${layer.id}-raster`;

    if (map.getLayer(rasterId)) {
        radio.checked = map.getLayoutProperty(rasterId, "visibility") !== "none";
    } else {
        radio.checked = false;
    }

    radio.addEventListener("change", () => {
        if (radio.checked) {
            setBaseLayer(map, layer);
        }
    });

    const opacityControl = createOpacityControl(layer, map);

    row.append(radio, label);

    if (opacityControl) {
        row.append(opacityControl);
    }

    return row;
}


function setBaseLayer(map, selectedLayer) {

    for (const layer of layerConfig) {
        if (layer.category !== "base")
            continue;

        const visible = layer.id === selectedLayer.id;
        layer.visible = visible;

        for (const mapLayer of layer.mapLayers) {
            if (!map.getLayer(mapLayer.id))
                continue;

            map.setLayoutProperty(mapLayer.id, "visibility", visible ? "visible" : "none");
        }
    }

    activeCredits = activeCredits.filter(
        id => !layerConfig.some(layer => layer.category === "base" && layer.id === id));

    activeCredits.push(selectedLayer.id);

    updateLayerCredits();
}


function updateLayerCredits() {

    if (!creditElement)
        return;

    const credits = [ osmCredit ];

    for (const layerId of activeCredits) {
        const layer = layerConfig.find(layer => layer.id === layerId);

        if (!layer)
            continue;

        if (!layer.credit)
            continue;

        credits.push(layer.credit);
    }

    creditElement.innerHTML = credits.join(" | ");
}


function layerIsInView(map, layer) {

    if (!layer._shapeBounds) {
        return false;
    }

    const bounds = map.getBounds();

    const west = bounds.getWest();
    const east = bounds.getEast();
    const south = bounds.getSouth();
    const north = bounds.getNorth();

    const shape = layer._shapeBounds;

    return !(shape.maxLon < west || shape.minLon > east || shape.maxLat < south ||
             shape.minLat > north);
}


// Zoom >= minZoom(layer)?
function layerIsAvailable(map, layer) {

    if (layer.category !== "overlay")
        return true;

    const minZoom = layer.display?.overview?.minZoom;

    if (minZoom !== undefined && map.getZoom() < minZoom) {
        return false;
    }

    if (!layer._shapeBounds)
        return false;

    const mapBounds = map.getBounds();
    const shapeBounds = layer._shapeBounds;

    if (shapeBounds.maxLon < mapBounds.getWest() || shapeBounds.minLon > mapBounds.getEast() ||
        shapeBounds.maxLat < mapBounds.getSouth() || shapeBounds.minLat > mapBounds.getNorth()) {
        return false;
    }

    return true;
}


export function refreshLayerControl(map) {

    const overlaySection = document.getElementById("overlay-layer-section");

    if (overlaySection) {
        updateOverlaySection(overlaySection, map);
    }

    const baseSection = document.getElementById("base-layer-section");

    if (baseSection) {
        while (baseSection.children.length > 1) {
            baseSection.removeChild(baseSection.lastChild);
        }

        for (const layer of layerConfig) {
            if (layer.category !== "base")
                continue;

            baseSection.appendChild(createBaseEntry(layer, map));
        }
    }
}
