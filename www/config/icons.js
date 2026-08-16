/*

Hier stehen die Regeln zur Bestimmung des Icons.
Sie sind unabhängig von den Regeln für Zoomstufen.
Spezifischere Regeln sollten nach allgemeineren Regeln kommen:

	historic=castle --> Icon castle
	historic=castle + castle_type=manor --> Icon: manor

*/

export function AND(...conditions)
{
    return {
        type: "AND",
        conditions
    };
}

export function OR(...conditions)
{
    return {
        type: "OR",
        conditions
    };
}

export const iconRules = [

    // Zoom 6
    {
        match: [
            ["heritage", "1"]
        ],
        icon: "wke"
    },

    // *****************************   Zoom 11   *****************************
    {
        match: [
            ["building", "monastery"],
	    ["amenity", "monastery"],
	    ["historic", "monastery"],
            ["historic", "abbey"],
        ],
        icon: "monastery"
    },

    {
        match: [
            ["historic", "castle"],
	    ["historic", "fort"],
            ["historic", "palace"],
        ],
        icon: "castle"
    },

    {
        match: [
            ["historic", "manor"],
            ["castle_type", "manor"],
        ],
        icon: "manor"
    },

    {
        condition: 
	    AND(
	        OR( ["amenity", "prison"], ["amenity", "prison_camp"] ),
	        OR(
		    ["historic", "*"],
                    ["disused", "*"],
                    ["abandoned", "*"],
                    ["razed", "*"]
		)
	    ),
        icon: "prison"
    },

    // *****************************   Zoom 12   *****************************
    {
        match: [
            ["man_made", "windmill"]
        ],
        icon: "windmill"
    },

    {
        match: [
            ["man_made", "watermill"]
        ],
        icon: "watermill"
    },

    {
        match: [
            ["historic", "archaeological_site"]
        ],
        icon: "archaeologie"
    },

    {
        match: [
            ["megalith_type", "menhir"]
        ],
        icon: "menhir"
    },

    {
        match: [
            ["megalith_type", "dolmen"]
        ],
        icon: "dolmen"
    },

    {
        match: [
            ["megalith_type", "passage_grave"]
        ],
        icon: "passage_grave"
    },

    {
        match: [
            ["megalith_type", "stone_circle"]
        ],
        icon: "stone_circle"
    },

    {
        match: [
            ["megalith_type", "nuraghe"]
        ],
        icon: "nuraghe"
    },

    {
        match: [
            ["megalith_type", "stone_ship"]
        ],
        icon: "stone_ship"
    },

    {
        match: [
            ["archaeological_site", "tumulus"]
        ],
        icon: "tumulus"
    },

    {
        match: [
            ["archaeological_site", "petroglyph"]
        ],
        icon: "petroglyph"
    },

    {
        match: [
            ["archaeological_site", "city"]
        ],
        icon: "archaeological_city"
    },

    {
        match: [
            ["archaeological_site", "fortification"],
            ["historic", "pa"]
        ],
        icon: "fortification"
    },

    {
        condition: 
	    AND(
	        OR( 
		    ["place", "village"], 
		    ["place", "hamlet"] 
		),
	        OR(
                    ["abandoned", "*"],
                    ["razed", "*"]
		)
	    ),
        icon: "wuestung"
    },

    {
        match: [
            ["historic", "battlefield"]
        ],
        icon: "battlefield"
    },

    {
        match: [
            ["historic", "industrial"]
        ],
        icon: "industrial"
    },


    // *****************************   Zoom 13   *****************************
    {
	// Schacht oder Bergwerk
        condition:
            AND(
                OR(
                    ["man_made", "mine"],
                    ["man_made", "mineshaft"],
                ),
                OR(
                    ["historic", "*"],
                    ["disused", "*"],
                    ["abandoned", "*"],
                    ["razed", "*"]
                )
            ),
        icon: "mine"
    },

    {
	// Bergbaustollen
        condition:
            AND(
                AND(
                    ["man_made", "adit"],
		    ["resource", "*"]
                ),
                OR(
                    ["historic", "*"],
                    ["disused", "*"],
                    ["abandoned", "*"],
                    ["razed", "*"]
                )
            ),
        icon: "stollen"
    },

    {
	// Stollen allgemein
        condition:
            AND(
                ["man_made", "adit"],
                OR(
                    ["historic", "*"],
                    ["disused", "*"],
                    ["abandoned", "*"],
                    ["razed", "*"]
                )
            ),
        icon: "stollen2"
    },

    {
	// Felsenkeller
        match: [
            ["man_made", "cellar_entrance"]
        ],
        icon: "cellar"
    },

    {
	// Bohrloch
        condition:
            AND(
                ["man_made", "drill_hole"],
                OR(
                    ["historic", "*"],
                    ["disused", "*"],
                    ["abandoned", "*"],
                    ["razed", "*"]
                )
            ),
        icon: "bohrung"
    },

    {
	// Pinge
        condition:
            AND(
                ["natural", "sink_hole"],
		["historic", "mine"]
            ),
        icon: "pinge"
    },

    {
        // Bergehalde
        condition:
            AND(
                OR(
                    ["landuse", "landfill"],
                    ["man_made", "spoil_heap"],
                ),
                OR(
                    ["historic", "*"],
                    ["disused", "*"],
                    ["abandoned", "*"],
                    ["razed", "*"]
                )
            ),
        icon: "halde"
    },

    {
        // Naturdenkmal (Baum)
        condition:
            AND(
                ["natural", "tree"],
		["denotation", "natural_monument"]
            ),
        icon: "tree"
    },

    {
        // Monument
        match: [
            ["historic", "memorial"]
        ],
        icon: "monument"
    },











];
