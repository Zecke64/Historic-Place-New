import { prefetchWikidata }
    from "./wikidata.js";
import { getIcon } from "./icons.js";

const OVERPASS_URL =
//    "https://overpass.maprva.org/api/interpreter";
//    "https://overpass-api.de/api/interpreter";
//    "https://overpass.private.coffee/api/interpreter";
      "https://mystic.historic.place:4443/api/interpreter";

const sourceId = "osm-pois";

let currentRequest = null;

export function initOverpassLayer(map)
{
    /*
     * GeoJSON Source mit aktiviertem Clustering
     */
    map.addSource(
        sourceId,
        {
            type: "geojson",
            data:
            {
                type:"FeatureCollection",
                features:[]
            },
            cluster:true,
            clusterRadius:5,
            clusterMaxZoom:16
        }
    );

    /*
     * Cluster-Kreise
     */
    map.addLayer(
        {
            id:"poi-clusters",
            type:"circle",
            source:sourceId,
            filter:
            [
                "has",
                "point_count"
            ],
            paint:
            {
                "circle-radius":
                [
                    "step",
                    [ "get", "point_count" ],
                    18,
                    20,
                    24,
                    50,
                    32,
                    100,
                    40
                ],
                "circle-stroke-width":2,
                "circle-stroke-color": "#ffffff",
                "circle-color": "#3388ff"
            }
        }
    );


    /*
     * Cluster Anzahl
     */
    map.addLayer(
        {
            id:"poi-cluster-count",
            type:"symbol",
            source:sourceId,
            filter: [ "has", "point_count" ],
            layout:
            {
                "text-field": "{point_count}",
                "text-size":14
            },
            paint:
            {
                "text-color": "#ffffff"
            }
        }
    );


    /*
     * Einzelne POIs
     */
    map.addLayer(
        {
            id:"osm-pois",
            type:"symbol",
            source:sourceId,
            filter:
            [
                "!",
                [ "has", "point_count" ]
            ],
            layout:
            {
                "icon-image": [ "get", "_app_icon" ],
                "icon-size":0.8,
                "icon-allow-overlap":true
            }
        }
    );


    /*
     * Cluster anklicken
     */
    map.on(
        "click",
        "poi-clusters",
        async e =>
        {
            const feature = e.features[0];
            const clusterId = feature.properties.cluster_id;
            const source = map.getSource(sourceId);

            try
            {
                const zoom =
                    await source.getClusterExpansionZoom( clusterId);
                map.easeTo(
                {
                    center: feature.geometry.coordinates,
                    zoom: zoom
                });
            }
            catch(error)
            {
                console.error( "Cluster Zoom Fehler:", error);
            }
        }
    );


    /*
     * Cursor
     */
    map.on(
        "mouseenter",
        "poi-clusters",
        () =>
        {
            map.getCanvas().style.cursor = "pointer";
        }
    );


    map.on(
        "mouseleave",
        "poi-clusters",
        () =>
        {
            map.getCanvas().style.cursor = "";
        }
    );


    /*
     * POIs laden
     */
    loadPOIs(map);


    /*
     * Nach Kartenbewegung neu laden
     */
    map.on(
        "moveend",
        () =>
        {
            loadPOIs(map);
        }
    );

}


async function loadPOIs(map)
{

    /*
     * Keine Overpass-Abfrage bei kleinen Zoomstufen
     */
    if(map.getZoom() < 12)
    {
        clearSource(map);
        return;
    }

    const bounds = map.getBounds();
    const query = createQuery(bounds);
    
    console.log(query);

    /*
     * laufende Anfrage abbrechen
     */
    if(currentRequest)
    {
        currentRequest.abort();
    }

    currentRequest = new AbortController();

    try
    {
        const response =
            await fetch(
                OVERPASS_URL,
                {
                    method:"POST",
                    headers:
                    {
                        "Content-Type":
                        "application/x-www-form-urlencoded"
                    },
                    body: "data=" + encodeURIComponent(query),
                    signal: currentRequest.signal
                }
            );

        const data = await response.json();
        console.log( "Overpass Elemente:", data.elements.length);

        const geojson = convertToGeoJSON(data);
        console.log( "GeoJSON:", geojson.features.length);

	const ids = geojson.features
                .map(f => f.properties.wikidata)
                .filter(Boolean);

        prefetchWikidata(ids);

        map
        .getSource(sourceId)
        .setData(geojson);
    }

    catch(error)
    {
        if(error.name !== "AbortError")
        {
            console.error(
                "Overpass Fehler",
                error
            );
        }
    }

}

//
// Die Query gibt eine Obermenge aller Objekte, die potentiell dargestellt werden können
//
function createQuery(bounds)
{

    const south = bounds.getSouth();
    const west = bounds.getWest();
    const north = bounds.getNorth();
    const east = bounds.getEast();

    return `
[out:json][timeout:30];


(
 nwr["historic"](${south},${west},${north},${east});
 nwr["heritage"](${south},${west},${north},${east});
 nwr["tourism"](${south},${west},${north},${east});
 nwr["abandoned"](${south},${west},${north},${east});
 nwr["disused"](${south},${west},${north},${east});
 //nwr["wikipedia"](${south},${west},${north},${east});
 //nwr["wikidata"](${south},${west},${north},${east});
 nwr[amenity=monastery](${south},${west},${north},${east});
 nwr[amenity=place_of_worship](${south},${west},${north},${east});
 nwr[amenity=grave_yard](${south},${west},${north},${east});
 nwr[amenity=prison](${south},${west},${north},${east});
 nwr[building=castle_wall](${south},${west},${north},${east});
 nwr[building=monastery](${south},${west},${north},${east});
 nwr[building=triumphal_arc](${south},${west},${north},${east});
 nwr[building=chapel](${south},${west},${north},${east});
 nwr[man_made=campanile](${south},${west},${north},${east});
 nwr[man_made=cellar_entrance](${south},${west},${north},${east});
 nwr[man_made=cross](${south},${west},${north},${east});
 nwr[man_made=water_well](${south},${west},${north},${east});
 nwr[man_made=windmill](${south},${west},${north},${east});
 nwr[man_made=watermill](${south},${west},${north},${east});
 nwr[man_made=mine](${south},${west},${north},${east});
 nwr[man_made=mineshaft](${south},${west},${north},${east});
 nwr[man_made=adit](${south},${west},${north},${east});
 nwr[man_made=spoil_heap](${south},${west},${north},${east});
 nwr[man_made=obelisk](${south},${west},${north},${east});
 nwr[man_made=kiln](${south},${west},${north},${east});
 nwr[man_made=tower](${south},${west},${north},${east});
 nwr[natural=stone](${south},${west},${north},${east});
 nwr[natural=spring](${south},${west},${north},${east});
 //nwr["wikimedia_commons"](${south},${west},${north},${east});
 //nwr["man_made"](${south},${west},${north},${east});
);


out center qt 500;
`;

}


 //nwr["man_made"](${south},${west},${north},${east});



function convertToGeoJSON(data)
{
    const features = [];

    for(const e of data.elements)
    {
        let lat;
        let lon;

        if(e.type === "node")
        {
            lat=e.lat;
            lon=e.lon;
        }
        else if(e.center)
        {
            lat=e.center.lat;
            lon=e.center.lon;
        }

        if(!lat || !lon)
            continue;

        const tags = e.tags || {};

        features.push(
            {
                type:"Feature",
                geometry:
                {
                    type:"Point",
                    coordinates: [ lon, lat ]
                },
                properties:
                {
                    ...tags,
                    _app_icon: getIcon(tags)
                }
            }
        );

        if(features.length >= 200)
            break;

    }


    return {
        type:"FeatureCollection",
        features:features
    };

}


/*
function getIcon(tags)
{
    if(tags.heritage === "1")
        return "wke";

    if(tags.cemetary === "war_cemetary" || tags.tomb === "war_grave")
        return "war_cemetary";

    if(tags.building === "bunker" || tags.military === "bunker")
        return "bunker";

    if(tags.historic === "boundary_stone" || tags.boundary === "marker")
	    return "boundary_marker";

    if(tags.historic === "tower" || tags.building === "tower" || tags.man_made === "tower")
	    return "tower";

    if(tags.man_made === "adit" || tags.man_made === "cellar_entrance")
        return "stollen";

    if(tags.man_made === "mineshaft" || tags.historic === "mineshaft")
        return "mine";

    if(tags.historic === "wayside_cross")
        return "cross";

    if(tags.tourism === "museum")
        return "museum";

    if(tags.historic === "castle")
        return "castle";

    if(tags.amenity === "place_of_worship")
        return "church";

    if(tags.historic === "industrial")
        return "industrial";

    return "poi";

}
*/

function clearSource(map)
{
    const source = map.getSource(sourceId);

    if(source)
    {
        source.setData(
            {
                type:"FeatureCollection",
                features:[]
            }
        );
    }

}
