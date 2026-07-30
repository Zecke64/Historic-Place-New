import { loadWikidata } from "./wikidata.js";

export function initPopup(map)
{

    map.on(
        "click",
        "osm-pois",
        e =>
        {

            if (!e.features.length)
                return;

            const feature =
                e.features[0];


            showPopup(
                map,
                feature
            );

        }
    );



    map.on(
        "mouseenter",
        "osm-pois",
        () =>
        {
            map.getCanvas().style.cursor =
                "pointer";
        }
    );


    map.on(
        "mouseleave",
        "osm-pois",
        () =>
        {
            map.getCanvas().style.cursor =
                "";
        }
    );

}


async function showPopup(map, feature)
{

    const p =
        feature.properties;


    const coordinates =
        feature.geometry.coordinates;


    let html =
    `
    <div class="poi-popup">

    <h3>
    ${escapeHTML(
        p.name || "Unbekanntes Objekt"
    )}
    </h3>

    <div id="wikidata-content">
        Lade Zusatzinformationen ...
    </div>

    `;


    if(p.wikipedia)
    {
        html +=
        `
        <p>
        📖
        <a href="https://www.wikipedia.org/wiki/${encodeURIComponent(p.wikipedia.split(":").pop())}"
           target="_blank">
           Wikipedia
        </a>
        </p>
        `;
    }


    if(p.website)
    {
        html +=
        `
        <p>
        🌐
        <a href="${p.website}"
           target="_blank">
           Webseite
        </a>
        </p>
        `;
    }


    html +=
    `
    </div>
    `;


    const popup =
        new maplibregl.Popup()
        .setLngLat(coordinates)
        .setHTML(html)
        .addTo(map);



    /*
     * Wikidata nachladen
     */

    if(p.wikidata)
    {

        const data =
            await loadWikidata(
                p.wikidata
            );


        const container =
            document.getElementById(
                "wikidata-content"
            );


        if(container && data)
        {

            let extra =
            "";


	    let image =
    	        null;


            /*
             * Erst OSM image=* verwenden
             */

            if(p.image)
            {
                image =
                    getImageUrl(
                        p.image
                    );
            }


            /*
             * sonst Wikidata-Bild
             */

            if(!image && data)
            {
                image =
                    data.image;
            }


            if(image)
            {
                extra +=
                `
                <img
                  src="${image}"
                  style="
                    width:100%;
                    max-height:220px;
                    object-fit:cover;
                    border-radius:4px;
                  "
                >
                `;
            }

            if(data.description)
            {
                extra +=
                `
                <p>
                ${escapeHTML(
                    data.description
                )}
                </p>
                `;
            }


            container.innerHTML =
                extra;

        }

        else if(container)
        {
            container.innerHTML =
                "";
        }

    }

}


function getImageUrl(image)
{
    if(!image)
        return null;


    /*
     * Direktes URL-Bild
     */

    if(
        image.startsWith("http://") ||
        image.startsWith("https://")
    )
    {
        return image;
    }


    /*
     * Wikimedia Commons:
     * File:Beispiel.jpg
     */

    let filename =
        image;


    if(
        filename.startsWith("File:")
    )
    {
        filename =
            filename.substring(5);
    }


    if(
        filename.startsWith("commons:")
    )
    {
        filename =
            filename.substring(8);
    }


    return (
        "https://commons.wikimedia.org/wiki/Special:FilePath/" +
        encodeURIComponent(filename)
    );
}


function escapeHTML(text)
{

    return text
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;");

}
