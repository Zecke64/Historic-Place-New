import {getLanguage, getSupportedLanguages, setLanguage, tr, updateLanguage} from "./language.js";

export function createLanguageSelector() {

    const languageContainer = document.createElement("div");
    languageContainer.className = "language-selector-container";
    document.body.appendChild(languageContainer);

    const button = document.createElement("button");
    button.id = "language-button";
    button.className = "map-control-button";
    button.dataset.i18n = "button.language"
    button.title = tr("button.language");

    const icon = document.createElement("img");
    icon.src = "img/map_icons/language.svg";
    icon.alt = "Sprache";
    button.appendChild(icon);

    const panel = document.createElement("div");

    panel.id = "language-control";
    panel.style.display = "none";

    const flagFiles = {de : "de.svg", en : "gb.svg", cs : "cs.svg", fr : "fr.svg", da : "da.svg", es : "es.svg", kl : "kl.svg", gl : "gl.svg", hu : "hu.svg", it : "it.svg", ja : "ja.svg", ko : "ko.svg", nl : "nl.svg",
        pl : "pl.svg", pt : "pt.svg", br : "pt-Br.svg", ro : "ro.svg", ru : "ru.svg", tr : "tr.svg", uk : "uk.svg", gr : "gr.svg", il : "il.svg", sv : "sv.svg"};

    for (const language of getSupportedLanguages()) {

        const option = document.createElement("div");
        option.className = "language-option";

        const flag = document.createElement("img");
        flag.className = "language-flag";
        flag.src = "img/flags/" + language + ".svg"
        flag.alt = language.toUpperCase();

        const code = document.createElement("span");
        code.className = "language-code";
        code.textContent = language.toUpperCase();

        option.appendChild(flag);
        option.appendChild(code);

        option.addEventListener("click", () => {
            setLanguage(language);
            panel.style.display = "none";
            updateLanguage();
        });

        panel.appendChild(option);
    }

    button.addEventListener(
        "click",
        () => { panel.style.display = panel.style.display === "none" ? "block" : "none"; });

    const map = languageContainer.parentElement;
    map.appendChild(button);
    map.appendChild(panel);

    return {button, panel};
}
