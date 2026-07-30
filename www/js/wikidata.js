export async function loadWikidata(id)
{

    if(!id)
        return null;


    const url =
        "https://www.wikidata.org/w/api.php?" +
        new URLSearchParams(
        {
            action:"wbgetentities",
            ids:id,

            format:"json",

            languages:"de|en",

            props:
            "labels|descriptions|claims|sitelinks",

            origin:"*"
        });



    try
    {

        const response =
            await fetch(url);


        const data =
            await response.json();


        const entity =
            data.entities[id];


        if(!entity)
            return null;



        return {

            id:id,


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
                ),


            wikipedia:
                getWikipedia(
                    entity
                ),


            website:
                getWebsite(
                    entity
                )

        };

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

    if(!obj)
        return null;


    return (
        obj.de?.value ||
        obj.en?.value ||
        null
    );

}






function getImage(entity)
{

    const claim =
        entity.claims?.P18?.[0];


    const value =
        claim
        ?.mainsnak
        ?.datavalue
        ?.value;


    if(!value)
        return null;


    return (
        "https://commons.wikimedia.org/wiki/Special:FilePath/" +
        encodeURIComponent(value)
    );

}







function getWikipedia(entity)
{

    const links =
        entity.sitelinks;


    if(!links)
        return null;



    if(links.dewiki)
    {
        return (
            "https://de.wikipedia.org/wiki/" +
            encodeURIComponent(
                links.dewiki.title
            )
        );
    }



    if(links.enwiki)
    {
        return (
            "https://en.wikipedia.org/wiki/" +
            encodeURIComponent(
                links.enwiki.title
            )
        );
    }


    return null;

}







function getWebsite(entity)
{

    const claim =
        entity.claims?.P856?.[0];


    return (
        claim
        ?.mainsnak
        ?.datavalue
        ?.value
        ||
        null
    );

}
