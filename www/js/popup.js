import {getIcon} from "./icons.js";
import {createImage, createImageCredit, getImageInfo, installImageHandler} from "./images.js";
import {tr} from "./ui/language.js";
import {escapeHTML} from "./utils.js";
import {loadWikidata} from "./wikidata.js";

let currentPopup = null;
export let currentPopupFeature = null;
let popupSequence = 0;

export function initPopup(map) {
    /*
     * Klick auf einzelne POIs und Objekt-Icons
     */
    for (const layer of ["osm-pois", "osm-object-icons"]) {
        map.on("click", layer, async e => {
            console.log("FEATURE CLICK", layer, e.features);

            if (!e.features || !e.features.length)
                return;

            const feature = e.features[0];

            showPopup(map, feature);
        });

        /*
         * Mauszeiger
         */
        map.on("mouseenter", layer, () => { map.getCanvas().style.cursor = "pointer"; });

        map.on("mouseleave", layer, () => { map.getCanvas().style.cursor = ""; });
    }
}


/*
export async function showPopup(map, feature) {

    console.log("POI Properties:", feature.properties);
    currentPopupFeature = feature; // für Permalink
    const properties = feature.properties;
    const thisPopupId = ++popupSequence;
    const coordinates = feature.geometry.coordinates;

    // Falls noch ein Popup offen ist, schließen
    if (currentPopup) {
        currentPopup.remove();
    }

    // Grund-Popup sofort anzeigen
    const html = `
    <div class="poi-popup">

        ${createHeader(properties)}

        <div id="poi-loading">
	    ${tr("popup.loadingAdditionalInfo")}
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
        new maplibregl.Popup({maxWidth : "380px"}).setLngLat(coordinates).setHTML(html).addTo(map);

    currentPopup.on("close", () => {
        currentPopup = null;
        currentPopupFeature = null;
    });

    // Zusatzinformationen laden
    let wikidata = null;

    if (properties.wikidata) {
        wikidata = await loadWikidata(properties.wikidata);
    }

    // Bild bestimmen

    const imageInfo = await getImageInfo(properties, wikidata);

    console.log("IMAGE INFO:", imageInfo);

    let imageContent = "";
    let imageCredit = "";

    if (imageInfo?.source === "commons-category") {
        imageContent = createImageGallery(imageInfo.images, imageInfo.categoryUrl);
    } else if (imageInfo) {
        imageContent =
            imageInfo.source === "osm-image" ? createImageLink(imageInfo) : createImage(imageInfo);

        imageCredit = imageInfo.source === "osm-image" ? "" : createImageCredit(imageInfo);
    }

    const description = selectDescription(properties, wikidata);

    const content = `
        ${imageContent}
        ${imageCredit}
        ${createDescription(description)}
        ${createLinks(properties, wikidata)}
    `;

    const popupElement = currentPopup.getElement();

    const loading = popupElement.querySelector("#poi-loading");

    const container = popupElement.querySelector("#poi-content");

    if (loading) {
        loading.remove();
    }

    if (container && thisPopupId === popupSequence) {
        container.innerHTML = content;
        installImageHandler(container);
        if (imageInfo?.source === "commons-category") {
            installImageGalleryHandler(container, imageInfo.images);
        }
    }
}
*/



export async function showPopup(map, feature) {

    console.log("POI Properties:", feature.properties);
    currentPopupFeature = feature; // für Permalink
    const properties = feature.properties;
    const thisPopupId = ++popupSequence;
    const coordinates = feature.geometry.coordinates;

    // Falls noch ein Popup offen ist, schließen
    if (currentPopup) {
        currentPopup.remove();
    }

    // Grund-Popup sofort anzeigen
    const html = `
    <div class="poi-popup">

        ${createHeader(properties)}

        <div id="poi-loading">
        ${tr("popup.loadingAdditionalInfo")}
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
        new maplibregl.Popup({maxWidth : "380px"})
            .setLngLat(coordinates)
            .setHTML(html)
            .addTo(map);

    currentPopup.on("close", () => {
        currentPopup = null;
        currentPopupFeature = null;
    });

    /*
     * Zusatzinformationen erst jetzt laden.
     */
    let wikidata = null;

    if (properties.wikidata) {
        wikidata = await loadWikidata(properties.wikidata);
    }

    /*
     * Falls inzwischen ein anderes Popup geöffnet wurde,
     * dieses Ergebnis ignorieren.
     */
    if (thisPopupId !== popupSequence)
        return;

    /*
     * Bild bestimmen
     */
    const imageInfo = await getImageInfo(properties, wikidata);

    console.log("IMAGE INFO:", imageInfo);

    if (thisPopupId !== popupSequence)
        return;

    let imageContent = "";
    let imageCredit = "";

    if (imageInfo?.source === "commons-category") {
        imageContent =
            createImageGallery(imageInfo.images, imageInfo.categoryUrl);
    } else if (imageInfo) {
        imageContent =
            imageInfo.source === "osm-image"
                ? createImageLink(imageInfo)
                : createImage(imageInfo);

        imageCredit =
            imageInfo.source === "osm-image"
                ? ""
                : createImageCredit(imageInfo);
    }

    const description = selectDescription(properties, wikidata);

    const content = `
        ${imageContent}
        ${imageCredit}
        ${createDescription(description)}
        ${createLinks(properties, wikidata)}
    `;

    const popupElement = currentPopup?.getElement();

    if (!popupElement)
        return;

    const loading = popupElement.querySelector("#poi-loading");
    const container = popupElement.querySelector("#poi-content");

    if (loading) {
        loading.remove();
    }

    if (container && thisPopupId === popupSequence) {
        container.innerHTML = content;

        installImageHandler(container);

        if (imageInfo?.source === "commons-category") {
            installImageGalleryHandler(container, imageInfo.images);
        }
    }
}



function createHeader(properties) {
    const icon = properties._app_icon;

    console.log("CREATE HEADER:", "name =", properties.name, "icon =", icon,
                "properties =", properties);

    // Das transparente Icon wird nicht als Popup verwendet
    if (icon === "null")
        return "";

    const title = properties.name || tr("icon." + icon);

    return `
        <h2 class="poi-title">
            ${escapeHTML(title)}
        </h2>
    `;
}

function createDescription(text) {

    if (!text)
        return "";

    return `
    <div class="poi-description">

        ${escapeHTML(text)}

    </div>
    `;
}

function createLinks(properties, wikidata) {
    let html = "";

    html +=
        createLink("Wikipedia", wikidata?.wikipedia || createWikipediaUrl(properties.wikipedia));

    html += createLink("Wikidata",
                       wikidata?.id ? "https://www.wikidata.org/wiki/" + wikidata.id : null);

    html += createLink(tr("popup.website"), wikidata?.website || properties.website);

    if (!html)
        return "";

    return `
    <div class="poi-links">

        ${html}

    </div>
    `;
}

function createLink(title, url) {
    if (!url)
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

function createTagTable(properties) {
    if (!properties)
        return "";

    let rows = "";

    const hidden = new Set([ "cluster", "cluster_id", "point_count", "point_count_abbreviated" ]);

    for (const key of Object.keys(properties).sort()) {
        if (hidden.has(key))
            continue;

        if (key.startsWith("_") && key !== "_osm_id")
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
        return `<div>${tr("popup.noOsmTags")}</div>`;

    return `
    <table class="poi-table">
        ${rows}
    </table>`;
}

function selectDescription(properties, wikidata) {
    if (wikidata?.description)
        return wikidata.description;

    if (properties.description)
        return properties.description;

    if (properties.note)
        return properties.note;

    if (wikidata?.label)
        return wikidata.label;

    return null;
}

function createWikipediaUrl(value) {
    if (!value)
        return null;

    // Format: * de:Artikel
    let parts = value.split(":");

    if (parts.length === 2) {
        return ("https://" + parts[0] + ".wikipedia.org/wiki/" + encodeURIComponent(parts[1]));
    }

    return ("https://www.wikipedia.org/wiki/" + encodeURIComponent(value));
}

function createImageLink(image) {
    if (!image?.url)
        return "";

    return `
        <a
            class="poi-button"
            href="${escapeHTML(image.url)}"
            target="_blank"
            rel="noopener noreferrer"
        >
	    ${tr("popup.openImage")}
        </a>
    `;
}

function createImageGallery(images) {
    if (!images || images.length === 0)
        return "";

    const count = Math.min(images.length, 5);

    const galleryImages = images.slice(0, count);

    return `
        <div class="poi-image-gallery">

            <div class="poi-gallery-image-container">

                <button
                    class="poi-gallery-prev"
                    type="button"
                    ${count <= 1 ? "disabled" : ""}
                >
                    ‹
                </button>

                <img
                    class="poi-gallery-image"
                    src="${escapeHTML(galleryImages[0].thumbnail || galleryImages[0].url)}"
                    alt=""
                >

                <button
                    class="poi-gallery-next"
                    type="button"
                    ${count <= 1 ? "disabled" : ""}
                >
                    ›
                </button>

            </div>

            <div class="poi-gallery-counter">
                1 / ${count}
            </div>

	    <div class="poi-gallery-info">

                ${createImageCredit(galleryImages[0])}

		<div class="poi-gallery-description">
		    ${galleryImages[0].description || ""}
		</div>
    
            </div>
        </div>
    `;
}

function installImageGalleryHandler(container, images) {
    if (!images || images.length <= 1)
        return;

    const galleryImages = images.slice(0, 5);

    let currentIndex = 0;

    const image = container.querySelector(".poi-gallery-image");
    const counter = container.querySelector(".poi-gallery-counter");
    const galleryInfo = container.querySelector(".poi-gallery-info");
    const description = container.querySelector(".poi-gallery-description");
    const credit = container.querySelector(".poi-gallery-credit");
    const fileLink = container.querySelector(".poi-gallery-file-link");
    const previous = container.querySelector(".poi-gallery-prev");
    const next = container.querySelector(".poi-gallery-next");

    function showImage(index) {
        currentIndex = index;
        const current = galleryImages[currentIndex];
        image.src = current.thumbnail || current.url;
        counter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;

        if (galleryInfo) {
            const currentImage = galleryImages[currentIndex];

            galleryInfo.innerHTML = `
        	${createImageCredit(currentImage)}

        	<div class="poi-gallery-description">
            	${currentImage.description || ""}
        	</div>
        	`;
        }
        if (description) {
            description.innerHTML = cleanCommonsHtml(current.description || "");
        }

        if (credit) {
            let html = "";
            if (current.author) {
                html = "Urheber: " + cleanCommonsHtml(current.author);
            }
            if (current.license) {
                if (html)
                    html += " · ";

                html += escapeHTML(current.license);
            }
            credit.innerHTML = html;
        }

        if (fileLink) {
            if (current.commonsUrl) {
                fileLink.href = current.commonsUrl;
                fileLink.style.display = "";
            } else {
                fileLink.style.display = "none";
            }
        }
    }

    previous.addEventListener(
        "click",
        () => { showImage((currentIndex - 1 + galleryImages.length) % galleryImages.length); });

    next.addEventListener("click", () => { showImage((currentIndex + 1) % galleryImages.length); });
}

function cleanCommonsHtml(value) {
    if (!value)
        return "";

    return value.replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
        .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
        .replace(/href\s*=\s*["']([^"']*)["']/gi, (match, url) => {
            if (url.startsWith("https://") || url.startsWith("http://")) {
                return `href="${escapeHTML(url)}"`;
            }

            return "";
        });

    return value;
}
