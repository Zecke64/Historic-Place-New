export const zoomClassDefaults = {
    lifecycle: true,
    requiredTags: []
};

export const zoomClasses = [
    {
    // ***************************   Zoom 06   ******************************
        id: "z06_10",
        minZoom: 6,
        maxZoom: 10,
        groups: [{
            id: "gr_wke",
            objectTypes: [
                ["heritage", "1"],
            ],
        }]
    },
{
    // ***************************   Zoom 10   ******************************
    id: "z10",
    minZoom: 10,
    groups: [
        {
            id: "gr_monastery",
            objectTypes: [
                ["building", "monastery"],
                ["amenity", "monastery"],
                ["historic", "monastery"],
                ["historic", "abbey"],
            ],
        },
        {
            id: "gr_schloss",
            objectTypes: [
                ["castle_type", "stately"],
            ],
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
            id: "gr_prison_camp",
            objectTypes: [
                ["amenity", "prison_camp"],
            ],
        },
        {
            id: "gr_10a",
            objectTypes: [
                ["abandoned:place", "village"],
                ["abandoned:place", "hamlet"],
                ["abandoned", "village"],
                
            ],
        },
        {
            id: "gr_10b",
            objectTypes: [
                ["abandoned", "village"],
            ],
        },
        {
            id: "gr_10c",
            objectTypes: [
                ["historic:place", "foresters_house"],
                ["geological", "palaeontological_site"],
                ["historic", "citywalls"],
                ["barrier", "city_wall"],
                ["wall", "castle_wall"],
                
            ],
        }
    ]
},
{
    // ***************************   Zoom 11   ******************************
    id: "z11",
    minZoom: 11,
    groups: [
        {
            id: "gr_11a",
            objectTypes: [
                ["man_made", "watermill"],
                ["man_made", "windmill"],
                ["historic", "archaeological_site"],
                ["historic", "battlefield"],
                ["natural", "stone"],
                ["man_made", "lighthouse"],
                ["historic", "ship"],
                ["historic", "wreck"],
            ],
        },
        {
            id: "gr_11c",
            objectTypes: [
                ["leisure", "garden"],
                ["leisure", "park"],
            ],
        },
        {
            id: "gr_11b",
            objectTypes: [
                ["protect_class", "22"],
            ],
        }
    ]
},
{
    // ***************************   Zoom 12   ******************************
    id: "z12",
    minZoom: 12,
    groups: [
        {
            id: "gr_12a",
            objectTypes: [
                ["man_made", "mine"],
                ["man_made", "mineshaft"],
                ["man_made", "drill_hole"],
                ["landuse", "landfill"],
                ["landuse", "quarry"],
            ],
            requiredTags: [
                "historic",
                "disused",
                "abandoned",
                "razed",
            ],
        },
        {
            id: "gr_12b",
            objectTypes: [
                ["man_made", "spoil_heap"],
            ],
            requiredTags: [
                "abandoned",
                "razed",
            ],
        },
        {
            id: "gr_12c",
            objectTypes: [
                ["natural", "sinkhole"],
            ],
            requiredTags: ["historic", "mine"]
        },
        {
            id: "gr_12d",
            objectTypes: [
                ["man_made", "cellar_entrance"],
                ["denotation", "natural_monument"],
                ["historic", "mine"],
                ["man_made", "adit"],
                ["historic", "farm"],
                ["historic", "gallows"],
                ["historic", "quarry "],
            ],
        }
    ]
},
{
    // ***************************   Zoom 13   ******************************
    id: "z13",
    minZoom: 13,
    groups: [
        {
            id: "gr_13a",
            objectTypes: [
                ["military", "bunker"],
                ["building", "bunker"],
                ["historic", "bunker"],
                ["building", "tower"],
                ["building", "water_tower"],
                ["building", "transformer_tower"],
                ["historic", "locomotive"],
                ["historic", "aircraft"],
                ["man_made", "water_tower"],
                ["man_made", "tower"],
                ["man_made", "surveypoint"],
                ["historic", "industrial"],
            ],
            requiredTags: [
                "historic",
                "abandoned",
                "heritage",
            ],
        },
        {
            id: "gr_13b",
            objectTypes: [
                ["historic", "wayside_shrine"],
                ["historic", "tree_shrine"],
                ["historic", "wayside_cross"],
                ["historic", "wayside_chapel"],
                ["historic", "stone"],
                ["historic", "boundary_stone"],
                ["historic", "milestone"],
                ["historic", "rune_stone"],
                ["man_made", "cross"],
                ["historic", "threshing_floor"],
            ],
        },
    ]
},
{
    // ***************************   Zoom 14   ******************************
    id: "z14",
    minZoom: 14,
    groups: [
        {
            id: "gr_14a",
            objectTypes: [
                ["historic", "bomb_crater"],
                ["historic", "bridge"],
                ["historic", "cannon"],
                ["historic", "city_gate"],
                ["historic", "tomb"],
                ["cemetery", "war_cemetery"],
                ["man_made", "portal"],
                ["tourism", "museum"],
            ],
        },
        {
            id: "gr_14b",
            objectTypes: [
                ["amenity", "place_of_worship"],
                ["historic", "church"],
                ["historic", "chapel"],
                ["building", "church"],
                ["building", "chapel"],
            ],
            requiredTags: [
                "historic",
                "abandoned",
                "heritage",
                "disused",
                "abandoned",
                "razed",
                "wikipedia",
                "wikidata",
            ],
        }
    ]
},
{
    // ***************************   Zoom 15   ******************************
    id: "z15",
    minZoom: 15,
    groups: [
        {
            id: "gr_15a",
            objectTypes: [
                ["historic", "memorial"],
                ["historic", "monument"],
                ["amenity", "townhall"],
            ],
        },
    ]
},
{
    // ***************************   Zoom 16   ******************************
    id: "z16",
    minZoom: 16,
    groups: [
        {
            id: "gr_16a",
            objectTypes: [
                ["amenity", "prison"],
            ],
            requiredTags: [
                "historic",
                "abandoned",
                "heritage",
                "disused",
                "abandoned",
                "razed",
                "wikipedia",
                "wikidata",
            ],
        },
        {
            id: "gr_16b",
            objectTypes: [
                ["historic", "exhibit"],
                ["historic", "highwater_mark"],
                ["historic", "building"],
            ],
        },
        {
            id: "gr_16c",
            objectTypes: [
                ["amenity", "fountain"],
                ["man_made", "water_well"],
            ],
            requiredTags: [
                "historic",
                "heritage",
            ],
        },
    ]
},
{
    // ***************************   Zoom 17   ******************************
    id: "z17",
    minZoom: 17,
    groups: [
        {
            id: "gr_17a",
            objectTypes: [
                ["building:architecture", "timber_frame"],
                ["building:architecture", "umgebinde"],
            ],
            requiredTags: [
                "building",
            ],
        },
        {
            id: "gr_17b",
            objectTypes: [
                ["highway", "street_lamp"],
            ],
            requiredTags: [
                "historic",
                "heritage",
            ],
        },
        {
            id: "gr_17c",
            objectTypes: [
                ["heritage", "2"],
                ["heritage", "3"],
                ["heritage", "4"],
                ["heritage", "5"],
                ["heritage", "6"],
                ["heritage", "7"],
                ["heritage", "8"],
                ["heritage", "9"],
                ["heritage", "10"],
                ["heritage", "yes"],
            ],
        },
    ]
},
];
