// Zentrale Anwendungskonfiguration

export const CONFIG = {

    map : {

        // Startposition Saarland / Deutschland
        center : [ 6.95, 49.25 ],

        zoom : 3.5,

        minZoom : 2,
        maxZoom : 19,

        // MapLibre Style
        //
        // Kann später einfach ersetzt werden:
        // eigener Tile-Server,
        // MapTiler,
        // OpenMapTiles usw.

        style : "https://demotiles.maplibre.org/style.json"

    }

};
