import {showSplashScreen} from "./splash.js";
import {tr} from "./language.js";

export function addControls(map) {

    // Zoom + Kompass
    map.addControl(new maplibregl.NavigationControl(), "top-left");

    // Maßstab
    map.addControl(new maplibregl.ScaleControl({maxWidth : 200, unit : "metric"}), "bottom-left");
}



export function createInfoControl(map) {

    const button = document.createElement("button");
    button.className = "map-control-button";
    button.id = "info-button";
    button.dataset.i18n = "button.info";
    button.title = tr("button.info");

    const icon = document.createElement("img");
    icon.src = "img/map_icons/info.svg";
    icon.alt = "Info";

    button.appendChild(icon);

    button.addEventListener("click", () => {
        showSplashScreen();
    });

    map.getContainer().appendChild(button);
}

