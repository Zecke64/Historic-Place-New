export const layers =
[
    {
        id: "opentopomap",

        category: "base",

        titleKey: "layer.opentopomap",

        icon: "map",

        visible: true,

        opacity: 1.0,

        display:
        {
            overview:
            {
                minZoom: 0
            },

            detail:
            {
                minZoom: 0
            }
        },

        mapLayers:
        [
            {
                id: "topo",

                type: "raster"
            }
        ]
    },

    {
        id: "osm-pois",

        category: "overlay",

        titleKey: "layer.osmPois",

        icon: "poi",

        visible: true,

        opacity: 1.0,

        display:
        {
            overview:
            {
                minZoom: 12
            },

            detail:
            {
                minZoom: 12
            }
        },

	mapLayers:
        [
            {
                id:"poi-clusters",
                type:"circle"
            },

            {
                id:"poi-cluster-count",
                type:"symbol"
            },

            {
                id:"osm-pois",
                type:"symbol"
            }
        ]
    }
];

