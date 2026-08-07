export const layerConfig =
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
        opacity: 1.0,
	source:
        {
            type:"raster",
            tiles: [ "https://tile.opentopomap.org/{z}/{x}/{y}.png" ],
            tileSize:256
        },

        display:
        {
            overview: { minZoom: 0 },
            detail: { minZoom: 0 }
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
    // Overlay-Layer: Können alle aktiv sein
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
	source:
        {
            type:"raster",
            tiles: [ "https://tiles.historic.place/mining/Kliver/{z}/{x}/{y}.png" ],
            tileSize:256
        },
	shape:
        {
            type: "geojson",
            url: "./shape/Kliver.json",
            style:
            {
                fillOpacity: 0.25,
                lineOpacity: 0.8
            }
        },
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
                id: "kliver-fill",
                type: "fill"
            },
            {
                id: "kliver-outline",
                type: "line"
            },
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
	type: "poi",
        titleKey: "layer.osmPois",
        icon: "poi",
        visible: true,
	opacityControl: false,
        //opacity: 1.0,
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

