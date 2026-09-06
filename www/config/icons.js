/*

Hier stehen die Regeln zur Bestimmung des Icons.
Sie sind unabhängig von den Regeln für Zoomstufen.
Spezifischere Regeln sollten VOR allgemeineren Regeln kommen:

    historic=castle + castle_type=manor --> Icon: manor
    historic=castle --> Icon castle

*/

export function AND(...conditions) { return {type : "AND", conditions}; }

export function OR(...conditions) { return {type : "OR", conditions}; }

// Das hier sind die default Style Werte für Icons, Lines und Areas
export const defaultStyle = {
    icon :          "null",
    iconSize :      0.8,
    rotation:       false,
    lineWidth :     3,
    lineColor :     "#3388ff",
    fillColor :     "#3388ff",
    fillOpacity :   0.25
};

export const iconRules = [

    // *****************************   Zoom 6   *****************************
    { match : [ [ "heritage", "1" ] ], icon : "wke" },

    // *****************************   Zoom 11   *****************************
    {
        match : [
            [ "building", "monastery" ],
            [ "amenity", "monastery" ],
            [ "historic", "monastery" ],
            [ "historic", "abbey" ],
        ],
        icon : "monastery"
    },

    {
        match : [
            [ "historic", "castle" ],
            [ "historic", "fort" ],
            [ "historic", "palace" ],
        ],
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
        icon : "manor"
    },

    {
        condition : AND(
            OR([ "amenity", "prison" ], [ "amenity", "prison_camp" ]),
            OR([ "historic", "*" ], [ "disused", "*" ], [ "abandoned", "*" ], [ "razed", "*" ])),
        icon : "prison"
    },

    // *****************************   Zoom 12   *****************************

    { match : [ [ "man_made", "windmill" ] ],               icon : "windmill" },
    { match : [ [ "man_made", "watermill" ] ],              icon : "watermill" },
    { match : [ [ "historic", "archaeological_site" ] ],    icon : "archaeologie" },
    { match : [ [ "megalith_type", "menhir" ] ],            icon : "menhir" },
    { match : [ [ "megalith_type", "dolmen" ] ],            icon : "dolmen" },
    { match : [ [ "megalith_type", "passage_grave" ] ],     icon : "passage_grave" },
    { match : [ [ "megalith_type", "stone_circle" ] ],      icon : "stone_circle" },
    { match : [ [ "megalith_type", "nuraghe" ] ],           icon : "nuraghe" },
    { match : [ [ "megalith_type", "stone_ship" ] ],        icon : "stone_ship" },
    { match : [ [ "archaeological_site", "tumulus" ] ],     icon : "tumulus" },
    { match : [ [ "archaeological_site", "petroglyph" ] ],  icon : "petroglyph" },
    { match : [ [ "archaeological_site", "city" ] ],        icon : "archaeological_city" },
    {
        match : [ [ "archaeological_site", "fortification" ], [ "historic", "pa" ] ],
        icon : "fortification"
    },
    {
        condition : AND(OR([ "place", "village" ], [ "place", "hamlet" ]),
                        OR([ "abandoned", "*" ], [ "razed", "*" ])),
        icon : "wuestung"
    },
    { match : [ [ "historic", "battlefield" ] ],            icon : "battlefield" },
    { match : [ [ "historic", "industrial" ] ],             icon : "industrial" },

    // *****************************   Zoom 13   *****************************
    {
        // Schacht oder Bergwerk
        condition : AND(
            OR(
                [ "man_made", "mine" ],
                [ "man_made", "mineshaft" ],
                ),
            OR([ "historic", "*" ], [ "disused", "*" ], [ "abandoned", "*" ], [ "razed", "*" ])),
        icon : "mine",
        fillColor : "#FF0000",
        lineColor : "#FF0000"
    },
    {
        // Schacht oder Bergwerk - relation member
        condition : AND(
            OR(
                [ "man_made", "mine" ],
                [ "man_made", "mineshaft" ],
                ),
            OR([ "historic", "*" ], [ "disused", "*" ], [ "abandoned", "*" ], [ "razed", "*" ]),
            [ "_site_member", "*" ]),
        icon : "null",
        fillColor : "#FF0000",
        lineColor : "#FF0000"
    },

    {
        // Bergbaustollen
        condition : AND(
            AND([ "man_made", "adit" ], [ "resource", "*" ]),
            OR([ "historic", "*" ], [ "disused", "*" ], [ "abandoned", "*" ], [ "razed", "*" ])),
        icon : "stollen",
        rotation : true
    },

    {
        // Stollen allgemein
        condition : AND([ "man_made", "adit" ], OR([ "historic", "*" ], [ "disused", "*" ],
                                                   [ "abandoned", "*" ], [ "razed", "*" ])),
        icon : "stollen2",
        rotation : true
    },

    {
        // Felsenkeller
        match : [ [ "man_made", "cellar_entrance" ] ],
        icon : "cellar"
    },

    {
        // Bohrloch
        condition : AND([ "man_made", "drill_hole" ], OR([ "historic", "*" ], [ "disused", "*" ],
                                                         [ "abandoned", "*" ], [ "razed", "*" ])),
        icon : "bohrung"
    },

    {
        // Pinge
        condition : AND([ "natural", "sink_hole" ], [ "historic", "mine" ]),
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
        icon : "halde"
    },

    {
        // Naturdenkmal (Baum)
        condition : AND([ "natural", "tree" ], [ "denotation", "natural_monument" ]),
        icon : "tree"
    },

    {
        // Monument
        match : [ [ "historic", "monument" ] ],
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
        icon : "bunker"
    },

    {
        // Schiff
        match : [ [ "historic", "ship" ] ],
        icon : "ship"
    },

    {
        // Wrack
        match : [ [ "historic", "wreck" ] ],
        icon : "wreck"
    },

    {
        // Lokomotive
        match : [ [ "historic", "locomotive" ] ],
        icon : "locomotive"
    },

    {
        // Flugzeug
        match : [ [ "historic", "aircraft" ] ],
        icon : "aircraft"
    },

    {
        // Leuchtturm
        match : [ [ "man_made", "lighthouse" ] ],
        icon : "lighthouse"
    },

    {
        // Vermessungspunkt
        match : [ [ "man_made", "survey_point" ] ],
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
        icon : "church",
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
        icon : "chapel"
    },

    {
        // Wegkreuz
        condition : OR(
            [ "historic", "wayside_shrine" ],
            [ "historic", "tree_shrine" ],
            [ "historic", "wayside_cross" ],
            ),
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
        icon : "worship"
    },

    {
        // Grab
        match : [ [ "historic", "tomb" ] ],
        icon : "tomb"
    },

    {
        // Bombenkrater
        match : [ [ "historic", "bomb_crater" ] ],
        icon : "bombe"
    },

    {
        // Kirche
        match : [ [ "historic", "bridge" ] ],
        icon : "bridge"
    },

    {
        // Denkmal
        match : [ [ "historic", "memorial" ] ],
        icon : "memorial"
    },

    {
        // Kanone
        match : [ [ "historic", "cannon" ] ],
        icon : "cannon"
    },

    {
        // Soldatenfriedhof
        match : [ [ "cemetery", "war_cemetery" ] ],
        icon : "war_cemetery"
    },

    {
        // Portal
        condition : AND([ "man_made", "portal" ], OR(
                                                      [ "historic", "*" ],
                                                      [ "disused", "*" ],
                                                      [ "abandoned", "*" ],
                                                      )),
        icon : "portal"
    },

];
