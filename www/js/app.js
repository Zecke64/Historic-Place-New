import { createMap } from "./map.js";
import { addControls } from "./controls.js";
import { initOverpassLayer } from "./overpass.js";
import { initPopup } from "./popup.js";
import { loadIcons } from "./icons.js";
import { createLayerControl } from "./ui/layerControl.js";
import { initLayerManager, initZoomHandling, updateLayerVisibility } from "./layers.js";
import { createLanguageSelector } from "./ui/languageSelector.js";
import { updateLanguage } from "./ui/language.js";

window.addEventListener(
    "languagechange",
    updateLanguage
);

const map = createMap();
window.mapLibreMap = map;

addControls(map);

// Karte geladen
map.on(
"load",
async () =>
{
    await initLayerManager(map);
    updateLayerVisibility(map);
    initZoomHandling(map);
    createLayerControl(map);
    await loadIcons(map);
    initOverpassLayer(map);
    initPopup(map);

    console.log(
        "MapLibre Layer:",
        map.getStyle().layers.map(
            l => l.id
        )
    );

    const languageContainer = document.createElement("div");
    languageContainer.className = "language-selector-container";
    document.body.appendChild( languageContainer);
    createLanguageSelector( languageContainer);
    
});



// Zoomanzeige

map.on(
    "zoom",
    () =>
    {
        document
        .getElementById("zoom")
        .innerText =
            map.getZoom()
            .toFixed(2);
    }
);



// Mauskoordinaten

map.on(
    "mousemove",
    (event)=>
    {
        document
        .getElementById("coords")
        .innerText = event.lngLat.lng.toFixed(5) + ", " + event.lngLat.lat.toFixed(5);
    }
);
