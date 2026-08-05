export const layers =
[

    //
    // Basiskarten: nur eine ist aktiv
    //

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

    //
    // Overlay-Layer: Können alle aktive sein, haben Transparenz-Slider
    //

    {
        id: "kliver",
        category: "overlay",
        titleKey: "layer.kliver",
        icon: "map",
        type: "raster",
        group: "Historische Karten",
        visible: false,
        opacity: 1.0,
        display:
        {
            overview:
            {
                minZoom: 10
            },
            detail:
            {
                minZoom: 14
            }
        },
        mapLayers:
        [
            {
                id: "kliver-raster",
                type: "raster"
            }
        ]

    },


    // 
    //  POI-Layer - sollte keinen Slider bekommen
    //

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

