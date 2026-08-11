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

    {
        id: "openstreetmap",
        category: "base",
        titleKey: "layer.openstreetmap",
        icon: "map",
        visible: true,
        opacity: 1.0,
        opacity: 1.0,
	source:
        {
            type:"raster",
            tiles: [ 
		    "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" ,
		    "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png" ,
		    "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png" ,
		   ],
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
                id: "osm",
                type: "raster"
            }
        ]
    },

    //
    // Overlay-Layer: Können alle aktiv sein
    //

    {
        id: "kdr1893",
        category: "overlay",
        titleKey: "layer.kdr1893",
        icon: "map",
        type: "raster",
        group: "Historische Karten",
        visible: false,
        opacity: 1.0,
	source: {
            type:"raster",
            tiles: [ "https://tiles.historic.place/kdr1893/{z}/{x}/{y}.png" ],
            tileSize:256
        },
	shape: {
            type: "geojson",
            url: "./shape/kdr1893.json",
            style: {
                fillOpacity: 0.25,
                lineOpacity: 0.8
            }
        },
        display: {
            overview: { minZoom: 10 },
            detail: { minZoom: 13 }
        },
        mapLayers:
        [
            { id: "kdr1893-fill", type: "fill" },
            { id: "kdr1893-outline", type: "line" },
            { id: "kdr1893-raster", type: "raster" }
        ],
	credit: '<a href="https://www.davidrumsey.com" target="_blank">David Rumsey Map Collection</a>'

    },

    {
        id: "gm1936",
        category: "overlay",
        titleKey: "layer.gm1936",
        icon: "map",
        type: "raster",
        group: "Historische Karten",
        visible: false,
        opacity: 1.0,
	source: {
            type:"raster",
            tiles: [ "https://tiles.historic.place/gm1936/{z}/{x}/{y}.png" ],
            tileSize:256
        },
	shape: {
            type: "geojson",
            url: "./shape/gm1936.json",
            style: {
                fillOpacity: 0.25,
                lineOpacity: 0.8
            }
        },
        display: {
            overview: { minZoom: 10 },
            detail: { minZoom: 13 }
        },
        mapLayers:
        [
            { id: "gm1936-fill", type: "fill" },
            { id: "gm1936-outline", type: "line" },
            { id: "gm1936-raster", type: "raster" }
        ],
	credit: '<a href="https://lib.byu.edu/collections/german-maps/" target="_blank">BYU Harold B. Lee Library</a>'

    },

    {
        id: "kliver",
        category: "overlay",
        titleKey: "layer.kliver",
        icon: "map",
        type: "raster",
        group: "Historische Karten",
        visible: false,
        opacity: 1.0,
	source: {
            type:"raster",
            tiles: [ "https://tiles.historic.place/mining/Kliver/{z}/{x}/{y}.png" ],
            tileSize:256
        },
	shape: {
            type: "geojson",
            url: "./shape/Kliver.json",
            style: {
                fillOpacity: 0.25,
                lineOpacity: 0.8
            }
        },
        display: {
            overview: { minZoom: 10 },
            detail: { minZoom: 14 }
        },
        mapLayers:
        [
            { id: "kliver-fill", type: "fill" },
            { id: "kliver-outline", type: "line" },
            { id: "kliver-raster", type: "raster" }
        ],
	credit: 'Kliver courtesy of <a href="https://www.sulb.uni-saarland.de/" target="_blank">SULB</a>'

    },

    {
        id: "puettl1822",
        category: "overlay",
        titleKey: "layer.puettl1822",
        icon: "map",
        type: "raster",
        group: "Historische Karten",
        visible: false,
        opacity: 1.0,
	source: {
            type:"raster",
            tiles: [ "https://tiles.historic.place/city/Puettlingen/Nassau_1822/{z}/{x}/{y}.png" ],
            tileSize:256
        },
	shape: {
            type: "geojson",
            url: "./shape/Puettl-Nassau-1822.json",
            style: {
                fillOpacity: 0.25,
                lineOpacity: 0.8
            }
        },
        display: {
            overview: { minZoom: 10 },
            detail: { minZoom: 12 }
        },
        mapLayers:
        [
            { id: "puettl1822-fill", type: "fill" },
            { id: "puettl1822-outline", type: "line" },
            { id: "puettl1822-raster", type: "raster" }
        ],
	credit: 'Saarländisches Landesarchiv'

    },


    // 
    //  POI-Layer - sollte keinen Slider bekommen
    //

    {
        id: "osm-pois",
        category: "hist-objects",
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

