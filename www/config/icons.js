/*

Hier stehen die Regeln zur Bestimmung des Icons.
Sie sind unabhängig von den Regeln für Zoomstufen.
Spezifischere Regeln sollten VOR allgemeineren Regeln kommen:

    historic=castle + castle_type=manor --> Icon: manor
    historic=castle --> Icon castle

Jede rule sollte ein minZoom haben. Das wird verwendet im Falle von site relations in denen
das Objekt evtl. Mitglied ist

*/

export function AND(...conditions) { return {type : "AND", conditions}; }
export function OR(...conditions) { return {type : "OR", conditions}; }



// Diese Werte gelten für unsichtbare Obejkte: keine matching rule
// werden automatisch unterhalb minZoom angewendet
export const invisibleStyle = {
    visible :           false,
    icon :              "null",
    iconSize :          0,
    lineWidth :         0,
    fillOpacity :       0,
};

// Das hier sind die default Style Werte für Icons, Lines und Areas (für sichtbare Objekte)
export const defaultStyle = {
    visible :           true,
    icon :              "null",
    iconSize :          0.8,
    rotation:           false,
    lineWidth :         3,
    lineColor :         "#3388ff",  // hellblau
    fillColor :         "#3388ff",
    fillOpacity :       0.2,
    membersLine :       true,       // Lines/Fill bei site relation member anzeigen
    membersIconSize :   0.5,        // Size Faktor zur IconSize der Relation (0=unsichtbar, 1=genauso groß)
};




export const iconRules = [

// *****************************   Zoom 10   *****************************

    // Stadtmauer
{
    condition: AND(
        OR(["historic", "citywalls"], ["barrier", "city_wall"], ["wall", "castle_wall"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 10,
    icon: "image_wall",
    iconSize : 0,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    membersIconSize : 0,
    zoom: {
        10 : {
            iconSize: 0,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        11 : {
            iconSize: 0,
            lineWidth: 0.5,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        12 : {
            iconSize: 0,
            lineWidth: 1,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        13 : {
            iconSize: 0,
            lineWidth: 2,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        14 : {
            iconSize: 0,
            lineWidth: 3,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        15 : {
            iconSize: 0,
            lineWidth: 3,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        16 : {
            iconSize: 0,
            lineWidth: 4,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        17 : {
            iconSize: 0.5,
            lineWidth: 4,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
    },
},
{
        match: [
        ["historic", "citywalls"],
        ["barrier", "city_wall"],
        ["wall", "castle_wall"],
    ],
    minZoom : 10,
    icon: "wall",
    iconSize: 0,
    lineWidth: 0,
    lineColor: "#8b4513",
    fillColor: "#8b4513",
    fillOpacity: 0,
    membersIconSize : 0,
    zoom: {
        10 : {
            iconSize: 0,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        11 : {
            iconSize: 0,
            lineWidth: 0.5,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        12 : {
            iconSize: 0,
            lineWidth: 1,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        13 : {
            iconSize: 0,
            lineWidth: 2,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        14 : {
            iconSize: 0,
            lineWidth: 3,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        15 : {
            iconSize: 0,
            lineWidth: 3,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        16 : {
            iconSize: 0,
            lineWidth: 4,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        17 : {
            iconSize: 0.5,
            lineWidth: 4,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
    },
},
     // Kloster
{
    condition: AND(
        OR(["building", "monastery"], ["amenity", "monastery"], ["historic", "monastery"], ["historic", "abbey"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 10,
    icon: "image_monastery",
    iconSize : 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    membersIconSize :   0,
    zoom: {
        11 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        12 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        13 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        14 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
{
    match: [
        ["building", "monastery"],
        ["amenity", "monastery"],
        ["historic", "monastery"],
        ["historic", "abbey"],
    ],
    minZoom : 10,
    icon: "monastery",
    iconSize : 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    membersIconSize :   0,
    zoom: {
        11 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        12 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        13 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        14 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
{
    // Palast
    condition: AND(
        OR(["historic", "palace"], ["castle_type", "palace"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 15,
    icon: "image_palast",
    iconSize: 1,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#0000FF",
    fillOpacity: 0,
    zoom: {
       /* 11 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        12 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        13 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        14 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },*/
        15 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0.20
        },
    },
},
{
    match: [
        ["historic", "palace"],
        ["castle_type", "palace"],
    ],
    minZoom : 15,
    icon: "palast",
    iconSize: 1,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#0000FF",
    fillOpacity: 0,
    zoom: {
      /*  11 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        12 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        13 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        14 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },*/
        15 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0.20
        },
    },
},
{
    // Schloss
    condition: AND(
        OR(["castle_type", "stately"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 10,
    icon: "image_schloss",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#0000FF",
    fillOpacity: 0,
    membersIconSize : 0,
    zoom: {
        10 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0,
        },
        11 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0,
        },
        12 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0,
        },
        13 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0,
        },
        14 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0,
        },
        15 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0.20,
        },
    },
},
{
    match: [
        ["castle_type", "stately"],
    ],
    minZoom : 10,
    icon: "schloss",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#0000FF",
    fillOpacity: 0,
    membersIconSize : 0,
    
    zoom: {
        10 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0,
        },
        11 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0,
        },
        12 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
            
        },
        13 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0,
        },
        14 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0,
        },
        15 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0.20,
        },
    },
},
{
    // Shiro
    condition: AND(
        OR(["castle_type", "shiro"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 10,
    icon: "image_shiro",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#0000FF",
    fillOpacity: 0,
    zoom: {
        11 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        12 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        13 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        14 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0.20
        },
    },
},
{
    match: [
        ["castle_type", "shiro"],
    ],
    minZoom : 10,
    icon: "shiro",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#0000FF",
    fillOpacity: 0,
    zoom: {
        11 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        12 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        13 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        14 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0.20
        },
    },
},
{
    // Burg
    condition: AND(
        OR(["castle_type", "defensive"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 10,
    icon: "image_burg",
    iconSize: 1,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#0000FF",
    fillOpacity: 0,
    membersIconSize : 0,
    zoom: {
        11 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        12 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        13 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        14 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0.20
        },
    },
},
{
    match: [
        ["castle_type", "defensive"],
    ],
    minZoom : 10,
    icon: "burg",
    iconSize: 1,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#0000FF",
    fillOpacity: 0,
    membersIconSize : 0,
    zoom: {
        11 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        12 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        13 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        14 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0.20
        },
    },
},
    // Herrenhaus
{
    condition: AND(
        OR(["castle_type", "manor"], ["historic", "manor"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 10,
    icon: "image_manor",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#0000FF",
    fillOpacity: 0,
    membersIconSize : 0,
    zoom: {
        11 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        12 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        13 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        14 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0.20
        },
    },
},
{
    match: [
        ["historic", "manor"],
        ["castle_type", "manor"],
    ],
    minZoom : 10,
    icon: "manor",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#0000FF",
    fillOpacity: 0,
    membersIconSize : 0,
    zoom: {
        11 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        12 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        13 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        14 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#0000FF",
            fillOpacity: 0.20
        },
    },
},
    // Festung
{
    condition: AND(
        OR(["historic", "fort"], ["castle_type", "fortress"],  ["castle_type", "kremlin"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 10,
    icon: "image_castle",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#FF6600",
    fillOpacity: 0,
    membersIconSize : 0,
    zoom: {
        11 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0,
        },
        12 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0,
        },
        13 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0,
        },
        14 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0.20,
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0.20,
        },
    },
},
{
    condition: AND(
        OR(["castle_type", "fortress"], ["castle_type", "kremlin"], ["historic", "fort"])
    ),
    minZoom : 10,
    icon: "castle",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#FF6600",
    fillOpacity: 0,
    membersIconSize : 0,
    zoom: {
        11 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0,
        },
        12 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0,
        },
        13 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0,
        },
        14 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0.20,
        },
        15 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0.20,
        },
    },
},
    // Burg/Schloss/Festung allg.
{
    condition: AND(
        OR(["historic", "castle"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 10,
    icon: "image_castle2",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#FF6600",
    fillOpacity: 0,
    membersIconSize : 0,
    zoom: {
        11 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0,
        },
        12 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0,
        },
        13 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0,
        },
        14 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0.20,
        },
        15 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0.20,
        },
    },
},
{
    match: [
        ["historic", "castle"],
    ],
    minZoom : 10,
    icon: "castle2",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#FF6600",
    fillOpacity: 0,
    membersIconSize : 0,
    zoom: {
        11 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0,
        },
        12 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0,
        },
        13 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0,
        },
        14 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0.20,
        },
        15 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#FF6600",
            fillOpacity: 0.20,
        },
    },
},
    // Wüstung
{
    condition: AND(
        OR(["abandoned:place", "village"], ["abandoned:place", "hamlet"], ["abandoned", "village"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 10,
    icon: "image_wuestung",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    condition: AND(
        OR(["abandoned:place", "village"], ["abandoned:place", "hamlet"], ["abandoned", "village"]),
    ),
    minZoom : 10,
    icon: "wuestung",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Arbeitslager
{
    condition: AND(
        OR(["prison_camp", "labor_camp"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 10,
    icon: "image_pow_camp",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    condition: AND(
        OR(["prison_camp", "labor_camp"])
    ),
    minZoom : 10,
    icon: "pow_camp",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Gefangenenlager
{
    condition: AND(
        OR(["prison_camp", "pow_camp"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 10,
    icon: "image_pow_camp",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    condition: AND(
        OR(["prison_camp", "pow_camp"])
    ),
    minZoom : 10,
    icon: "pow_camp",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Konzentrationslager
{
    condition: AND(
        OR(["prison_camp", "concentration_camp"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 10,
    icon: "image_concentration_camp",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    condition: AND(
        OR(["prison_camp", "concentration_camp"])
    ),
    minZoom : 10,
    icon: "concentration_camp",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Forsthaus
{
    condition: AND(
        OR(["historic:place", "foresters_house"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 10,
    icon: "image_foresters_house",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    match: [["historic:place", "foresters_house"]],
    minZoom : 10,
    icon: "foresters_house",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Paläontologie
{
    condition: AND(
        OR(["geological", "palaeontological_site"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 10,
    icon: "image_palaeontological_site",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    match: [["geological", "palaeontological_site"]],
    minZoom : 10,
    icon: "palaeontological_site",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},

// *****************************   Zoom 11   *****************************

    // Windmühle
{
    match: [["razed:man_made", "windmill"]],
    minZoom : 11,
    icon: "razed-windmill",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    condition: AND(
        OR(["man_made", "windmill"], ["abandoned:man_made", "windmill"], ["disused:man_made", "windmill"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 11,
    icon: "image_windmill",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    match: [["man_made", "windmill"], ["abandoned:man_made", "windmill"], ["disused:man_made", "windmill"]],
    minZoom : 11,
    icon: "windmill",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Wassermühle
{
    condition: AND(
        OR(["man_made", "watermill"], ["abandoned:man_made", "watermill"], ["disused:man_made", "watermill"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 11,
    icon: "image_watermill",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    match: [["man_made", "watermill"], ["abandoned:man_made", "watermill"], ["disused:man_made", "watermill"]],
    minZoom : 11,
    icon: "watermill",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Leuchtturm
{
    condition: AND(
        OR(["man_made", "lighthouse"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 11,
    icon: "image_lighthouse",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    match: [["man_made", "lighthouse"]],
    minZoom : 11,
    icon: "lighthouse",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},

    // Archäologie
    // Menhir
{
    condition: AND(
        OR(["megalith_type", "menhir"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 11,
    icon: "image_menhir",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    match: [["megalith_type", "menhir"]],
    minZoom : 11,
    icon: "menhir",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Dolmen
{
    condition: AND(
        OR(["megalith_type", "dolmen"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 11,
    icon: "image_dolmen",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    match: [["megalith_type", "dolmen"]],
    minZoom : 11,
    icon: "dolmen",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Ganggrab
{
    condition: AND(
        OR(["megalith_type", "passage_grave"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 11,
    icon: "image_passage_grave",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    match: [["megalith_type", "passage_grave"]],
    minZoom : 11,
    icon: "passage_grave",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Steinkreis
{
    condition: AND(
        OR(["megalith_type", "stone_circle"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 11,
    icon: "image_stone_circle",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    match: [["megalith_type", "stone_circle"]],
    minZoom : 11,
    icon: "stone_circle",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Turmbauten
{
    condition: AND(
        OR(["megalith_type", "nuraghe"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 11,
    icon: "image_nuraghe",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    match: [["megalith_type", "nuraghe"]],
    minZoom : 11,
    icon: "nuraghe",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Steinschiff
{
    condition: AND(
        OR(["megalith_type", "stone_ship"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 11,
    icon: "image_stone_ship",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    match: [["megalith_type", "stone_ship"]],
    minZoom : 11,
    icon: "stone_ship",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Hügelgrab
{
    condition: AND(
        OR(["archaeological_site", "tumulus"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 11,
    icon: "image_tumulus",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    match: [["archaeological_site", "tumulus"]],
    minZoom : 11,
    icon: "tumulus",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Petroglyphe
{
    condition: AND(
        OR(["archaeological_site", "petroglyph"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 11,
    icon: "image_petroglyph",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    match: [["archaeological_site", "petroglyph"]],
    minZoom : 11,
    icon: "petroglyph",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Archaeological City
{
    condition: AND(
        OR(["archaeological_site", "city"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 11,
    icon: "image_archaeological_city",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    match: [["archaeological_site", "city"]],
    minZoom : 11,
    icon: "archaeological_city",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Befestigung
{
    condition: AND(
        OR(["archaeological_site", "fortification"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 11,
    icon: "image_fortification",
    iconSize: 0,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
    membersIconSize : 0,
    zoom: {
        11 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
        12 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
        13 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
        14 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
        15 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
    },
},
{
    match: [["archaeological_site", "fortification"]],
    minZoom : 11,
    icon: "fortification",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
    membersIconSize : 0,
    zoom: {
        11 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
        12 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
        13 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
        14 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
        15 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
    },
},
    // Archäologie allgemein
{
    condition: AND(
        OR(["historic", "archaeological_site"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 11,
    icon: "image_archaeologie",
    iconSize: 0,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
    membersIconSize : 0,
    zoom: {
        11 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
        12 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
        13 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
        14 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
        15 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
    },
},
{
    match: [["historic", "archaeological_site"]],
    minZoom : 11,
    icon: "archaeologie",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
    membersIconSize : 0,
    zoom: {
        11 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
        12 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
        13 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
        14 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
        15 : {
            iconSize: 0.8,
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#8b4513",
            fillOpacity: 0,
        },
    },
},
    // Schlachtfeld
{
    condition: AND(
        OR(["historic", "battlefield"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 11,
    icon: "image_battlefield",
    iconSize: 0.8,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    match: [["historic", "battlefield"]],
    minZoom : 11,
    icon: "battlefield",
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Findling
{
    condition: AND(
        ["natural", "stone"],
        OR(["name", "*"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 11,
    icon: "image_stein",
    iconSize: 0.5,
},
{
    condition: AND(
        ["natural", "stone"],
        OR(["name", "*"]),
    ),
    minZoom : 11,
    icon: "stein",
    iconSize: 0.8,
},
    // Park/Garten
{
    condition: AND(
        OR(["leisure", "garden"], ["leisure", "park"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"]),
        OR(["heritage", "*"])
    ),
    minZoom : 11,
    icon: "image_park",
    iconSize: 0,
    lineWidth: 0,
    lineColor: "#008b00",
    fillOpacity: 0,
    zoom: {
        12 : {
            iconSize: 0,
            lineWidth: 1,
            lineColor: "#008b00",
            fillColor: "#3388ff",
            fillOpacity: 0
        },
        13 : {
            iconSize: 0,
            lineWidth: 2,
            lineColor: "#008b00",
            fillColor: "#3388ff",
            fillOpacity: 0
        },
        14 : {
            iconSize: 0.5,
            lineWidth: 3,
            lineColor: "#008b00",
            fillColor: "#3388ff",
            fillOpacity: 0.15
        },
        15 : {
            iconSize: 0.5,
            lineWidth: 4,
            lineColor: "#008b00",
            fillColor: "#3388ff",
            fillOpacity: 0.15
        },
    },
},
{
    condition: AND(
                    OR(["leisure", "garden"], ["leisure", "park"]),
                    OR(["heritage", "*"])
    ),
    minZoom : 11,
    icon: "park",
    iconSize: 0,
    lineWidth: 0,
    lineColor: "#008b00",
    fillOpacity: 0,
    zoom: {
        12 : {
            iconSize: 0,
            lineWidth: 1,
            lineColor: "#008b00",
            fillColor: "#3388ff",
            fillOpacity: 0.25
        },
        13 : {
            iconSize: 0,
            lineWidth: 2,
            lineColor: "#008b00",
            fillColor: "#3388ff",
            fillOpacity: 0
        },
        14 : {
            iconSize: 0.5,
            lineWidth: 3,
            lineColor: "#008b00",
            fillColor: "#3388ff",
            fillOpacity: 0.15
        },
        15 : {
            iconSize: 0.5,
            lineWidth: 4,
            lineColor: "#008b00",
            fillColor: "#3388ff",
            fillOpacity: 0.15
        },
    },
},
    // Denkmalschutzgebiet
{
    condition: AND(
        OR(["protect_class", "22"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"]),
    ),
    minZoom : 11,
    icon: "image_heritage",
    iconSize: 0,
    lineWidth: 0,
    lineColor: "#FFDE21",
    fillColor: "#3388ff",
    fillOpacity: 0,
    zoom: {
        11 : {
            iconSize: 0,
            lineWidth: 0,
            lineColor: "#FFDE21",
            fillColor: "#3388ff",
            fillOpacity: 0
        },
        12 : {
            iconSize: 0,
            lineWidth: 1,
            lineColor: "#FFDE21",
            fillColor: "#3388ff",
            fillOpacity: 0
        },
        13 : {
            iconSize: 0,
            lineWidth: 2,
            lineColor: "#FFDE21",
            fillColor: "#3388ff",
            fillOpacity: 0
        },
        14 : {
            iconSize: 0,
            lineWidth: 3,
            lineColor: "#FFDE21",
            fillColor: "#3388ff",
            fillOpacity: 0.1
        },
        15 : {
            iconSize: 0.5,
            lineWidth: 4,
            lineColor: "#FFDE21",
            fillColor: "#3388ff",
            fillOpacity: 0.05
        },
    },
    
},
{
    match: [["protect_class", "22"]],
    icon: "heritage",
    minZoom : 11,
    iconSize: 0,
    lineWidth: 0,
    lineColor: "#FFDE21",
    fillColor: "#3388ff",
    fillOpacity: 0,
    zoom: {
        11 : {
            iconSize: 0,
            lineWidth: 0,
            lineColor: "#FFDE21",
            fillColor: "#3388ff",
            fillOpacity: 0
        },
        12 : {
            iconSize: 0,
            lineWidth: 1,
            lineColor: "#FFDE21",
            fillColor: "#3388ff",
            fillOpacity: 0
        },
        13 : {
            iconSize: 0,
            lineWidth: 2,
            lineColor: "#FFDE21",
            fillColor: "#3388ff",
            fillOpacity: 0
        },
        14 : {
            iconSize: 0,
            lineWidth: 3,
            lineColor: "#FFDE21",
            fillColor: "#3388ff",
            fillOpacity: 0.1
        },
        15 : {
            iconSize: 0.5,
            lineWidth: 4,
            lineColor: "#FFDE21",
            fillColor: "#3388ff",
            fillOpacity: 0.05
        },
    },
    
},
// Schiff
{
    condition: AND(
        ["historic", "ship"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_ship",
    iconSize: 0.8,
    lineWidth: 0,
},
{
    match: [["historic", "ship"]],
    minZoom : 13,
    icon: "ship",
    iconSize: 0.8,
    lineWidth: 0,
},
// Wrack
{
    condition: AND(
        ["historic", "wreck"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_wreck",
    iconSize: 0.8,
},
{
    match: [["historic", "wreck"]],
    minZoom : 13,
    icon: "wreck",
    iconSize: 0.8,
},

// *****************************   Zoom 12   *****************************

// Pinge
{
    condition: AND(
        ["natural", "sinkhole"], ["historic", "mine"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 12,
    icon: "image_pinge",
    iconSize: 1,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    condition: AND(
        ["natural", "sinkhole"],
        ["historic", "mine"]
    ),
    minZoom : 12,
    icon: "pinge",
    iconSize: 1,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Schacht oder Bergwerk geschlossen
{
    condition: AND(
        OR(["man_made", "mine"], ["man_made", "mineshaft"], ["historic", "mine"]),
        OR(["disused", "*"], ["abandoned", "*"], ["razed", "*"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"]),
    ),
    minZoom : 12,
    icon: "image_mine-d",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    condition: AND(
        OR(["man_made", "mine"], ["man_made", "mineshaft"], ["historic", "mine"]),
        OR(["disused", "*"], ["abandoned", "*"], ["razed", "*"]),
    ),
    minZoom : 12,
    icon: "mine-d",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Schacht oder Bergwerk
{
    condition: AND(
        OR(["man_made", "mine"], ["man_made", "mineshaft"], ["historic", "mine"]),
        OR(["historic", "*"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"]),
    ),
    minZoom : 12,
    icon: "image_mine",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    condition: AND(
        OR(["man_made", "mine"], ["man_made", "mineshaft"], ["historic", "mine"]),
        OR(["historic", "*"])
    ),
    minZoom : 12,
    icon: "mine",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Bergbaustollen geschlossen
{
    condition: AND(
        OR(["man_made", "adit"], ["abandoned:man_made", "adit"], ["disused:man_made", "adit"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"]),
        OR(["resource", "*"]),
    ),
    minZoom : 12,
    icon: "image_stollen-d",
    iconSize: 0.8,
    rotation: true,
    zoom: {
        12 : {
            rotation: true,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        13 : {
            rotation: true,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        14 : {
            rotation: true,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        15 : {
            icon: "image_stollen-or",
            rotation: true,
            iconSize: 1,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
    },
},
{
    condition: AND(
        OR(["man_made", "adit"], ["abandoned:man_made", "adit"], ["disused:man_made", "adit"]),
        OR(["resource", "*"]),
    ),
    minZoom : 12,
    icon: "stollen-d",
    iconSize: 0.8,
    rotation: true,
    zoom: {
        12 : {
            rotation: true,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        13 : {
            rotation: true,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        14 : {
            rotation: true,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        15 : {
            icon: "image_stollen-or",
            rotation: true,
            iconSize: 1,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
    },
},
    // Bergbaustollen
{
    condition: AND(
        OR(["man_made", "adit"], ["abandoned:man_made", "adit"], ["disused:man_made", "adit"]),
        OR(["resource", "*"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"]),
    ),
    minZoom : 12,
    icon: "image_stollen",
    iconSize: 0.8,
    rotation: true,
    zoom: {
        12 : {
            rotation: true,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        13 : {
            rotation: true,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        14 : {
            rotation: true,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        15 : {
            icon: "image_stollen-or",
            rotation: true,
            iconSize: 1,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
    },
},
{
    condition: AND(
        OR(["man_made", "adit"], ["abandoned:man_made", "adit"], ["disused:man_made", "adit"]),
        OR(["resource", "*"])
    ),
    minZoom : 12,
    icon: "stollen",
    iconSize: 0.8,
    rotation: true,
    zoom: {
        12 : {
            rotation: true,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        13 : {
            rotation: true,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        14 : {
            rotation: true,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
        15 : {
            icon: "image_stollen-or",
            rotation: true,
            iconSize: 1,
            lineWidth: 0,
            lineColor: "#8b4513",
            fillColor: "#8b4513",
            fillOpacity: 0
        },
    },
},
    // Stollen allgemein
{
    condition: AND(
        OR(["man_made", "adit"], ["abandoned:man_made", "adit"], ["disused:man_made", "adit"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"]),
    ),
    minZoom : 12,
    icon: "image_stollen2",
    iconSize: 0.8,
    rotation: true,
},
{
    condition: AND(
        OR(["man_made", "adit"], ["abandoned:man_made", "adit"], ["disused:man_made", "adit"]),
    ),
    minZoom : 12,
    icon: "stollen2",
    iconSize: 0.8,
    rotation: true,
},
    // Steinbruch
{
    condition: AND(
        OR(["historic", "quarry"], ["landuse", "quarry"], ["abandoned:landuse", "quarry"], ["disused:landuse", "quarry"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 12,
    icon: "image_steinbruch",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    condition: AND(
        OR(["historic", "quarry"], ["landuse", "quarry"], ["abandoned:landuse", "quarry"], ["disused:landuse", "quarry"]),
    ),
    minZoom : 12,
    icon: "steinbruch",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Felsenkeller
{
    condition: AND(
        ["man_made", "cellar_entrance"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 12,
    icon: "image_cellar",
    iconSize: 0.8,
},
{
    match: [["man_made", "cellar_entrance"]],
    icon: "cellar",
    minZoom : 12,
    iconSize: 0.8,
},
    // Bohrloch
{
    condition: AND(
        ["man_made", "drill_hole"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 12,
    icon: "image_bohrung",
    iconSize: 0.8,
},
{
    match: [["man_made", "drill_hole"]],
    minZoom : 12,
    icon: "bohrung",
},
    // Bergehalde
{
    condition: AND(
        OR(["landuse", "landfill"], ["man_made", "spoil_heap"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 12,
    icon: "image_halde",
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    match: [["landuse", "landfill"], ["man_made", "spoil_heap"]],
    minZoom : 12,
    icon: "halde",
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Naturdenkmal (Baum)
{
    condition: AND(
        OR(["natural", "tree"], ["natural", "tree_row"]),
        OR(["denotation", "natural_monument"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 12,
    icon: "image_tree",
    iconSize: 0.6,
    ineWidth: 1,
    lineColor: "#008b00",
},
{
    condition: AND(
        OR(["natural", "tree"], ["natural", "tree_row"]),
        OR(["denotation", "natural_monument"])
    ),
    minZoom : 12,
    icon: "tree",
    iconSize: 0.6,
    ineWidth: 1,
    lineColor: "#008b00",
},
    // Farm
{
    condition: AND(
        ["historic", "farm"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 12,
    icon: "image_farm",
    iconSize: 0.6,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    match: [["historic", "farm"]],
    minZoom : 12,
    icon: "farm",
    iconSize: 0.6,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Galgen
{
    condition: AND(
        ["historic", "gallows"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 12,
    icon: "image_gallows",
    iconSize: 0.8,
},
{
    match: [["historic", "gallows"]],
    minZoom : 12,
    icon: "gallows",
    iconSize: 0.8,
},

// *****************************   Zoom 13   *****************************

    // Türme
    // Glockenturm
{
    condition: AND(
        OR(["historic", "tower"],["building", "tower"], ["man_made", "tower"]),
        OR(["tower:type", "bell_tower"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_belltower",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    condition: AND(
        OR(["historic", "tower"], ["building", "tower"], ["man_made", "tower"]),
        OR(["tower:type", "bell_tower"])
    ),
    minZoom : 13,
    icon: "belltower",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Wachturm
{
    condition: AND(
        OR(["historic", "tower"], ["building", "tower"], ["man_made", "tower"]),
        OR(["tower:type", "watchtower"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_wachturm",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    condition: AND(
        OR(["historic", "tower"], ["building", "tower"], ["man_made", "tower"]),
        OR(["tower:type", "watchtower"])
    ),
    minZoom : 13,
    icon: "wachturm",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Aussichtsturm
{
    condition: AND(
        OR(["historic", "tower"], ["building", "tower"], ["man_made", "tower"]),
        OR(["tower:type", "observation"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_observation_tower",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    condition: AND(
        OR(["historic", "tower"], ["building", "tower"], ["man_made", "tower"]),
        OR(["tower:type", "observation"])
    ),
    minZoom : 13,
    icon: "observation_tower",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Bergfried
{
    condition: AND(
        OR(["historic", "tower"], ["building", "tower"], ["man_made", "tower"]),
        OR(["tower:type", "castle"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_observation_tower",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
{
    condition: AND(
        OR(["historic", "tower"], ["building", "tower"], ["man_made", "tower"]),
        OR(["tower:type", "castle"])
    ),
    minZoom : 13,
    icon: "bergfried",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0,
},
    // Trafoturm
{
    condition: AND(
        OR(["building", "transformer_tower"]),
                   OR(["man_made", "species_protection_tower"], ["heritage", "*"]),
                   OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_power",
},
{
    condition: AND(
        OR(["building", "transformer_tower"]),
        OR(["man_made", "species_protection_tower"], ["heritage", "*"])
    ),
    minZoom : 13,
    icon: "power",
},
    // Wasserturm
{
    condition: AND(
        OR(["historic", "water_tower"], ["building", "water_tower"], ["man_made", "water_tower"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_watertower",
},
{
    match: [["historic", "water_tower"], ["building", "water_tower"], ["man_made", "water_tower"]],
    minZoom : 13,
    icon: "watertower",
},
    // Turm allgemein
{
    condition: AND(
        OR(["historic", "tower"], ["building", "tower"], ["man_made", "tower"]),
                   OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_turm",
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#0000FF",
    fillOpacity: 0,
},
{
    match: [["historic", "tower"], ["building", "tower"]],
    minZoom : 13,
    icon: "turm",
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#0000FF",
    fillOpacity: 0,
},
    // Bunker
{
    condition: AND(
        OR(["military", "bunker"], ["historic", "bunker"], ["building", "bunker"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_bunker",
    zoom: {
        13 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#CC9999",
            fillOpacity: 0
        },
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#CC9999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#CC9999",
            fillOpacity: 0
        },
        16 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#CC9999",
            fillOpacity: 0.20
        },
        17 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#CC9999",
            fillOpacity: 0.20
        },
    },
},
{
    match: [["military", "bunker"], ["historic", "bunker"], ["building", "bunker"]],
    minZoom : 13,
    icon: "bunker",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#CC9999",
    fillOpacity: 0,
    zoom: {
        13 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#CC9999",
            fillOpacity: 0
        },
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#CC9999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#CC9999",
            fillOpacity: 0
        },
        16 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#CC9999",
            fillOpacity: 0.20
        },
        17 : {
            lineWidth: 2,
            lineColor: "#000000",
            fillColor: "#CC9999",
            fillOpacity: 0.20
        },
    },
},
    // Lokomotive
{
    condition: AND(
        ["historic", "locomotive"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_locomotive",
    iconSize: 0.8,
},
{
    match: [["historic", "locomotive"]],
    minZoom : 13,
    icon: "locomotive",
    iconSize: 0.8,
},
    // Flugzeug
{
    condition: AND(
        ["historic", "aircraft"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_aircraft",
    iconSize: 0.8,
    lineWidth: 0,
},
{
    match: [["historic", "aircraft"]],
    minZoom : 13,
    icon: "aircraft",
    iconSize: 0.8,
    lineWidth: 0,
},
    // Königlich-Sächsische Triangulation
{
    condition: AND(
        OR(["man_made", "survey_point"]),
        OR(["network", "Königlich-Sächsische Triangulation"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_trio",
    iconSize: 0.8,
},
{
    condition: AND(
        OR(["man_made", "survey_point"]),
        OR(["network", "Königlich-Sächsische Triangulation"])
    ),
    minZoom : 13,
    icon: "trio",
    iconSize: 0.8,
},
    // Vermessungspunkt
{
    condition: AND(
        OR(["man_made", "survey_point"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_trigpoint",
    iconSize: 0.8,
},
{
    match: [["man_made", "survey_point"]],
    minZoom : 13,
    icon: "trigpoint",
    iconSize: 0.8,
},
    // Industriegebäude
{
    condition: AND(
        OR(["historic", "industrial"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_industrial",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    membersIconSize : 0,
},
{
    match: [["historic", "industrial"]],
    minZoom : 13,
    icon: "industrial",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    membersIconSize : 0,
},
    // Wappenstein
{
    condition: AND(
        OR(["stone_type", "coat_of_arms"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_Coats_of_arms",
    iconSize: 0.5,
},
{
    match: [["stone_type", "coat_of_arms"]],
    minZoom : 13,
    icon: "Coats_of_arms",
    iconSize: 0.5,
},
    // Sühnestein
{
    condition: AND(
        OR(["stone_type", "conciliation_cross"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_suehnekreuz",
    iconSize: 0.5,
},
{
    match: [["stone_type", "conciliation_cross"]],
    minZoom : 13,
    icon: "suehnekreuz",
    iconSize: 0.5,
},
    // Historischer Stein
{
    condition: AND(
        OR(["historic", "stone"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_hstein",
    iconSize: 0.8,
},
{
    match: [["historic", "stone"]],
    minZoom : 13,
    icon: "hstein",
    iconSize: 0.8,
},
    // Grenzstein Historische Forstgrenze zur Abgrenzung des
    // kurfürstlich-sächsischen Waldbesitzes
{
    condition: AND(
        ["historic", "boundary_stone"],
        OR(["boundary_name", "Historische Forstgrenze zur Abgrenzung des kurfürstl.-sächs. Waldbesitzes"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_schwerter",
    iconSize: 0.5,
},
{
    condition: AND(
        ["historic", "boundary_stone"],
        OR(["boundary_name", "Historische Forstgrenze zur Abgrenzung des kurfürstl.-sächs. Waldbesitzes"]),
    ),
    minZoom : 13,
    icon: "schwerter",
    iconSize: 0.5,
},
    // Grenzstein
{
    condition: AND(
        OR(["historic", "boundary_stone"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_historic_boundary_stone",
    iconSize: 0.5,
},
{
    match: [["historic", "boundary_stone"]],
    minZoom : 13,
    icon: "historic_boundary_stone",
    iconSize: 0.5,
},
    // Wegkreuz
{
    condition: AND(
        OR(["historic", "wayside_cross"], ["man_made", "cross"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_cross",
    iconSize: 0.8,
    rotation: true,
},
{
    condition: OR(["historic", "wayside_cross"], ["man_made", "cross"]),
    minZoom : 13,
    icon: "cross",
    iconSize: 1,
    rotation: true,
},
    // Wegekapelle / Bildstock
{
    condition: AND(
        OR(["historic", "wayside_shrine"], ["historic", "tree_shrine"], ["historic", "wayside_chapel"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
        ),
    minZoom : 13,
    icon: "image_shrine",
    iconSize: 0.8,
    rotation: true,
},
{
    condition: OR(["historic", "wayside_shrine"], ["historic", "tree_shrine"], ["historic", "wayside_chapel"]),
    minZoom : 13,
    icon: "shrine",
    iconSize: 0.8,
    rotation: true,
},
    // Kursächsische Postmeilensäule
{
    condition: AND(
        ["historic", "milestone"],
        OR(["network", "Kursächsische_Postmeilensäule"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_viertelmeilenstein",
    iconSize: 0.5,
},
{
    condition: AND(
        ["historic", "milestone"],
        OR(["network", "Kursächsische_Postmeilensäule"])
    ),
    minZoom : 13,
    icon: "viertelmeilenstein",
    iconSize: 0.5,
},
    // Meilenstein/Wegweisersäulen/Distanzsäulen
{
    condition: AND(
        ["historic", "milestone"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
        ),
    minZoom : 13,
    icon: "image_milestone",
    iconSize: 0.8,
},
{
    match: [["historic", "milestone"]],
    minZoom : 13,
    icon: "milestone",
    iconSize: 1,
},
    // Rune stone
{
    condition: AND(
        ["historic", "rune_stone"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_runestone",
    iconSize: 0.8,
},
{
    match: [["historic", "rune_stone"]],
    minZoom : 13,
    icon: "runestone",
    iconSize: 0.5,
},
    // Dreschplatz
{
    condition: AND(
        ["historic", "threshing_floor"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 13,
    icon: "image_dreschplatz",
    iconSize: 0.8,
},
{
    match: [["historic", "threshing_floor"]],
    minZoom : 13,
    icon: "dreschplatz",
    iconSize: 0.8,
},

// *****************************   Zoom 14   *****************************

    // Kapelle
{
    condition: AND(
        OR(["historic", "chapel"],  ["building", "chapel"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 14,
    icon: "image_chapel",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
},
{
    match: [
        ["historic", "chapel"],
        ["building", "chapel"]
    ],
    minZoom : 14,
    icon: "chapel",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
},

    // Religiöse Stätte
    //orthodoxe Kirche
{
    condition: AND(
        ["amenity", "place_of_worship"],
        ["religion", "christian"],
        OR(
            ["denomination", "orthodox"],
            ["denomination", "greek_orthodox"],
            ["denomination", "coptic_orthodox"],
            ["denomination", "russian_orthodox"],
            ["denomination", "serbian_orthodox"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 14,
    icon: "image_orthodox",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            iconSize: 0.5,
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
{
    condition: AND(
        ["amenity", "place_of_worship"],
        ["religion", "christian"],
        OR(
            ["denomination", "orthodox"],
            ["denomination", "greek_orthodox"],
            ["denomination", "coptic_orthodox"],
            ["denomination", "russian_orthodox"],
            ["denomination", "serbian_orthodox"]
        )
    ),
    minZoom : 14,
    icon: "orthodox",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            iconSize: 0.5,
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
    // christliche Kirche
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "christian"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 14,
    icon: "image_christian",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "christian"])
    ),
    minZoom : 14,
    icon: "christian",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
    // buddhistische Kirche
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "buddhist"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 14,
    icon: "image_buddhist",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "buddhist"])
    ),
    minZoom : 14,
    icon: "buddhist",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
    // Hindu
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "hindu"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 14,
    icon: "image_hindu",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "hindu"])
    ),
    minZoom : 14,
    icon: "hindu",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
    // Jewish
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "jewish"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
                   
    ),
    minZoom : 14,
    icon: "image_jewish",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "jewish"])
    ),
    minZoom : 14,
    icon: "jewish",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
    // Muslim
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "muslim"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 14,
    icon: "image_muslim",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "muslim"])
    ),
    minZoom : 14,
    icon: "muslim",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "shinto"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 14,
    icon: "image_shinto",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "shinto"])
    ),
    minZoom : 14,
    icon: "shinto",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
    // Sikh
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "sikh"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 14,
    icon: "image_sikh",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "sikh"])
    ),
    minZoom : 14,
    icon: "sikh",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
    // Taoist
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "taoist"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 14,
    icon: "image_taoist",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "taoist"])
    ),
    minZoom : 14,
    icon: "taoist",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
    // Pastafarian
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "pastafarian"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
                   
    ),
    minZoom : 14,
    icon: "image_fsm",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["religion", "pastafarian"])
    ),
    minZoom : 14,
    icon: "fsm",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
    // Andachtsstätte allg.
{
    condition: AND(
        ["amenity", "place_of_worship"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 14,
    icon: "image_worship",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
{
    match: [["amenity", "place_of_worship"]],
    minZoom : 14,
    icon: "worship",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
    // Kirchengebäude
{
    condition: AND(
        OR(["historic", "church"],["building", "church"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
        ),
    minZoom : 14,
    icon: "image_kirche",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
{
    match: [
        ["historic", "church"],
        ["building", "church"]
    ],
    minZoom : 14,
    icon: "kirche",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#669999",
    fillOpacity: 0,
    zoom: {
        14 : {
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
        15 : {
            lineWidth: 3,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0.20
        },
    },
},
    // Grab
{
    condition: AND(
        ["historic", "tomb"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 14,
    icon: "image_tomb",
    iconSize: 0.5,
    lineWidth: 0,
},
{
    match: [["historic", "tomb"]],
    minZoom : 14,
    icon: "tomb",
    iconSize: 0.5,
    lineWidth: 0,
},
    // Bombenkrater
{
    condition: AND(
        ["historic", "bomb_crater"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 14,
    icon: "image_bombe",
    iconSize: 0.8,
},
{
    match: [["historic", "bomb_crater"]],
    minZoom : 14,
    icon: "bombe"
},
{
    condition: AND(
        ["historic", "city_gate"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    rotation: true,
    minZoom : 14,
    icon: "image_stadttor",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#3388ff",
    fillOpacity: 0
},
{
    // Stadttor
    match: [["historic", "city_gate"]],
    rotation: true,
    minZoom : 14,
    icon: "stadttor",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#3388ff",
    fillOpacity: 0
},
    // Brücke Ruine
{
    condition: AND(
        ["historic", "bridge"],
        OR(["ruins", "yes"], ["disused", "*"], ["abandoned", "*"], ["razed", "*"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 14,
    icon: "image_bridge-broken",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#3388ff",
    fillOpacity: 0
},
{
    condition: AND(
        OR(["historic", "bridge"]),
        OR(["ruins", "yes"], ["disused", "*"], ["abandoned", "*"], ["razed", "*"])
    ),
    minZoom : 14,
    icon: "bridge-broken",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#3388ff",
    fillOpacity: 0
},
    // Brücke
{
    condition: AND(
        ["historic", "bridge"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 14,
    icon: "image_bridge",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#3388ff",
    fillOpacity: 0
},
{
    match: [["historic", "bridge"]],
    minZoom : 14,
    icon: "bridge",
    iconSize: 0.8,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0
},
    // Kanone
{
    condition: AND(
        ["historic", "cannon"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    rotation: true,
    minZoom : 14,
    icon: "image_cannon",
    iconSize: 0.8,
},
{
    match: [["historic", "cannon"]],
    rotation: true,
    minZoom : 14,
    icon: "cannon",
    iconSize: 0.8,
},
    // Museum
{
    condition: AND(
        ["tourism", "museum"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 14,
    icon: "image_museum",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#FF0000",
    fillOpacity: 0,
    zoom: {
        15 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#FF0000",
            fillOpacity: 0.20
        },
    },
},
{
    match: [["tourism", "museum"]],
    minZoom : 14,
    icon: "museum",
    iconSize: 0.5,
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#FF0000",
    fillOpacity: 0,
    zoom: {
        15 : {
            lineWidth: 1,
            lineColor: "#000000",
            fillColor: "#FF0000",
            fillOpacity: 0.20
        },
    },
},
    // Soldatenfriedhof
{
    condition: AND(
        ["cemetery", "war_cemetery"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 14,
    icon: "image_war_cemetery",
    iconSize: 0.8,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0,
},
{
    match: [["cemetery", "war_cemetery"]],
    minZoom : 14,
    icon: "war_cemetery",
    iconSize: 0.8,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0
},
    // Portal
{
    condition: AND(
        ["man_made", "portal"],
        OR(["historic", "*"], ["disused", "*"], ["abandoned", "*"], ["heritage", "*"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 14,
    icon: "image_portal",
    iconSize: 0.8,
},
{
    condition: AND(
        ["man_made", "portal"],
        OR(["historic", "*"], ["disused", "*"], ["abandoned", "*"], ["heritage", "*"])
    ),
    minZoom : 14,
    icon: "portal",
    iconSize: 0.8,
},

// *****************************   Zoom 15   *****************************

    // Denkmal
    //Kreuz
{
    condition: AND(
        ["memorial", "cross"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 15,
    icon: "image_cross",
    iconSize: 0.8,
},
{
    match: [["memorial", "cross"]],
    minZoom : 15,
    icon: "cross",
    iconSize: 1
},
    // Büste
{
    condition: AND(
        ["memorial", "bust"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 15,
    icon: "image_bust",
    iconSize: 0.8,
},
{
    match: [["memorial", "bust"]],
    minZoom : 15,
    icon: "bust",
    iconSize: 0.8
},
    //Gedenkstein
{
    condition: AND(
        ["memorial", "stone"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 15,
    icon: "image_memorial-stone",
    iconSize: 0.8,
},
{
    match: [["memorial", "stone"]],
    minZoom : 15,
    icon: "memorial-stone",
    iconSize: 0.8
},
    // Gedenkstele
{
    condition: AND(
        ["memorial", "stele"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 15,
    icon: "image_memorial-stele",
    iconSize: 0.8,
},
{
    match: [["memorial", "stele"]],
    minZoom : 15,
    icon: "memorial-stele",
    iconSize: 0.8
},
    // Stolperstein
{
    condition: AND(
        OR(["memorial", "stolperstein"], ["memorial", "stolperschwelle"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 15,
    icon: "image_stolperstein",
    iconSize: 0,
    zoom: {
        16 : {
            iconSize: 0.5,
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
    },
},
{
    match: [
        ["memorial", "stolperstein"],
        ["memorial", "stolperschwelle"]
    ],
    minZoom : 15,
    icon: "stolperstein",
    iconSize: 0,
    zoom: {
        16 : {
            iconSize: 0.5,
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
    },
},
    // Statue
{
    condition: AND(
        ["memorial", "statue"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 15,
    icon: "image_statue",
    iconSize: 0.8,
},
{
    match: [["memorial", "statue"]],
    minZoom : 15,
    icon: "statue",
    iconSize: 0.8
},
    // Obelisk
{
    condition: AND(
        ["memorial", "obelisk"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 15,
    icon: "image_obelisk",
    iconSize: 0.5,
},
{
    match: [["memorial", "obelisk"]],
    minZoom : 15,
    icon: "obelisk",
    iconSize: 0.8
},
    // Gedenktafel
{
    condition: AND(
        ["memorial", "plaque"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 15,
    icon: "image_plate",
    iconSize: 0,
    zoom: {
        16 : {
            iconSize: 0.8,
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
    },
},
{
    match: [["memorial", "plaque"]],
    minZoom : 15,
    icon: "plate",
    iconSize: 0,
    zoom: {
        16 : {
            iconSize: 0.8,
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
    },
},
    // blue plaque
{
    condition: AND(
        ["memorial", "blue_plaque"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 15,
    icon: "image_blue_plaque",
    iconSize: 0,
    zoom: {
        16 : {
            iconSize: 0.8,
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
    },
},
{
    match: [["memorial", "blue_plaque"]],
    minZoom : 15,
    icon: "blue_plaque",
    iconSize: 0,
    zoom: {
        16 : {
            iconSize: 0.8,
            lineWidth: 0,
            lineColor: "#000000",
            fillColor: "#669999",
            fillOpacity: 0
        },
    },
},
    // Rathaus
{
    condition: AND(
        ["amenity", "townhall"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 15,
    icon: "image_rathaus",
    minZoom : 15,
    iconSize: 0.8,
    lineWidth: 2,
    lineColor: "#000000",
    fillColor: "#FF0000",
    fillOpacity: 0.20
},
{
    match: [["amenity", "townhall"]],
    icon: "rathaus",
    minZoom : 15,
    iconSize: 0.8,
    lineWidth: 2,
    lineColor: "#000000",
    fillColor: "#FF0000",
    fillOpacity: 0.20
},
    // Denkmal allg.
{
    condition: AND(
        ["historic", "memorial"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 15,
    icon: "image_memorial",
    iconSize: 0.8,
    lineWidth: 0,
    rotation: true,
},
{
    match: [["historic", "memorial"]],
    minZoom : 15,
    icon: "memorial",
    iconSize: 0.8,
    lineWidth: 0,
    rotation: true,
},
    // Monument
{
    condition: AND(
        ["historic", "monument"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 15,
    icon: "image_monument",
    iconSize: 0.8,
    lineWidth: 0,
},
{
    match: [
        ["historic", "monument"]],
        minZoom : 15,
        icon: "monument",
        iconSize: 0.5,
        lineWidth: 0,
},

// *****************************   Zoom 16   *****************************

{
    match: [["historic", "building"]],
    minZoom : 16,
    icon: "house",
    iconSize: 0.8,
    lineWidth: 2,
    lineColor: "#000000",
    fillColor: "#FF0000",
    fillOpacity: 0.20
},
{
    match: [["man_made", "water_well"]],
    minZoom : 16,
    icon: "brunnen",
    iconSize: 0.8
},
{
    match: [["amenity", "fountain"]],
    minZoom : 16,
    icon: "fountain",
    iconSize: 0.8
},
{
    match: [["historic", "highwater_mark"]],
    minZoom : 16,
    icon: "highwater_mark",
    iconSize: 0.8
},
{
    match: [["historic", "exhibit"]],
    minZoom : 16,
    icon: "exhibit",
    iconSize: 0.8
},
{
    // Gefängnis
    condition: AND(
        OR(["amenity", "prison"]),
                   OR(
                       ["historic", "*"],
                      ["disused", "*"],
                      ["abandoned", "*"],
                      ["razed", "*"]
                   )
    ),
    minZoom : 16,
    icon: "prison",
    lineWidth: 0,
    lineColor: "#000000",
    fillColor: "#8b4513",
    fillOpacity: 0
},

// *****************************   Zoom 17   *****************************

{
    match: [["highway", "street_lamp"]],
    minZoom : 17,
    icon: "street_lamp",
    iconSize: 0.8
},
// Umgebinde/Fachwerkhaus
{
    condition: AND(
        OR(["building:architecture", "timber_frame"], ["building:architecture", "umgebinde"]),
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"])
    ),
    minZoom : 17,
    icon: "image_umgebindehaus",
    iconSize: 0.8,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0.25
},
{
    match: [
        ["building:architecture", "timber_frame"],
        ["building:architecture", "umgebinde"]
    ],
    minZoom : 17,
    icon: "umgebindehaus",
    iconSize: 0.8,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0.25
},
{
    // Denkmalschutz Litauen
    condition: AND(
        OR(
            ["heritage", "2"],
           ["heritage", "3"],
           ["heritage", "4"],
           ["heritage", "5"],
           ["heritage", "6"],
           ["heritage", "7"],
           ["heritage", "8"],
           ["heritage", "9"],
           ["heritage", "10"],
           ["heritage", "yes"]
        ),
        OR(["heritage:operator", "kpd"])
    ),
    minZoom : 17,
    icon: "kpd",
    iconSize: 0.8,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0.20
},
{
    // Denkmalschutz Wales
    condition: AND(
        OR(
            ["heritage", "2"],
           ["heritage", "3"],
           ["heritage", "4"],
           ["heritage", "5"],
           ["heritage", "6"],
           ["heritage", "7"],
           ["heritage", "8"],
           ["heritage", "9"],
           ["heritage", "10"],
           ["heritage", "yes"]
        ),
        OR(["heritage:operator", "cadw"])
    ),
    minZoom : 17,
    icon: "cadw",
    iconSize: 0.8,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0.20
},
{
    // Belarus_Heritage
    condition: AND(
        OR(
            ["heritage", "2"],
           ["heritage", "3"],
           ["heritage", "4"],
           ["heritage", "5"],
           ["heritage", "6"],
           ["heritage", "7"],
           ["heritage", "8"],
           ["heritage", "9"],
           ["heritage", "10"],
           ["heritage", "yes"]
        ),
        OR(["heritage:operator", "mcrb"])
    ),
    minZoom : 17,
    icon: "Belarus_Heritage",
    iconSize: 0.8,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0.20
},
{
    // Historic Scotland
    condition: AND(
        OR(
            ["heritage", "2"],
           ["heritage", "3"],
           ["heritage", "4"],
           ["heritage", "5"],
           ["heritage", "6"],
           ["heritage", "7"],
           ["heritage", "8"],
           ["heritage", "9"],
           ["heritage", "10"],
           ["heritage", "yes"]
        ),
        OR(["heritage:operator", "hs"])
    ),
    minZoom : 17,
    icon: "heritage-en",
    iconSize: 0.8,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0.20
},
{
    // Bundesdenkmalamt
    condition: AND(
        OR(
            ["heritage", "2"],
           ["heritage", "3"],
           ["heritage", "4"],
           ["heritage", "5"],
           ["heritage", "6"],
           ["heritage", "7"],
           ["heritage", "8"],
           ["heritage", "9"],
           ["heritage", "10"],
           ["heritage", "yes"]
        ),
        OR(["heritage:operator", "bda"])
    ),
    minZoom : 17,
    icon: "bda",
    iconSize: 0.8,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0.20
},
{
    // Uprava za zaštitu kulturne baštine
    condition: AND(
        OR(
            ["heritage", "2"],
           ["heritage", "3"],
           ["heritage", "4"],
           ["heritage", "5"],
           ["heritage", "6"],
           ["heritage", "7"],
           ["heritage", "8"],
           ["heritage", "9"],
           ["heritage", "10"],
           ["heritage", "yes"]
        ),
        OR(["heritage:operator", "uzkb"])
    ),
    minZoom : 17,
    icon: "uzkb",
    iconSize: 0.8,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0.20
},
{
    // Denkmalschutz Nordrhein-Westfalen
    condition: AND(
        OR(
            ["heritage", "2"],
           ["heritage", "3"],
           ["heritage", "4"],
           ["heritage", "5"],
           ["heritage", "6"],
           ["heritage", "7"],
           ["heritage", "8"],
           ["heritage", "9"],
           ["heritage", "10"],
           ["heritage", "yes"]
        ),
        OR(
            ["heritage:operator", "UntereDenkmalbehörde"],
           ["heritage:operator", "BezirksRegierung"],
           [
               "heritage:operator",
           "Institut für Denkmalschutz und Denkmalpflege Essen"
           ],
           [
               "heritage:operator",
           "Institut für Denkmalschutz und Denkmalpflege Düsseldorf"
           ],
           ["heritage:operator", "IfDuD Essen"],
           ["heritage:operator", "IfDuD Düsseldorf"],
           [
               "heritage:operator",
           "Institut für Denkmalschutz und Denkmalpflege"
           ],
           ["heritage:operator", "UntereDenkmalbehörde Velbert"]
        )
    ),
    minZoom : 17,
    icon: "nrw",
    iconSize: 0.8,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0.20
},
{
    // Národní památkový ústav
    condition: AND(
        OR(
            ["heritage", "2"],
           ["heritage", "3"],
           ["heritage", "4"],
           ["heritage", "5"],
           ["heritage", "6"],
           ["heritage", "7"],
           ["heritage", "8"],
           ["heritage", "9"],
           ["heritage", "10"],
           ["heritage", "yes"]
        ),
        OR(["heritage:operator", "npu"])
    ),
    minZoom : 17,
    icon: "npu",
    iconSize: 1,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0.20
},
{
    // Riksantikvarieämbetets
    condition: AND(
        OR(
            ["heritage", "2"],
           ["heritage", "3"],
           ["heritage", "4"],
           ["heritage", "5"],
           ["heritage", "6"],
           ["heritage", "7"],
           ["heritage", "8"],
           ["heritage", "9"],
           ["heritage", "10"],
           ["heritage", "yes"]
        ),
        OR(["heritage:operator", "raa"])
    ),
    minZoom : 17,
    icon: "raa",
    iconSize: 0.6,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0.20
},
{
    // Narodowy Instytut Dziedzictwa
    condition: AND(
        OR(
            ["heritage", "2"],
           ["heritage", "3"],
           ["heritage", "4"],
           ["heritage", "5"],
           ["heritage", "6"],
           ["heritage", "7"],
           ["heritage", "8"],
           ["heritage", "9"],
           ["heritage", "10"],
           ["heritage", "yes"]
        ),
        OR(["heritage:operator", "nid"])
    ),
    minZoom : 17,
    icon: "nid",
    iconSize: 0.6,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0.20
},
{
    // Monuments historiques et sites
    condition: AND(
        OR(
            ["heritage", "2"],
           ["heritage", "3"],
           ["heritage", "4"],
           ["heritage", "5"],
           ["heritage", "6"],
           ["heritage", "7"],
           ["heritage", "8"],
           ["heritage", "9"],
           ["heritage", "10"],
           ["heritage", "yes"]
        ),
        OR(["heritage:operator", "mhs"])
    ),
    minZoom : 17,
    icon: "mhs",
    iconSize: 0.6,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0.20
},
{
    // English Heritage
    condition: AND(
        OR(
            ["heritage", "2"],
           ["heritage", "3"],
           ["heritage", "4"],
           ["heritage", "5"],
           ["heritage", "6"],
           ["heritage", "7"],
           ["heritage", "8"],
           ["heritage", "9"],
           ["heritage", "10"],
           ["heritage", "yes"]
        ),
        OR(
            ["heritage:operator", "eh"],
           ["heritage:operator", "English Heritage"],
           ["heritage:operator", "English_Heritage"]
        )
    ),
    minZoom : 17,
    icon: "heritage-en",
    iconSize: 0.6,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0.20
},
{
    // Historic England
    condition: AND(
        OR(
            ["heritage", "2"],
            ["heritage", "3"],
            ["heritage", "4"],
            ["heritage", "5"],
            ["heritage", "6"],
            ["heritage", "7"],
            ["heritage", "8"],
            ["heritage", "9"],
            ["heritage", "10"],
            ["heritage", "yes"]
        ),
        OR(
            ["heritage:operator", "he"],
            ["heritage:operator", "Historic England"]
        )
    ),
    minZoom : 17,
    icon: "he",
    iconSize: 0.6,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0.20
},
{
    // Denkmalschutz
    match: [
        ["heritage", "2"],
        ["heritage", "3"],
        ["heritage", "4"],
        ["heritage", "5"],
        ["heritage", "6"],
        ["heritage", "7"],
        ["heritage", "8"],
        ["heritage", "9"],
        ["heritage", "10"],
        ["heritage", "yes"]
    ],
    minZoom : 17,
    icon: "heritage",
    iconSize: 0.6,
    lineWidth: 1,
    lineColor: "#000000",
    fillColor: "#FEFC00",
    fillOpacity: 0.25
},

// *****************************   Zoom 6   *****************************

    // Weltkulturerbe
{
    condition: AND(
        ["heritage", "1"],
        OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"]),
        OR(
            ["leisure", "garden"],
            ["leisure", "park"],
            ["region:type", "mountain_area"],
            ["leisure", "nature_reserve"]
                   )
    ),
    minZoom : 6,
    icon: "image_wke",
    iconSize: 1,
    lineColor: "#008b00",
    fillColor: "#000000",
    fillOpacity: 0,
    membersIconSize :   0,
},
{
    condition: AND(
        OR(["heritage", "1"]),
        OR(
            ["leisure", "garden"],
            ["leisure", "park"],
            ["region:type", "mountain_area"],
            ["leisure", "nature_reserve"]
                   )
    ),
    minZoom : 6,
    icon: "wke",
    iconSize: 1,
    lineColor: "#008b00",
    fillColor: "#000000",
    fillOpacity: 0,
    membersIconSize :   0,
},
{
    condition: AND(["heritage", "1"], 
                    OR(["image", "*"], ["wikipedia", "*"], ["wikidata", "*"], ["website", "*"], ["wikimedia_commons", "*"]),
    ),
    minZoom : 6,
    icon: "image_wke",
    iconSize: 1,
    lineColor: "#FFDE21",
    fillColor: "#000000",
    fillOpacity: 0,
    membersIconSize :   0,
},
{
    match: [["heritage", "1"]],
    minZoom : 6,
    icon: "wke",
    iconSize: 1,
    lineColor: "#FFDE21",
    fillColor: "#000000",
    fillOpacity: 0,
    membersIconSize :   0,
},
];
