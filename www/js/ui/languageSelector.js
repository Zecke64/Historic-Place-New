import
{
    getSupportedLanguages,
    getLanguage,
    setLanguage,
    tr
}
from "./language.js";


export function createLanguageSelector(container)
{
    const select =
        document.createElement("select");

    select.id =
        "language-selector";

    const languageNames =
    {
        de: "Deutsch",
        en: "English"
    };

    for(const language of getSupportedLanguages())
    {
        const option =
            document.createElement("option");

        option.value =
            language;

        option.textContent =
            languageNames[language] ??
            language;

        select.appendChild(option);
    }

    /*
     * Automatisch erkannte Sprache
     * als Vorauswahl setzen.
     */
    select.value =
        getLanguage();

    select.addEventListener(
        "change",
        () =>
        {
            setLanguage(
                select.value
            );
        }
    );

    container.appendChild(select);

    return select;
}
