import {CONFIG} from "./config.js";

let map;

/**
 * Karte erzeugen
 */
export function createMap() {

    map = new maplibregl.Map({

        container : "map",

        style : CONFIG.map.style,

        center : CONFIG.map.center,

        zoom : CONFIG.map.zoom,

        minZoom : CONFIG.map.minZoom,

        maxZoom : CONFIG.map.maxZoom,

        attributionControl : false

    });

    return map;
}

/**
 * Karteninstanz zurückgeben
 */
export function getMap() { return map; }
