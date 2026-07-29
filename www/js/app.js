import { createMap } from "./map.js";
import { addControls } from "./controls.js";
import { addRasterLayer } from "./layers.js";
import { createLayerControl } from "./layercontrol.js";
import { initOverpassLayer } from "./overpass.js";
import { initPopup } from "./popup.js";
import { loadIcons } from "./icons.js";


const map = createMap();


addControls(map);


// Karte geladen
map.on(
"load",
async () =>
{

    console.log( "Karte geladen");

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


    createLayerControl(map);
    console.log("Lade Icons...");
    await loadIcons(map);
    console.log("Icons geladen");
    initOverpassLayer(map);
    console.log("Overpass Layer erstellt");
    initPopup(map);
    console.log("Popup aktiviert");

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
