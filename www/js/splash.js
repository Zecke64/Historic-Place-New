import {tr} from "./language.js";

let splashElement = null;

export function showSplashScreen() {

    if (splashElement)
        return;

    splashElement = document.createElement("div");
    splashElement.id = "splash-overlay";

    splashElement.innerHTML = `
        <div id="splash-window">

            <button id="splash-close"
                    type="button"
                    title="${tr("splash.close")}"
                    aria-label="${tr("splash.close")}">
                <img src="img/map_icons/close.svg" alt="">
            </button>

            <iframe
                src="splash.html"
                title="Willkommen">
            </iframe>

        </div>
    `;

    document.body.appendChild(splashElement);

    splashElement
        .querySelector("#splash-close")
        .addEventListener("click", closeSplashScreen);
}


function closeSplashScreen() {

    splashElement?.remove();
    splashElement = null;
}
