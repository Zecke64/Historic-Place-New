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

    // *****************************   Zoom 6   *****************************
    { match : [ [ "heritage", "1" ] ], 
                minZoom : 6,
                icon : "wke",
                lineWidth : 3,
                fillOpacity : 0.2
    },

    // *****************************   Zoom 11   *****************************
    {
        match : [
            [ "building", "monastery" ],
            [ "amenity", "monastery" ],
            [ "historic", "monastery" ],
            [ "historic", "abbey" ],
        ],
        minZoom : 11,
        icon : "monastery"
    },

    {
        match : [
            [ "historic", "castle" ],
            [ "historic", "fort" ],
            [ "historic", "palace" ],
        ],
        minZoom : 11,
        icon : "castle",
        iconSize : 2,

        zoom : {
            14 : {
                iconSize : 1.5,
                lineWidth : 4,
                fillOpacity : 0.35
            },

            16 : {
                icon: "manor",
                iconSize : 1.5,
                lineWidth : 2,
                fillOpacity : 0.2
            }
        }
    },

    {
        match : [
            [ "historic", "manor" ],
            [ "castle_type", "manor" ],
        ],
        minZoom : 11,
        icon : "manor"
    },

    {
        condition : AND(
            OR([ "amenity", "prison" ], [ "amenity", "prison_camp" ]),
            OR([ "historic", "*" ], [ "disused", "*" ], [ "abandoned", "*" ], [ "razed", "*" ])),
        minZoom : 11,
        icon : "prison"
    },

    // *****************************   Zoom 12   *****************************

    { 
        match : [ [ "man_made", "windmill" ] ], 
        minZoom : 12, 
        icon : "windmill" 
    },
    { 
        match : [ [ "man_made", "watermill" ] ],
        minZoom : 12,
        icon : "watermill" 
    },
    { 
        match : [ [ "historic", "archaeological_site" ] ],    
        minZoom : 12, 
        icon : "archaeologie" 
    },
    {
        match : [ [ "megalith_type", "menhir" ] ],            
        minZoom : 12, 
        icon : "menhir" 
    },
    { 
        match : [ [ "megalith_type", "dolmen" ] ],            
        minZoom : 12, 
        icon : "dolmen" 
    },
    { 
        match : [ [ "megalith_type", "passage_grave" ] ],     
        minZoom : 12, 
        icon : "passage_grave" 
    },
    {
        match : [ [ "megalith_type", "stone_circle" ] ],      
        minZoom : 12, 
        icon : "stone_circle" 
    },
    { 
        match : [ [ "megalith_type", "nuraghe" ] ],           
        minZoom : 12, 
        icon : "nuraghe" 
    },
    { 
        match : [ [ "megalith_type", "stone_ship" ] ],        
        minZoom : 12, 
        icon : "stone_ship" 
    },
    { 
        match : [ [ "archaeological_site", "tumulus" ] ],     
        minZoom : 12, 
        icon : "tumulus" 
    },
    { 
        match : [ [ "archaeological_site", "petroglyph" ] ],  
        minZoom : 12, 
        icon : "petroglyph" 
    },
    { 
        match : [ [ "archaeological_site", "city" ] ],        
        minZoom : 12, 
        icon : "archaeological_city" 
    },
    {
        match : [ [ "archaeological_site", "fortification" ], [ "historic", "pa" ] ],
        minZoom : 12, 
        icon : "fortification"
    },
    {
        condition : AND(OR([ "place", "village" ], [ "place", "hamlet" ]),
                        OR([ "abandoned", "*" ], [ "razed", "*" ])),
        minZoom : 12, 
        icon : "wuestung"
    },
    { 
        match : [ [ "historic", "battlefield" ] ],            
        minZoom : 12, 
        icon : "battlefield" 
    },
    { 
        match : [ [ "historic", "industrial" ] ],             
        minZoom : 12, 
        icon : "industrial" 
    },

    // *****************************   Zoom 13   *****************************
    {
        // Schacht oder Bergwerk
        condition : AND(
            OR(
                [ "man_made", "mine" ],
                [ "man_made", "mineshaft" ],
                ),
            OR([ "historic", "*" ], [ "disused", "*" ], [ "abandoned", "*" ], [ "razed", "*" ])),
        minZoom : 13,
        icon : "mine",
        fillColor : "#00FF00",
        lineColor : "#0000FF",
        membersLine : true,
        membersIconSize : 0
    },
    
    {
        // Bergbaustollen
        condition : AND(
            AND([ "man_made", "adit" ], [ "resource", "*" ]),
            OR([ "historic", "*" ], [ "disused", "*" ], [ "abandoned", "*" ], [ "razed", "*" ])),
        minZoom : 13, 
        icon : "stollen",
        rotation : true
    },

    {
        // Stollen allgemein
        condition : AND([ "man_made", "adit" ], OR([ "historic", "*" ], [ "disused", "*" ],
                                                   [ "abandoned", "*" ], [ "razed", "*" ])),
        minZoom : 13, 
        icon : "stollen2",
        rotation : true
    },

    {
        // Felsenkeller
        match : [ [ "man_made", "cellar_entrance" ] ],
        minZoom : 13, 
        icon : "cellar"
    },

    {
        // Bohrloch
        condition : AND([ "man_made", "drill_hole" ], OR([ "historic", "*" ], [ "disused", "*" ],
                                                         [ "abandoned", "*" ], [ "razed", "*" ])),
        minZoom : 13, 
        icon : "bohrung"
    },

    {
        // Pinge
        condition : AND([ "natural", "sink_hole" ], [ "historic", "mine" ]),
        minZoom : 13, 
        icon : "pinge"
    },

    {
        // Bergehalde
        condition : AND(
            OR(
                [ "landuse", "landfill" ],
                [ "man_made", "spoil_heap" ],
                ),
            OR([ "historic", "*" ], [ "disused", "*" ], [ "abandoned", "*" ], [ "razed", "*" ])),
        minZoom : 13, 
        icon : "halde"
    },

    {
        // Naturdenkmal (Baum)
        condition : AND([ "natural", "tree" ], [ "denotation", "natural_monument" ]),
        minZoom : 13, 
        icon : "tree"
    },

    {
        // Monument
        match : [ [ "historic", "monument" ] ],
        minZoom : 13, 
        icon : "monument"
    },

    // *****************************   Zoom 14   *****************************
    {
        // Turm
        condition : AND(
            OR(
                [ "historic", "tower" ],
                [ "building", "tower" ],
                ),
            OR([ "historic", "*" ], [ "disused", "*" ], [ "abandoned", "*" ], [ "razed", "*" ])),
        minZoom : 14, 
        icon : "turm"
    },

    {
        // Bunker
        condition : AND(
            OR(
                [ "military", "bunker" ],
                [ "historic", "bunker" ],
                ),
            OR([ "historic", "*" ], [ "disused", "*" ], [ "abandoned", "*" ], [ "razed", "*" ])),
        minZoom : 14, 
        icon : "bunker"
    },

    {
        // Schiff
        match : [ [ "historic", "ship" ] ],
        minZoom : 14, 
        icon : "ship"
    },

    {
        // Wrack
        match : [ [ "historic", "wreck" ] ],
        minZoom : 14, 
        icon : "wreck"
    },

    {
        // Lokomotive
        match : [ [ "historic", "locomotive" ] ],
        minZoom : 14, 
        icon : "locomotive"
    },

    {
        // Flugzeug
        match : [ [ "historic", "aircraft" ] ],
        minZoom : 14, 
        icon : "aircraft"
    },

    {
        // Leuchtturm
        match : [ [ "man_made", "lighthouse" ] ],
        minZoom : 14, 
        icon : "lighthouse"
    },

    {
        // Vermessungspunkt
        match : [ [ "man_made", "survey_point" ] ],
        minZoom : 14, 
        icon : "trigpoint"
    },

    // *****************************   Zoom 15   *****************************

    {
        // Kirche
        condition : AND(
            OR(
                [ "historic", "church" ],
                [ "building", "church" ],
                ),
            OR([ "historic", "*" ], 
                [ "disused", "*" ], 
                [ "abandoned", "*" ], 
                [ "razed", "*" ],
                [ "wikipedia", "*" ],
                [ "wikidata", "*" ]
            )
        ),
        minZoom : 15, 
        icon : "church",
        lineWidth : 3,
        lineColor : "#B22222",
        fillColor : "#B22222",
        fillOpacity : 0.75
    },

    {
        // Kapelle
        condition : AND(
            OR(
                [ "historic", "chapel" ],
                [ "building", "chapel" ],
                ),
            OR([ "historic", "*" ], [ "disused", "*" ], [ "abandoned", "*" ], [ "razed", "*" ])),
        minZoom : 15, 
        icon : "chapel"
    },

    {
        // Wegkreuz
        condition : OR(
            [ "historic", "wayside_shrine" ],
            [ "historic", "tree_shrine" ],
            [ "historic", "wayside_cross" ],
            ),
        minZoom : 15, 
        icon : "cross"
    },

    {
        // Religiöse Stätte
        condition : AND(
                        [ "amenity", "place_of_worship" ], 
                        OR(
                            [ "historic", "*" ],
                            [ "disused", "*" ],
                            [ "abandoned", "*" ],
                            [ "razed", "*" ],
                            [ "wikipedia", "*" ],
                            [ "wikidata", "*" ]
                            )
                        ),
        minZoom : 15, 
        icon : "worship"
    },

    {
        // Grab
        match : [ [ "historic", "tomb" ] ],
        minZoom : 15, 
        icon : "tomb"
    },

    {
        // Bombenkrater
        match : [ [ "historic", "bomb_crater" ] ],
        minZoom : 15, 
        icon : "bombe"
    },

    {
        // Kirche
        match : [ [ "historic", "bridge" ] ],
        minZoom : 15, 
        icon : "bridge"
    },

    {
        // Denkmal
        match : [ [ "historic", "memorial" ] ],
        minZoom : 15, 
        icon : "memorial"
    },

    {
        // Kanone
        match : [ [ "historic", "cannon" ] ],
        minZoom : 15, 
        icon : "cannon"
    },

    {
        // Soldatenfriedhof
        match : [ [ "cemetery", "war_cemetery" ] ],
        minZoom : 15, 
        icon : "war_cemetery"
    },

    {
        // Portal
        condition : AND([ "man_made", "portal" ], OR(
                                                      [ "historic", "*" ],
                                                      [ "disused", "*" ],
                                                      [ "abandoned", "*" ],
                                                      )),
        minZoom : 15, 
        icon : "portal"
    },

];
