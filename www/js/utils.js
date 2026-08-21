/*
 * utils.js
 *
 * Allgemeine Hilfsfunktionen
 */

/*
 * HTML-Sonderzeichen maskieren
 */

export function escapeHTML(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

export function cleanCommonsHTML(html) {
    if (!html)
        return "";

    return html.replace(/href="\/\//g, 'href="https://')
        .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '<a href="$1" target="_blank">$2</a>')
        .replace(/<[^>]+>/g, function(tag) {
            if (tag.startsWith("<a "))
                return tag;

            if (tag.startsWith("</a>"))
                return tag;

            return "";
        });
}

export function stripHTML(html) {
    if (!html)
        return "";

    return String(html).replace(/<[^>]*>/g, "").trim();
}

export function normalizeTags(tags) {
    const result = {...tags};

    const lifecyclePrefixes = [ "disused", "abandoned", "razed" ];

    for (const key of Object.keys(tags)) {
        const parts = key.split(":");

        if (parts.length < 2)
            continue;

        const baseKey = parts[parts.length - 1];

        const prefixes = parts.slice(0, -1);

        // Nur bekannte Lifecycle-Präfixe berücksichtigen
        if (!prefixes.every(prefix => lifecyclePrefixes.includes(prefix))) {
            continue;
        }

        /*
         * Aus
         *
         * disused:man_made=mineshaft
         *
         * wird
         *
         * man_made=mineshaft
         * disused=yes
         */

        if (result[baseKey] === undefined) {
            result[baseKey] = tags[key];
        }

        for (const prefix of prefixes) {
            result[prefix] = "yes";
        }
    }

    return result;
}
