export const layerTemplates =
{
    "basis-template":
    {
        category:   "overlay",
        icon:       "map",
        visible:    false,
        opacity:    1.0
    },

    "raster-template":
    {
        extends: "basis-template",
        type:    "raster",
        source:
        {
            type:     "raster",
            tileSize: 256
        },
        display:
        {
            overview: { minZoom: 0 },
            detail:   { minZoom: 0 }
        }
    },

    "ovl-raster-template":
    {
	extends: "raster-template",
        shape:
        {
            type: "geojson"
        },
    }
};

export const layerConfig = [

    // #################################################################################
    //
    //  Basiskarten: nur eine ist aktiv
    //
    // #################################################################################

    {
        id : "opentopomap",
        template : "raster-template",
        category : "base",
        titleKey : "layer.opentopomap",
        source : {tiles : [ "https://tile.opentopomap.org/{z}/{x}/{y}.png" ]},
    },

    {
        id : "openstreetmap",
        template : "raster-template",
        category : "base",
        titleKey : "layer.openstreetmap",
        visible : true,
        source : {
            tiles : [
                "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
                "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
                "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
        },
    },

    // #################################################################################
    //
    //  Overlay-Layer: Können alle aktiv sein
    //
    // #################################################################################

    //*********************  Karte des Deutschen Reiches  1893   ***********************
    {
        id : "kdr1893",
        template : "ovl-raster-template",
        titleKey : "layer.kdr1893",
        source : {
            tiles : [ "https://tiles.historic.place/kdr1893/{z}/{x}/{y}.png" ],
        },
        shape : {
            url : "./shape/kdr1893.json",
        },
        display : {
            overview : {minZoom : 8}, 
            detail :   {minZoom : 13}
        },
        credit :
            '<a href="https://www.davidrumsey.com" target="_blank">David Rumsey Map Collection</a>'
    },

    //*********************  Topographische Karten ca. 1935   ***********************
    {
        id : "gm1936",
        template : "ovl-raster-template",
        titleKey : "layer.gm1936",
        source : {
            tiles : [ "https://tiles.historic.place/gm1936/{z}/{x}/{y}.png" ],
        },
        shape : {
            url : "./shape/gm1936.json",
        },
        display : {
            overview :  {minZoom : 9}, 
            detail :    {minZoom : 13}
        },
        credit :
          '<a href="https://lib.byu.edu/collections/german-maps/" target="_blank">BYU Harold B. Lee Library</a>'
    },

    //*********************  Kliver'sche Flözkarte ca. 1893   ***********************
    {
        id : "kliver",
        template : "ovl-raster-template",
        titleKey : "layer.kliver",
        source : {
            tiles : [ "https://tiles.historic.place/mining/Kliver/{z}/{x}/{y}.png" ]
        },
        shape : { url : "./shape/Kliver.json" },
        display : {
            overview :  {minZoom : 10}, 
            detail :    {minZoom : 14}
        },
        credit :
            'Kliver courtesy of <a href="https://www.sulb.uni-saarland.de/" target="_blank">SULB</a>'
    },

    //*********************  Püttlinger Bannkarte 1822   ***********************
    {
        id : "puettl1822",
        template : "ovl-raster-template",
        titleKey : "layer.puettl1822",
        source : {
            tiles : [ "https://tiles.historic.place/city/Puettlingen/Nassau_1822/{z}/{x}/{y}.png" ],
        },
        shape : {
            url : "./shape/Puettl-Nassau-1822.json",
        },
        display : {
            overview : {minZoom : 11}, 
            detail :   {minZoom : 12}
        },
        credit : 'Saarländisches Landesarchiv'
    },

    // #################################################################################
    //
    //  Historische Objekte
    //
    // #################################################################################

    {
        id :        "osm-pois",
        category :  "hist-objects",
        type :      "poi",
        titleKey :  "layer.osmPois",
        icon :      "poi",
        visible :   true,
        opacityControl : false,
        display : {
            overview :  {minZoom : 12}, 
            detail :    {minZoom : 12}
        },
        mapLayers : [
            {id : "poi-clusters",       type : "circle"}, 
            {id : "poi-cluster-count",  type : "symbol"},
            {id : "osm-pois",           type : "symbol"},
            {id : "osm-object-fill",    type : "fill"},
            {id : "osm-object-line",    type : "line"},
            {id : "osm-object-lines",   type : "line"},
            {id : "osm-object-icons",   type : "symbol"}
        ]
    }
];
