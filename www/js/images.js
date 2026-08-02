/*
 * images.js
 *
 * Hilfsfunktionen für Bilder
 */

import
{
    escapeHTML
}
from "./utils.js";



/*
 * Ermittelt die Bild-URL
 */

export function getImageUrl(properties, wikidata)
{

    /*
     * 1. OSM image
     */

    if(properties?.image)
    {
        const image =
            normalizeImageUrl(
                properties.image
            );

        if(image)
            return image;
    }


    /*
     * 2. OSM wikimedia_commons
     */

    if(properties?.wikimedia_commons)
    {
        const image =
            normalizeImageUrl(
                properties.wikimedia_commons
            );

        if(image)
            return image;
    }


    /*
     * 3. Wikidata P18
     */

    if(wikidata?.image)
    {
        const image =
            normalizeImageUrl(
                wikidata.image
            );

        if(image)
            return image;
    }


    return null;
}


/*
 * Wandelt Commons-Dateien in direkte Bild-URLs um
 */

export function normalizeImageUrl(url)
{
    if (!url)
        return null;


    url = url.trim();

    // Commons Category ist kein einzelnes Bild

    if( url.startsWith("Category:") )
    {
        return null;
    }

    // Commons File:Name

    if (url.startsWith("File:"))
    {
        return (
            "https://commons.wikimedia.org/wiki/Special:FilePath/" +
            encodeURIComponent(
                url.substring(5)
            )
        );
    }


    /*
     * Commons Wiki/File:Name
     */

    if (url.includes("/wiki/File:"))
    {
        const file =
            url.split("/wiki/File:")[1];


        return (
            "https://commons.wikimedia.org/wiki/Special:FilePath/" +
            encodeURIComponent(
                decodeURIComponent(file)
            )
        );
    }


    /*
     * Direkte Bilddateien
     */

    if(
        /\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(url)
    )
    {
        return url;
    }


    return url;
}


/*
 * Erzeugt das HTML für das Vorschaubild
 */

export function createImage(url)
{
    if (!url)
        return "";


    return `
<div class="poi-image-container">

    <a
        href="${escapeHTML(url)}"
        target="_blank"
    >

        <img
            class="poi-image"
            src="${escapeHTML(url)}"
            loading="lazy"
        >

    </a>

</div>
`;
}


/*
 * Entfernt defekte Bilder
 */

export function installImageHandler(container)
{
    const images =
        container.querySelectorAll(".poi-image");

    images.forEach(img =>
    {
        img.onerror = () =>
        {
            img.closest(".poi-image-container")?.remove();
        };
    });
}
