import { createMap } from "./map.js";
import { addControls } from "./controls.js";
import { addRasterLayer } from "./layers.js";
//import { createLayerControl } from "./layercontrol.js";
import { initOverpassLayer } from "./overpass.js";
import { initPopup } from "./popup.js";
import { loadIcons } from "./icons.js";
import { createLayerControl } from "./ui/layerControl.js";
import { initLayerManager, initZoomHandling, updateLayerVisibility } from "./layers.js";

const map = createMap();
window.mapLibreMap = map;


addControls(map);


// Karte geladen
map.on(
"load",
async () =>
{

    // console.log( "Karte geladen");

/*
    addRasterLayer(
        map,
        {
            id:"topo",
            title:"Topografische Karte",
            tiles:
            [
              "https://tile.opentopomap.org/{z}/{x}/{y}.png"
            ],
            opacity:0.5,
            group:"Hintergrundkarten"
        }
    );
*/

    await initLayerManager(map);
    updateLayerVisibility(map);
    initZoomHandling(map);

/*
    addRasterLayer(
    map,
    {
        id:"kliver-raster",
        title:"Kliver-Flözkarte",
        tiles:
        [
            "https://tiles.historic.place/mining/Kliver/{z}/{x}/{y}.png"
        ],
        opacity:0.7,
        visible:false,
        group:"Historische Karten"
    }
);
*/

console.log(
    "APP MAP:",
    map
);

console.log(
    "getLayer:",
    typeof map.getLayer
);
    createLayerControl(map);
    // console.log("Lade Icons...");
    await loadIcons(map);
    // console.log("Icons geladen");
    initOverpassLayer(map);
    // console.log("Overpass Layer erstellt");
    initPopup(map);
    // console.log("Popup aktiviert");

    console.log(
        "MapLibre Layer:",
        map.getStyle().layers.map(
            l => l.id
        )
    );
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
        .innerText =
            event.lngLat.lng.toFixed(5)
            +
            ", "
            +
            event.lngLat.lat.toFixed(5);

    }
);
