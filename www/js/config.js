// Zentrale Anwendungskonfiguration

export const CONFIG = {

    map : {

        // Startposition Saarland / Deutschland
        center : [ 9.5, 51.25 ],

        zoom : 6,

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
