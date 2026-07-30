export async function loadWikidata(id)
{
    if (!id)
        return null;


    const url =
        "https://www.wikidata.org/w/api.php?" +
        new URLSearchParams(
        {
            action: "wbgetentities",
            ids: id,
            format: "json",
            languages: "de|en",
            props: "labels|descriptions|claims",
            origin: "*"
        });


    try
    {
        const response =
            await fetch(url);


        const data =
            await response.json();


        const entity =
            data.entities[id];


        if (!entity)
            return null;


        let result =
        {
            label:
                getLanguageValue(
                    entity.labels
                ),

            description:
                getLanguageValue(
                    entity.descriptions
                ),

            image:
                getImage(
                    entity
                )
        };


        return result;

    }

    catch(error)
    {
        console.error(
            "Wikidata Fehler:",
            error
        );

        return null;
    }
}



function getLanguageValue(obj)
{
    if (!obj)
        return null;


    return (
        obj.de?.value ||
        obj.en?.value ||
        null
    );
}



function getImage(entity)
{
    const claims =
        entity.claims;


    if (!claims || !claims.P18)
        return null;


    const value =
        claims.P18[0]
        ?.mainsnak
        ?.datavalue
        ?.value;


    if (!value)
        return null;


    return createCommonsUrl(value);
}



function createCommonsUrl(filename)
{
    return (
        "https://commons.wikimedia.org/wiki/Special:FilePath/" +
        encodeURIComponent(filename)
    );
}
