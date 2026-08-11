import
{
    getSupportedLanguages,
    getLanguage,
    setLanguage
}
from "./language.js";


export function createLanguageSelector(container)
{
    const button =
        document.createElement("button");

    button.id =
        "language-button";

    button.className =
        "map-control-button";

    const icon = document.createElement("img");
    icon.src = "img/icons/language.svg";
    icon.alt = "Sprache";
    button.appendChild(icon);

    const panel =
        document.createElement("div");

    panel.id =
        "language-control";

    panel.style.display =
        "none";

    const flagFiles = {
        de: "de.svg",
        en: "gb.svg"
    };


    for(const language of getSupportedLanguages())
    {
        const option =
            document.createElement("div");

        option.className =
            "language-option";

        const flag =
            document.createElement("img");

        flag.className =
            "language-flag";

	flag.src =
            "img/flags/" +
            flagFiles[language];

        flag.alt =
            language.toUpperCase();

        const code =
            document.createElement("span");

        code.className =
            "language-code";

        code.textContent =
            language.toUpperCase();


 	option.appendChild(flag);
	option.appendChild(code);


        option.addEventListener(
            "click",
            () =>
            {
                setLanguage(language);

                panel.style.display =
                    "none";

                updateLanguage();
            }
        );


        panel.appendChild(option);
    }


    button.addEventListener(
        "click",
        () =>
        {
            panel.style.display =
                panel.style.display === "none"
                    ? "block"
                    : "none";
        }
    );


    const map = container.parentElement;
    map.appendChild(button);
    map.appendChild(panel);


    return {
        button,
        panel
    };
}



