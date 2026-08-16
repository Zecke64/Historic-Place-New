export const zoomClassDefaults =
{
    lifecycle: true,
    requiredTags: []
};



export const zoomClasses = [
    {
	id: "z06_10",
	minZoom: 6,

	groups: [
	    {
		id: "gr_wke",
		objectTypes: [
		    ["heritage", "1"],
		]
	    }
	]
    },

    {
	id: "z11",
	minZoom: 11,

	groups: [
	    {
		id: "gr_monastery",
		objectTypes: [
		    ["building", "monastery"],
		    ["amenity", "monastery"],
		    ["historic", "monastery"],
		    ["historic", "abbey"],
		],
		requiredTags: [ "building" ]
	    },
	    {
		id: "gr_castle",
		objectTypes: [
		    ["historic", "castle"],
		    ["historic", "fort"],
		    ["historic", "palace"],
		],
	    },
	    {
		id: "gr_manor",
		objectTypes: [
		    ["historic", "manor"],
		    ["castle_type", "manor"],
		],
	    },
	    {
		id: "gr_prison",
		objectTypes: [
		    ["amenity", "prison"],
		    ["amenity", "prison_camp"],
		],
	    },
	]
    
    },

    {
        id: "z12",
        minZoom: 12,

        groups: [
            {
                id: "gr_12a",
                objectTypes: [
                    ["man_made", "watermill"],
                    ["man_made", "windmill"],
		    ["historic", "archeological_site"],
		    ["abandoned", "village"],
		    ["historic", "battlefield"],
		    ["historic", "industrial"],
                ],
	    },

	    {
                id: "gr_12b",
                objectTypes: [
		    ["place", "village"],
		    ["place", "hamlet"],
                ],
                requiredTags: [
                    "abandoned",
                    "razed",
                ]
            }
        ]
    },

  {
        id: "z13",
        minZoom: 13,

        groups: [
            {
                id: "gr_13a",
                objectTypes: [
                    ["man_made", "mine"],
                    ["man_made", "mineshaft"],
                    ["man_made", "adit"],
                    ["man_made", "drill_hole"],
                    ["landuse", "landfill"],
                ],
                requiredTags: [
		    "historic",
		    "disused",
                    "abandoned",
                    "razed",
                ]
            },

            {
                id: "gr_13b",
                objectTypes: [
                    ["man_made", "spoil_heap"],
                ],
                requiredTags: [
                    "abandoned",
                    "razed",
                ]
            },

            {
                id: "gr_13c",
                objectTypes: [
                    ["natural", "sinkhole"],
                ],
                requiredTags: [
                    ["historic", "mine"]
                ]
            },

            {
                id: "gr_13d",
                objectTypes: [
                    ["man_made", "cellar_entrance"],
                    ["denotation", "natural_monument"],
                    ["historic", "mine"],
                    ["historic", "monument"],
                ],
            },
        ]
    },

];

