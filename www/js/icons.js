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
            return rule.icon;
    }

    return "poi";
}



/*
export function getIcon(tags)
{
    if(tags.heritage === "1")
        return "wke";

    if(tags.cemetery === "war_cemetery" || tags.tomb === "war_grave")
        return "war_cemetery";

    if(tags.building === "bunker" || tags.military === "bunker")
        return "bunker";

    if(tags.historic === "boundary_stone" || tags.boundary === "marker")
            return "historic_boundary_stone";

    if(tags.historic === "tower" || tags.building === "tower" || tags.man_made === "tower")
            return "turm";

    if(tags.man_made === "adit" || tags.man_made === "cellar_entrance")
        return "stollen";

    if(tags.man_made === "mineshaft" || tags.historic === "mineshaft")
        return "mine";

    if(tags.historic === "wayside_cross")
        return "cross";

    if(tags.tourism === "museum")
        return "museum";

    if(tags.tourism != null)
        return "null";

    if(tags.historic === "castle")
        return "castle";

    if(tags.amenity === "place_of_worship")
        return "church";

    if(tags.historic === "industrial")
        return "industrial";

    if(tags.amenity === "graveyard")
        return "cemetery";

    return "poi";

}
*/



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
                await map.loadImage(
                    `img/${icon}.png`
                );


            if (!map.hasImage(icon))
            {
                map.addImage(
                    icon,
                    image.data
                );
            }


            console.log(
                "Icon geladen:",
                icon
            );

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

