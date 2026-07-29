/**
 * Overpass POI Layer
 */


import { getIcon } from "./icons.js";

const OVERPASS_URL =
    "https://overpass-api.de/api/interpreter";


let sourceId = "osm-pois";



/**
 * Overpass-Abfrage erzeugen
 */
function createQuery(bounds)
{

    const south = bounds.getSouth();
    const west  = bounds.getWest();
    const north = bounds.getNorth();
    const east  = bounds.getEast();


    return `
[out:json][timeout:25];

(
 node[image](${south},${west},${north},${east});
 node[wikipedia](${south},${west},${north},${east});
 node[wikidata](${south},${west},${north},${east});

 way[image](${south},${west},${north},${east});
 way[wikipedia](${south},${west},${north},${east});
 way[wikidata](${south},${west},${north},${east});

 relation[image](${south},${west},${north},${east});
 relation[wikipedia](${south},${west},${north},${east});
 relation[wikidata](${south},${west},${north},${east});
);

out center 200;
`;
}



/**
 * Overpass Ergebnis nach GeoJSON
 */
function convertToGeoJSON(data)
{

    const features=[];


    data.elements.forEach(
        e =>
        {

            let lon;
            let lat;


            if(e.type==="node")
            {
                lon=e.lon;
                lat=e.lat;
            }
            else if(e.center)
            {
                lon=e.center.lon;
                lat=e.center.lat;
            }
            else
            {
                return;
            }


            features.push(
            {
                type:"Feature",

                geometry:
                {
                    type:"Point",

                    coordinates:
                    [
                        lon,
                        lat
                    ]
                },

                properties:
		{
		    ...(e.tags || {}),

		    icon:
			getIcon(
			    e.tags || {}
			)
		}

            });


        });


    return {

        type:"FeatureCollection",

        features:features

    };

}



/**
 * POI Layer initialisieren
 */
export function initOverpassLayer(map)
{

    map.addSource(
        sourceId,
        {
            type:"geojson",

            data:
            {
                type:"FeatureCollection",
                features:[]
            }
        }
    );

    map.addLayer(
    {
        id:sourceId,

        type:"symbol",

        source:sourceId,

        layout:
        {
            "icon-image":
            [
                "get",
                "icon"
            ],

            "icon-size":0.8,

            "icon-allow-overlap":true
        }

    });



    loadPOIs(map);



    map.on(
        "moveend",
        () =>
        {
            loadPOIs(map);
        }
    );

}



/**
 * Daten laden
 */
async function loadPOIs(map)
{

    const bounds =
        map.getBounds();


    const query =
        createQuery(bounds);


    try
    {

        const response =
            await fetch(
                OVERPASS_URL,
                {
                    method:"POST",

                    body:query
                }
            );


        const data =
            await response.json();


        const geojson =
            convertToGeoJSON(data);



	console.log(
            "Features:",
	    geojson.features.length
	);

	console.log(
	    geojson.features[0]
	);

        map.getSource(sourceId)
           .setData(
                geojson
            );


        document
        .getElementById("poiCount")
        .innerText =
            geojson.features.length;


    }

    catch(error)
    {

        console.error(
            "Overpass Fehler",
            error
        );

    }

}
