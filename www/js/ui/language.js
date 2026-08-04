import
{
    languages
}
from "../config/languages.js";


let currentLanguage =
    "de";


export function setLanguage(language)
{
    currentLanguage =
        language;
}


export function tr(key)
{
    return languages[currentLanguage]?.[key]
        ?? key;
}
