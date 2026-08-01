const wikidataCache = new Map();
const prefetchQueue = [];

let running = 0;

const MAX_PARALLEL = 3;


export async function loadWikidata(id)
{

    if(!id)
        return null;

    // Bereits geladen?
    if (wikidataCache.has(id))
    {
        console.log("Wikidata aus Cache:", id);
        return wikidataCache.get(id);
    }
    console.log("Wikidata vom Server:", id);

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

        /*
         * Erst Wikipedia-Link ermitteln,
         * danach Extract laden
         */

        const wikipedia =
            getWikipedia(
                entity
            );


        const extract =
            await getWikipediaExtract(
                wikipedia
            );


        const result = {

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
                wikipedia,
            website:
                getWebsite(
                    entity
                ),
	    extract:
                shorten(
                    extract
                )
        };

        wikidataCache.set(id, result);

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


/*

async function getWikipediaExtract(url)
{
    if(!url)
        return null;

    try
    {
        const u =
            new URL(url);
        const language =
            u.hostname.split(".")[0];
        const title =
            decodeURIComponent(
                u.pathname.replace("/wiki/","")
            );
        const api =
            `https://${language}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
        const response =
            await fetch(api);
        if(!response.ok)
            return null;
        const json =
            await response.json();

        return json.extract;
    }

    catch(error)
    {
        return null;
    }
}
*/



export function prefetchWikidata(ids)
{
    for(const id of ids)
    {
        if(!id)
            continue;
        if(wikidataCache.has(id))
            continue;
        if(prefetchQueue.includes(id))
            continue;

        prefetchQueue.push(id);
    }

    processQueue();
}


async function processQueue()
{
    while(
        running < MAX_PARALLEL &&
        prefetchQueue.length
    )
    {
        const id =
            prefetchQueue.shift();
        running++;
        loadWikidata(id)
            .finally(
                () =>
                {
                    running--;
                    processQueue();
                }
            );
    }

}


async function getWikipediaExtract(url)
{
    if(!url)
        return null;


    try
    {
        const u =
            new URL(url);


        const language =
            u.hostname.split(".")[0];


        const title =
            decodeURIComponent(
                u.pathname
                .replace("/wiki/","")
            );


        const api =
            `https://${language}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;


        const response =
            await fetch(api);


        if(!response.ok)
            return null;


        const json =
            await response.json();


        return json.extract;

    }

    catch(error)
    {
        console.error(
            "Wikipedia Extract Fehler:",
            error
        );

        return null;
    }
}



function shorten(text, max=500)
{
    if(!text)
        return null;


    if(text.length <= max)
        return text;


    return (
        text.substring(0,max) +
        "…"
    );
}
