import {layerConfig} from "../config/layerconf.js";

import {currentPopupFeature} from "./popup.js";
import {refreshLayerControl} from "./layerControl.js";
import {tr, getLanguage, setLanguage, updateLanguage } from "./language.js";

let pendingPermalinkPoi = null;

export function createPermalinkControl(map) {
    const button = document.createElement("button");
    button.className = "map-control-button";
    button.id = "permalink-button";
    button.dataset.i18n = "button.permalink";
    button.title = tr("button.permalink");
    const icon = document.createElement("img");
    icon.src = "img/map_icons/permalink.svg";
    icon.alt = "Permalink";

    button.appendChild(icon);

    button.addEventListener("click", async () => {
        const center = map.getCenter();
        const zoom = map.getZoom();
        const bearing = map.getBearing();
        const pitch = map.getPitch();

        // Sichtbare Layer ermitteln.
        const layers = [];

        for (const layer of layerConfig) {
            if (!isLayerVisible(map, layer))
                continue;

            let opacity = 1;

            // Der sichtbare MapLibre-Layer.
            let mapLayerId;

            if (layer.id === "osm-pois") {
                mapLayerId = "osm-pois";
            } else {
                mapLayerId = `${layer.id}-raster`;
            }

            if (map.getLayer(mapLayerId)) {
                const type = map.getLayer(mapLayerId).type;

                if (type === "raster") {
                    opacity = map.getPaintProperty(mapLayerId, "raster-opacity");

                    // Sicherheitshalber: falls MapLibre keinen Wert liefert.
                    if (opacity == null)
                        opacity = 1;
                }
            }

            layers.push(`${layer.id}:${opacity}`);
        }

        // Zustand in URL-Parameter schreiben.
        const params = new URLSearchParams();
        params.set("lon", center.lng.toFixed(6));
        params.set("lat", center.lat.toFixed(6));
        params.set("z", zoom.toFixed(2));
        params.set("lang", getLanguage());

        if (bearing !== 0) {
            params.set("b", bearing.toFixed(2));
        }

        if (pitch !== 0) {
            params.set("p", pitch.toFixed(2));
        }

        if (layers.length > 0) {
            params.set("layers", layers.join(","));
        }

        if (currentPopupFeature) {
            const properties = currentPopupFeature.properties;

            if (properties._osm_type && properties._osm_id) {
                params.set("poi", `${properties._osm_type}/${properties._osm_id}`);
            }
        }

        const url = window.location.origin + window.location.pathname + "?" + params.toString();

        showToast("toast.permalink");

        try {
            await navigator.clipboard.writeText(url);
            console.log("Permalink kopiert:", url);

            // Vorübergehend den Titel ändern, damit man eine optische Rückmeldung bekommt.
            const oldTitle = button.title;
            button.title = "Link kopiert";

            setTimeout(() => { button.title = oldTitle; }, 1500);
        } catch (error) {
            console.error("Permalink konnte nicht kopiert werden:", error);
        }
    });

    map.getContainer().appendChild(button);
}




function isLayerVisible(map, layer) {
    // Dynamischer POI-Layer
    if (layer.id === "osm-pois") {
        if (!map.getLayer("osm-pois"))
            return false;

        return (map.getLayoutProperty("osm-pois", "visibility") !== "none");
    }

    // Raster-Layer
    const rasterId = `${layer.id}-raster`;

    if (map.getLayer(rasterId)) {
        return (map.getLayoutProperty(rasterId, "visibility") !== "none");
    }

    return false;
}




export function loadPermalink(map) {
    const params = new URLSearchParams(window.location.search);

    const language = params.get("lang");

    if (language)
        setLanguage(language);

    if (!params.has("lon") || !params.has("lat") || !params.has("z")) {
        return false;
    }

    const lon = parseFloat(params.get("lon"));
    const lat = parseFloat(params.get("lat"));
    const zoom = parseFloat(params.get("z"));

    if (!Number.isFinite(lon) || !Number.isFinite(lat) || !Number.isFinite(zoom)) {
        console.error("Ungültiger Permalink");
        return false;
    }

    const poi = params.get("poi");

    if (poi) {
        pendingPermalinkPoi = poi;
        console.log("PERMALINK POI vorgemerkt:", pendingPermalinkPoi);
    }

    // Bearing und Pitch
    const bearing = parseFloat(params.get("b"));
    const pitch = parseFloat(params.get("p"));
    const jumpOptions = {center : [ lon, lat ], zoom : zoom};

    if (Number.isFinite(bearing))
        jumpOptions.bearing = bearing;

    if (Number.isFinite(pitch))
        jumpOptions.pitch = pitch;

    // Kartenausschnitt herstellen.
    map.jumpTo(jumpOptions);

    // Layer und Transparenzen wiederherstellen.
    restoreLayers(map, params);
    refreshLayerControl(map);

    console.log("Permalink geladen:", {lon, lat, zoom, bearing, pitch, poi, language});

    return true;
}





function restoreLayers(map, params) {
    const layerParameter = params.get("layers");

    if (!layerParameter)
        return;

    const activeLayers = new Map();

    for (const entry of layerParameter.split(",")) {
        const parts = entry.split(":");
        const id = parts[0];
        const opacity = parts.length > 1 ? parseFloat(parts[1]) : 1;

        activeLayers.set(id, Number.isFinite(opacity) ? opacity : 1);
    }

    // Zuerst alle Layer deaktivieren.
    for (const layer of layerConfig) {
        let mapLayerId;

        if (layer.id === "osm-pois")
            mapLayerId = "osm-pois";
        else
            mapLayerId = `${layer.id}-raster`;

        if (map.getLayer(mapLayerId)) {
            map.setLayoutProperty(mapLayerId, "visibility", "none");
        }
    }

    // Danach die im Permalink gespeicherten Layer wieder aktivieren.
    for (const [id, opacity] of activeLayers) {
        let mapLayerId;

        if (id === "osm-pois")
            mapLayerId = "osm-pois";
        else
            mapLayerId = `${id}-raster`;

        if (!map.getLayer(mapLayerId))
            continue;

        map.setLayoutProperty(mapLayerId, "visibility", "visible");

        // Transparenz wiederherstellen.
        const layerType = map.getLayer(mapLayerId).type;

        if (layerType === "raster") {
            map.setPaintProperty(mapLayerId, "raster-opacity", opacity);
        }
    }
}

export function getPendingPermalinkPoi() { return pendingPermalinkPoi; }

export function clearPendingPermalinkPoi() { pendingPermalinkPoi = null; }




function showToast(i18nKey) {

    const duration = 2000;

    let toast = document.getElementById("app-toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "app-toast";
        document.body.appendChild(toast);
    }

    toast.textContent = tr(i18nKey);
    toast.classList.add("show");

    clearTimeout(toast._hideTimer);

    toast._hideTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, duration);
}

