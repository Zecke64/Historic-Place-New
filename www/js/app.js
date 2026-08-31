import {addControls} from "./controls.js";
import {loadIcons} from "./icons.js";
import {initLayerManager, initZoomHandling, updateLayerVisibility} from "./layers.js";
import {createMap} from "./map.js";
import {initOverpassLayer, initPrefetch} from "./overpass.js";
import {createPermalinkControl, loadPermalink} from "./permalink.js";
import {initPopup} from "./popup.js";
import {updateLanguage} from "./ui/language.js";
import {createLanguageSelector} from "./ui/languageSelector.js";
import {createLayerControl} from "./ui/layerControl.js";

window.addEventListener("languagechange", updateLanguage);

const map = createMap();
window.mapLibreMap = map;

addControls(map);

// Karte geladen
map.on("load", async () => {
    await initLayerManager(map);
    updateLayerVisibility(map);
    initZoomHandling(map);
    createLayerControl(map);
    createPermalinkControl(map);
    loadPermalink(map);
    await loadIcons(map);
    initOverpassLayer(map);
    initPopup(map);
    initPrefetch(map);

    //console.log("MapLibre Layer:", map.getStyle().layers.map(l => l.id));

    const languageContainer = document.createElement("div");
    languageContainer.className = "language-selector-container";
    document.body.appendChild(languageContainer);
    createLanguageSelector(languageContainer);
});

// Zoomanzeige

map.on("zoom", () => { document.getElementById("zoom").innerText = map.getZoom().toFixed(2); });

// Mauskoordinaten

map.on("mousemove", (event) => {
    document.getElementById("coords").innerText =
        event.lngLat.lng.toFixed(5) + ", " + event.lngLat.lat.toFixed(5);
});
