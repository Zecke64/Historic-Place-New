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


async function getCommonsImageInfo(fileName)
{
    const apiUrl =
        "https://commons.wikimedia.org/w/api.php?" +
        new URLSearchParams(
        {
            action: "query",
            format: "json",
            origin: "*",
            titles: "File:" + fileName,
            prop: "imageinfo",
            iiprop:
                "url|size|extmetadata",
            iiurlwidth: "500"
        });


    const response =
        await fetch(apiUrl);


    const data =
        await response.json();


    const pages =
        data.query.pages;


    const page =
        Object.values(pages)[0];


    if(!page.imageinfo)
        return null;


    const info =
        page.imageinfo[0];


    return {
        url:
            info.url,

        thumbnail:
            info.thumburl,

        source:
            "commons",

        original:
            "File:" + fileName,

        author:
            info.extmetadata?.Artist?.value ?? null,

        license:
            info.extmetadata?.LicenseShortName?.value ?? null,

	description:
            info.extmetadata?.ImageDescription?.value ?? null
    };
}




export async function getImageInfo(properties, wikidata)
{

    console.log("getImageInfo input:", {
        image: properties?.image,
        wikimedia_commons: properties?.wikimedia_commons,
        wikidataImage: wikidata?.image
    });

    /*
     * 1. OSM image
     */

    if(properties?.image)
    {
        const commonsFile =
            getCommonsFileName(
                properties.image
            );


        if(commonsFile)
        {
            return await getCommonsImageInfo(
                commonsFile
            );
        }

	const url =
            normalizeImageUrl(
            properties.image
        );

        return {
            url,
            thumbnail:url,
            source:"osm-image",
            original:properties.image
	};
 	
    }


    /*
     * 2. OSM wikimedia_commons
     */

    if(properties?.wikimedia_commons)
    {
        const commonsFile =
            getCommonsFileName(
                properties.wikimedia_commons
            );


        if(commonsFile)
        {
            return await getCommonsImageInfo(
                commonsFile
            );
        }
    }


    /*
     * 3. Wikidata P18
     */

    if(wikidata?.image)
    {
        const commonsFile =
            getCommonsFileName(
                wikidata.image
            );


        if(commonsFile)
        {
            const image =
                await getCommonsImageInfo(
                    commonsFile
                );

            if(image)
                image.source = "wikidata";

            return image;
        }
    }


    return null;
}



// Wandelt Commons-Dateien in direkte Bild-URLs um

export function normalizeImageUrl(url)
{
    if(!url)
        return null;


    url = url.trim();


    return url;
}


/*
 * Erzeugt das HTML für das Vorschaubild
 */

export function createImage(image)
{
    if (!image)
        return "";

    return `
<div class="poi-image-container">

    <a
        href="${escapeHTML(image.url)}"
        target="_blank"
    >

        <img
            class="poi-image"
            src="${escapeHTML(image.thumbnail ?? image.url)}"
            loading="lazy"
        >

    </a>

    <div class="poi-image-source">
        ${getImageSourceText(image)}
    </div>

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


function getImageSourceText(image)
{
    switch(image.source)
    {
        case "osm-image":
            return "Quelle: OSM image=*";

        case "commons":
            return "Quelle: Wikimedia Commons";

        case "wikidata":
            return "Quelle: Wikidata (P18)";

        default:
            return "";
    }
}


export function createImageCredit(image)
{
    if(!image)
        return "";


    let lines = [];


    if(image.author)
    {
        lines.push(
            "Urheber: " +
            escapeHTML(
                image.author
            )
        );
    }


    if(image.license)
    {
        lines.push(
            "Lizenz: " +
            escapeHTML(
                image.license
            )
        );
    }


    if(lines.length === 0)
        return "";


    return `
<div class="poi-image-credit">
${lines.join("<br>")}
</div>
`;
}


function getCommonsFileName(value)
{
    if (!value)
        return null;


    /*
     * File:Name.jpg
     */

    if(value.startsWith("File:"))
    {
        return value.substring(5);
    }


    /*
     * https://commons.wikimedia.org/wiki/File:Name.jpg
     */

    const fileMarker =
        "/wiki/File:";


    if(value.includes(fileMarker))
    {
        return decodeURIComponent(
            value
                .split(fileMarker)[1]
                .split("?")[0]
        );
    }


    /*
     * https://commons.wikimedia.org/wiki/Special:FilePath/Name.jpg
     */

    const pathMarker =
        "/wiki/Special:FilePath/";


    if(value.includes(pathMarker))
    {
        return decodeURIComponent(
            value
                .split(pathMarker)[1]
                .split("?")[0]
        );
    }


    return null;
}

