import {tr} from "./language.js";


let loadingCount = 0;
let loadingElement = null;


export function initLoadingIndicator(map) {

    const controlContainer =
        map.getContainer().querySelector(".maplibregl-ctrl-top-left");

    if (!controlContainer)
        return;

    const zoomControl =
        controlContainer.querySelector(".maplibregl-ctrl-group");

    controlContainer.style.position = "relative";

    loadingElement = document.createElement("div");
    loadingElement.id = "map-loading-indicator";

    loadingElement.innerHTML = `
        <div 
            class="map-loading-spinner"
            data-i18n="spinner.loading"
            title="${tr("spinner.loading")}"
        >
        </div>`;

    controlContainer.appendChild(loadingElement);

    if (zoomControl) {
        loadingElement.style.top =
            `${zoomControl.offsetHeight + 15}px`;
    }
}



export function startLoadingInd() {

    loadingCount++;

    if (loadingElement)
        loadingElement.style.display = "block";
}



export function stopLoadingInd() {

    loadingCount = Math.max(0, loadingCount - 1);

    if (loadingCount === 0 && loadingElement)
        loadingElement.style.display = "none";
}
