import {addControls,createInfoControl} from "./controls.js";
import {loadIcons} from "./icons.js";
import {initLayerManager, initZoomHandling, updateLayerVisibility} from "./layers.js";
import {createMap} from "./map.js";
import {initOverpassLayer, initPrefetch} from "./overpass.js";
import {createPermalinkControl, loadPermalink} from "./permalink.js";
import {initPopup} from "./popup.js";
import {initLanguage,updateLanguage} from "./language.js";
import {createLanguageSelector} from "./languageSelector.js";
import {createLayerControl} from "./layerControl.js";
import {createSearchControl} from "./search.js";
import {initLoadingIndicator} from "./loadingIndicator.js"
import {showSplashScreen} from "./splash.js";

window.addEventListener("languagechange", updateLanguage);

initLanguage();

const map = createMap();
window.mapLibreMap = map;

showSplashScreen();
addControls(map);
map.addControl(createSearchControl(), "top-left");
initLoadingIndicator(map);

// Karte geladen
map.on("load", async () => {
    await initLayerManager(map);
    updateLayerVisibility(map);
    initZoomHandling(map);
    createLayerControl(map);
    createPermalinkControl(map);
    createInfoControl(map);
    createLanguageSelector();
    loadPermalink(map);
    await loadIcons(map);
    initOverpassLayer(map);
    initPopup(map);
    initPrefetch(map);
});

// Zoomanzeige

map.on("zoom", () => { document.getElementById("zoom").innerText = map.getZoom().toFixed(2); });

// Mauskoordinaten

map.on("mousemove", (event) => {
    document.getElementById("coords").innerText =
        event.lngLat.lng.toFixed(5) + ", " + event.lngLat.lat.toFixed(5);
});
