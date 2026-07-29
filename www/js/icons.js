/**
 * Auswahl der POI-Symbole
 */


export function getIcon(tags)
{

    if(tags.tourism === "museum")
    {
        return "museum";
    }


    if(tags.amenity === "place_of_worship")
    {
        return "church";
    }


    if(tags.historic === "castle" ||
       tags.historic === "fort")
    {
        return "castle";
    }


    if(tags.industrial ||
       tags.man_made === "works")
    {
        return "industrial";
    }


    return "poi";

}


export async function loadIcons(map)
{

    const icons =
    [
        "poi",
        "museum",
        "church",
        "castle",
        "industrial"
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

