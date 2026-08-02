/*
 * utils.js
 *
 * Allgemeine Hilfsfunktionen
 */


/*
 * HTML-Sonderzeichen maskieren
 */

export function escapeHTML(text)
{
    return String(text)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;");
}



