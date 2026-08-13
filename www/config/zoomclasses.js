export const zoomClasses = [
    {
        id: "z12_13",
        minZoom: 12,
        maxZoom: 13,

        groups: [

            {
                id: "historic",
                objectTypes: [
                    ["man_made", "tower"],
                    ["man_made", "watermill"],
                    ["man_made", "windmill"],
                    ["man_made", "campanile"],

                    ["building", "chapel"],
                    ["building", "monastery"],

                    ["amenity", "prison"],
                    ["amenity", "place_of_worship"],
                    ["amenity", "monastery"],

                    ["tourism", "museum"]
                ],

		lifecycle: true,

                requiredTags: [
                    "historic",
                    "wikidata",
                    "wikipedia",
                    "image",
                    "abandoned",
                    "disused",
                    "razed",
                    "heritage"
                ]
            }

        ]
    },

    {
        id: "z14_15",
        minZoom: 14,
        maxZoom: 15,

        groups: [

            {
                id: "special_places",

                objectTypes: [
                    ["amenity", "graveyard"],
                    ["man_made", "cellar_entrance"],
                    ["man_made", "mine"],
                    ["man_made", "mineshaft"],
                    ["man_made", "adit"]
                ],

		lifecycle: true,

                requiredTags: [
                    "historic",
                    "wikidata",
                    "wikipedia",
                    "image",
                    "abandoned",
                    "disused",
                    "razed",
                    "heritage"
                ]
            }, 

            {
                id: "mining",

                objectTypes: [
                    ["man_made", "mine"],
                    ["man_made", "mineshaft"],
                    ["man_made", "adit"]
                ],

		lifecycle: true,

                requiredTags: [
                    "abandoned",
                    "disused",
                    "razed",
                ]
	    }

        ]
    }
];

