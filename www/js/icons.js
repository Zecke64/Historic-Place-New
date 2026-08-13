import { iconRules } from "../config/icons.js";


// anhand der config die Icons bestimmen
export function getIcon(tags)
{
    for(const rule of iconRules)
    {
        const matches =
            rule.match.some(
                ([key, value]) =>
                    tags[key] === value ||
                    value === "*"
            );

        if(matches)
        {
            return rule.icon;
        }
    }

    return "poi";
}




export async function loadIcons(map)
{

    const icons =
    [
        "poi",
	"null",
        "museum",
        "church",
        "castle",
        "industrial",
	"cross",
	"mine",
	"stollen",
	"wke",
	"war_cemetery",
	"bunker",
	"historic_boundary_stone",
	"turm"
    ];


    for (const icon of icons)
    {
        console.log("Lade Icon:", icon);

        try
        {
            const image =
                await map.loadImage( `img/${icon}.png`);

            if (!map.hasImage(icon))
            {
                map.addImage( icon, image.data);
            }

            console.log( "Icon geladen:", icon);

        }
        catch(error)
        {
            console.error(
                "Fehler beim Laden von",
                icon,
                error
            );
        }

    }

}

