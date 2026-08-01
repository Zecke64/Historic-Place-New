import { loadWikidata } from "./wikidata.js";


let currentPopup = null;
let popupSequence = 0;



export function initPopup(map)
{

    /*
     * Klick auf einzelne POIs
     */

    map.on(
        "click",
        "osm-pois",
        async e =>
        {

            if(!e.features || !e.features.length)
                return;


            const feature =
                e.features[0];


            showPopup(
                map,
                feature
            );

        }
    );



    /*
     * Mauszeiger über POIs
     */

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

    console.log("POI Properties:", feature.properties);

    const properties =
        feature.properties;

    const thisPopupId = ++popupSequence;

    const coordinates =
        feature.geometry.coordinates;



    /*
     * Falls noch ein Popup offen ist,
     * schließen
     */

    if(currentPopup)
    {
        currentPopup.remove();
    }



    /*
     * Grund-Popup sofort anzeigen
     */

    const html =
    `
    <div class="poi-popup">

        ${createHeader(properties)}


        <div id="poi-loading">
            Lade Zusatzinformationen ...
        </div>


        <div id="poi-content">
        </div>


        <details class="poi-details">

            <summary>
                OSM-Tags
            </summary>

            ${createTagTable(properties)}

        </details>

    </div>
    `;



    currentPopup =
        new maplibregl.Popup(
        {
            maxWidth:"380px"
        })
        .setLngLat(
            coordinates
        )
        .setHTML(
            html
        )
        .addTo(map);



    /*
     * Zusatzinformationen laden
     */

    let wikidata =
        null;


    if(properties.wikidata)
    {

        wikidata =
            await loadWikidata(
                properties.wikidata
            );

    }



    /*
     * Bild bestimmen
     */

    const image =
        selectImage(
            properties,
            wikidata
        );



    /*
     * Beschreibung bestimmen
     */

    const description =
        selectDescription(
            properties,
            wikidata
        );



    /*
     * Dynamischen Inhalt erzeugen
     */

    const content =
    `

        ${createImage(image)}


        ${createDescription(description)}


        ${createLinks(properties, wikidata)}

    `;



    const popupElement =
        currentPopup
            .getElement();


    const loading =
        popupElement.querySelector(
            "#poi-loading"
        );


    const container =
        popupElement.querySelector(
            "#poi-content"
        );


    if(loading)
    {
        loading.remove();
    }


    if(container && thisPopupId === popupSequence)
    {
        container.innerHTML =
            content;
    }

}


function createHeader(properties)
{

    let subtitle = "";


    if(properties.tourism)
        subtitle = "Tourismus: " + properties.tourism;

    else if(properties.historic)
        subtitle = "Historisch: " + properties.historic;

    else if(properties.man_made)
        subtitle = "Bauwerk: " + properties.man_made;



    return `
    <h2 class="poi-title">

        ${escapeHTML(
            properties.name ||
            "Unbekanntes Objekt"
        )}

    </h2>


    ${
        subtitle
        ?
        `
        <div class="poi-subtitle">
            ${escapeHTML(subtitle)}
        </div>
        `
        :
        ""
    }
    `;

}





function createImage(url)
{

    if(!url)
        return "";


    return `
    <img
        class="poi-image"
        src="${url}"

        onerror="
            this.style.display='none';
        "
    >
    `;

}





function createDescription(text)
{

    if(!text)
        return "";


    return `
    <div class="poi-description">

        ${escapeHTML(text)}

    </div>
    `;

}





function createLinks(properties, wikidata)
{

    let html = "";


    html += createLink(
        "Wikipedia",
        wikidata?.wikipedia ||
        createWikipediaUrl(
            properties.wikipedia
        )
    );


    html += createLink(
        "Wikidata",
        wikidata?.id
        ?
        "https://www.wikidata.org/wiki/" +
        wikidata.id
        :
        null
    );


    html += createLink(
        "Website",
        wikidata?.website ||
        properties.website
    );


    if(!html)
        return "";


    return `
    <div class="poi-links">

        ${html}

    </div>
    `;

}





function createLink(title, url)
{

    if(!url)
        return "";


    return `
    <a
        class="poi-button"

        href="${url}"

        target="_blank"
    >
        ${title}
    </a>
    `;

}



function createTagTable(properties)
{
    if (!properties)
        return "";

    let rows = "";

    const hidden = new Set([
        "cluster",
        "cluster_id",
        "point_count",
        "point_count_abbreviated"
    ]);

    for (const key of Object.keys(properties).sort())
    {
        if (hidden.has(key))
            continue;

	if (key.startsWith("_app_"))
	    continue;

        const value = properties[key];

        if (value === null || value === undefined || value === "")
            continue;

        rows += `
        <tr>
            <td class="poi-tag">${escapeHTML(key)}</td>
            <td>${escapeHTML(String(value))}</td>
        </tr>`;
    }

    if (!rows)
        return "<div>Keine OSM-Tags vorhanden.</div>";

    return `
    <table class="poi-table">
        ${rows}
    </table>`;
}



function selectImage(properties, wikidata)
{

    /*
     * 1. OSM image
     */

    let image =
        getImageUrl(
            properties.image
        );


    if(image)
        return image;



    /*
     * 2. Wikidata P18
     */

    if(wikidata && wikidata.image)
        return wikidata.image;



    return null;

}





function selectDescription(properties, wikidata)
{

    if(wikidata?.description)
        return wikidata.description;


    if(properties.description)
        return properties.description;


    if(properties.note)
        return properties.note;


    if(wikidata?.label)
        return wikidata.label;


    return null;
}





function getImageUrl(image)
{

    if(!image)
        return null;



    /*
     * Direkte URL
     */

    if(
        image.startsWith("http://") ||
        image.startsWith("https://")
    )
    {
        return image;
    }



    /*
     * Wikimedia Commons
     */

    let filename =
        image;



    if(filename.startsWith("File:"))
    {
        filename =
            filename.substring(5);
    }



    if(filename.startsWith("commons:"))
    {
        filename =
            filename.substring(8);
    }



    return (
        "https://commons.wikimedia.org/wiki/Special:FilePath/" +
        encodeURIComponent(filename)
    );

}





function createWikipediaUrl(value)
{

    if(!value)
        return null;



    /*
     * Format:
     * de:Artikel
     */

    let parts =
        value.split(":");



    if(parts.length === 2)
    {

        return (
            "https://" +
            parts[0] +
            ".wikipedia.org/wiki/" +
            encodeURIComponent(parts[1])
        );

    }



    return (
        "https://www.wikipedia.org/wiki/" +
        encodeURIComponent(value)
    );

}





function escapeHTML(text)
{

    return String(text)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;");

}

