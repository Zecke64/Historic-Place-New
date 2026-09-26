
import {languages} from "../config/languages.js";

/*
 * Automatische Sprache des Browsers ermitteln.
 *
 * Beispiele:
 *   de-DE -> de
 *   en-US -> en
 *
 * Unterstützte Sprachen werden direkt aus
 * config/languages.js übernommen.
 *
 * Falls keine passende Sprache gefunden wird:
 *   Englisch als Fallback.
 */
function detectLanguage() {
    const browserLanguages =
        navigator.languages?.length ? navigator.languages : [ navigator.language ];

    for (const browserLanguage of browserLanguages) {
        const language = browserLanguage.toLowerCase().split("-")[0];

        if (languages[language])
            return language;
    }

    return "en";
}

/*
 * Aktuelle Sprache.
 *
 * Beim Start automatisch aus der
 * Browsersprache ermittelt.
 */
let currentLanguage = detectLanguage();

/*
 * Sprache setzen.
 */
export function setLanguage(language) {
    if (!languages[language])
        return;

    if (currentLanguage === language)
        return;

    currentLanguage = language;

    /*
     * Alle UI-Komponenten über den
     * Sprachwechsel informieren.
     */
    window.dispatchEvent(new Event("languagechange"));
}

/*
 * Aktuelle Sprache zurückgeben.
 */
export function getLanguage() { return currentLanguage; }

/*
 * Unterstützte Sprachen zurückgeben.
 */
export function getSupportedLanguages() { return Object.keys(languages); }

/*
 * Übersetzung eines Schlüssels.
 *
 * Falls kein Schlüssel existiert,
 * wird der Schlüssel selbst zurückgegeben.
 */

//export function tr(key) { return languages[currentLanguage]?.[key] ?? key; }

export function tr(key) {

    // 1. Aktuell ausgewählte Sprache
    if (languages[currentLanguage]?.[key] !== undefined)
        return languages[currentLanguage][key];

    // 2. Englisch als Fallback
    if (languages.en?.[key] !== undefined)
        return languages.en[key];

    // 3. Erste Sprache, die den Key enthält
    for (const language of Object.keys(languages)) {
        if (languages[language]?.[key] !== undefined)
            return languages[language][key];
    }

    // 4. Key selbst als letzter Fallback
    return key;
}


/*
 * Alle mit data-i18n markierten
 * Elemente aktualisieren.
 */

export function updateLanguage() {

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const text = tr(element.dataset.i18n);

        if (element.hasAttribute("placeholder")) {
            element.placeholder = text;
        }
        else if (element.hasAttribute("title")) {
            element.title = text;
        }
        else {
            element.textContent = text;
        }
    });
}
