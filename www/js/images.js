/*
 * images.js
 *
 * Hilfsfunktionen für Bilder
 */

import {tr} from "./ui/language.js";
import {cleanCommonsHTML, escapeHTML, stripHTML} from "./utils.js";

const commonsCache = new Map();
const MAX_COMMONS_CACHE = 500;
const MAX_CATEGORY_IMAGES = 5;

async function loadCommonsImageInfo(fileName) {
    const apiUrl = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({
                       action : "query",
                       format : "json",
                       origin : "*",
                       titles : "File:" + fileName,
                       prop : "imageinfo",
                       iiprop : "url|size|extmetadata",
                       iiurlwidth : "500"
                   });

    const response = await fetch(apiUrl);

    const data = await response.json();

    const page = Object.values(data.query.pages)[0];

    if (!page.imageinfo)
        return null;

    const info = page.imageinfo[0];

    return {

        url : info.url,

        thumbnail : info.thumburl,

        source : "commons",

        original : "File:" + fileName,

        commonsUrl : "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(fileName),

        author : info.extmetadata?.Artist?.value ?? null,

        license : info.extmetadata?.LicenseShortName?.value ?? null
    };
}

async function getCommonsImageInfo(fileName) {
    const cacheKey = normalizeCacheKey(fileName);

    /*
     * 1. Cache prüfen
     */

    if (commonsCache.has(cacheKey)) {
        console.log("Commons Cache:", cacheKey);

        return commonsCache.get(cacheKey);
    }

    /*
     * 2. Commons API laden
     */

    console.log("Commons API:", cacheKey);

    const imageInfo = await loadCommonsImageInfo(fileName);

    /*
     * 3. Ergebnis cachen
     *
     * Auch null speichern!
     * Damit werden nicht vorhandene
     * Dateien nicht immer erneut abgefragt.
     */

    addCommonsCache(cacheKey, imageInfo);

    return imageInfo;
}

function getCommonsCategoryName(value) {
    if (!value)
        return null;

    // Direkte Commons-Category-URL
    const match = value.match(/commons\.wikimedia\.org\/wiki\/Category:(.+)$/i);

    if (match) {
        return decodeURIComponent(match[1]).replace(/_/g, " ");
    }

    // OSM wikimedia_commons kann auch direkt "Category:..." enthalten.
    if (value.startsWith("Category:")) {
        return value;
    }

    return null;
}

export async function getImageInfo(properties, wikidata) {

    console.log("getImageInfo input:", {
        image : properties?.image,
        wikimedia_commons : properties?.wikimedia_commons,
        wikidataImage : wikidata?.image
    });

    // 1. OSM image
    if (properties?.image) {
        const commonsCategory = getCommonsCategoryName(properties.image);

        if (commonsCategory) {
            console.log("COMMONS CATEGORY:", commonsCategory);

            const images = await getCommonsCategoryImages(commonsCategory);

            console.log("COMMONS CATEGORY IMAGES:", images);
            // const images = await getCommonsCategoryImages( commonsCategory);
            return {source : "commons-category", images};
        }

        const commonsFile = getCommonsFileName(properties.image);

        if (commonsFile) {
            return await getCommonsImageInfo(commonsFile);
        }

        const url = normalizeImageUrl(properties.image);

        return {url, thumbnail : url, source : "osm-image", original : properties.image};
    }

    // 2. OSM wikimedia_commons

    if (properties?.wikimedia_commons) {
        const commonsFile = getCommonsFileName(properties.wikimedia_commons);

        if (commonsFile) {
            return await getCommonsImageInfo(commonsFile);
        }
    }

    // 3. Wikidata P18
    console.log("Wikidata image:", wikidata?.image);

    if (wikidata?.image) {
        const commonsFile = getCommonsFileName(wikidata.image);

        if (commonsFile) {
            const image = await getCommonsImageInfo(commonsFile);

            if (image)
                image.source = "wikidata";

            return image;
        }
    }

    return null;
}

// Wandelt Commons-Dateien in direkte Bild-URLs um

export function normalizeImageUrl(url) {
    if (!url)
        return null;

    url = url.trim();

    return url;
}

/*
 * Erzeugt das HTML für das Vorschaubild
 */

export function createImage(image) {
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

export function createImageCredit(image) {
    if (!image)
        return "";

    let lines = [];

    if (image.original) {
        const imageName = image.fileName ? image.fileName.replace(/^File:/i, "") : image.original;

        lines.push(tr("popup.image") + ": " + escapeHTML(imageName));
    }

    if (image.author) {
        lines.push(tr("popup.author") + ": " + cleanCommonsHTML(image.author));
    }

    if (image.license) {
        lines.push(tr("popup.license") + ": " + stripHTML(image.license));
    }

    if (image.commonsUrl) {
        lines.push(`<a href="${escapeHTML(image.commonsUrl)}"
                target="_blank">
                Wikimedia Commons
             </a>`);
    }

    if (lines.length === 0)
        return "";

    return `
<div class="poi-image-credit">
${lines.join("<br>")}
</div>
`;
}

/*
 * Entfernt defekte Bilder
 */

export function installImageHandler(container) {
    const images = container.querySelectorAll(".poi-image");

    images.forEach(
        img => { img.onerror = () => { img.closest(".poi-image-container")?.remove(); }; });
}

function getImageSourceText(image) {
    switch (image.source) {
    case "osm-image":
        return tr("popup.source") + ": OSM image=*";

    case "commons":
        return tr("popup.source") + ": Wikimedia Commons";

    case "wikidata":
        return tr("popup.source") + ": Wikidata (P18)";

    default:
        return "";
    }
}

function getCommonsFileName(value) {
    if (!value)
        return null;

    /*
     * File:Name.jpg
     *
     * Case-insensitiv, damit auch
     * file:Name.jpg funktioniert.
     */
    if (/^File:/i.test(value)) {
        return value.substring(5);
    }

    /*
     * https://commons.wikimedia.org/wiki/File:Name.jpg
     *
     * Case-insensitiv.
     */
    const fileMatch = value.match(/\/wiki\/File:([^?]+)/i);

    if (fileMatch) {
        return decodeURIComponent(fileMatch[1]);
    }

    /*
     * https://commons.wikimedia.org/wiki/Special:FilePath/Name.jpg
     *
     * Ebenfalls case-insensitiv.
     */
    const pathMatch = value.match(/\/wiki\/Special:FilePath\/([^?]+)/i);

    if (pathMatch) {
        return decodeURIComponent(pathMatch[1]);
    }

    return null;
}

/*
function getCommonsFileName(value)
{
    if (!value)
        return null;

    // File:Name.jpg
    if(value.startsWith("File:"))
    {
        return value.substring(5);
    }

    // https://commons.wikimedia.org/wiki/File:Name.jpg
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

    // https://commons.wikimedia.org/wiki/Special:FilePath/Name.jpg
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
*/

function normalizeCacheKey(fileName) {
    return decodeURIComponent(fileName.trim().replaceAll("_", " "));
}

function addCommonsCache(key, value) {
    if (commonsCache.size >= MAX_COMMONS_CACHE) {
        const firstKey = commonsCache.keys().next().value;

        commonsCache.delete(firstKey);
    }

    commonsCache.set(key, value);
}

export async function getCommonsCategoryImages(category) {
    if (!category)
        return [];

    if (!category.startsWith("Category:")) {
        category = "Category:" + category;
    }

    const categoryUrl =
        "https://commons.wikimedia.org/wiki/" + encodeURIComponent(category.replace(/ /g, "_"));

    const apiUrl = "https://commons.wikimedia.org/w/api.php" +
                   "?action=query" +
                   "&format=json" +
                   "&origin=*" +
                   "&generator=categorymembers" +
                   "&gcmtitle=" + encodeURIComponent(category) + "&gcmtype=file" +
                   "&gcmlimit=" + MAX_CATEGORY_IMAGES + "&prop=imageinfo" +
                   "&iiprop=url|extmetadata" +
                   "&iiurlwidth=400";

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data.query || !data.query.pages) {
            return [];
        }

        return Object.values(data.query.pages)
            .map(page => {
                const info = page.imageinfo?.[0];

                if (!info)
                    return null;

                const metadata = info.extmetadata || {};

                return {
                    thumbnail : info.thumburl || info.url,

                    url : info.url,

                    original : info.url,

                    fileName : page.title,

                    description : metadata.ImageDescription?.value || "",

                    author : metadata.Artist?.value || "",

                    license : metadata.LicenseShortName?.value || "",

                    commonsUrl : "https://commons.wikimedia.org/wiki/" +
                                     encodeURIComponent(page.title.replace(/ /g, "_")),

                    categoryUrl : categoryUrl
                };
            })
            .filter(Boolean);

    } catch (error) {
        console.error("Commons Category Fehler:", category, error);

        return [];
    }
}
