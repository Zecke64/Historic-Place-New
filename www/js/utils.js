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



export function cleanCommonsHTML(html)
{
    if(!html)
        return "";


    return html
        .replace(
            /href="\/\//g,
            'href="https://'
        )
        .replace(
            /<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi,
            '<a href="$1" target="_blank">$2</a>'
        )
        .replace(
            /<[^>]+>/g,
            function(tag)
            {
                if(tag.startsWith("<a "))
                    return tag;

                if(tag.startsWith("</a>"))
                    return tag;

                return "";
            }
        );
}



export function stripHTML(html)
{
    if(!html)
        return "";

    return String(html)
        .replace(/<[^>]*>/g, "")
        .trim();
}
