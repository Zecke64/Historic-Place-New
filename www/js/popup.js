/**
 * Popup für OSM-POIs
 */


export function initPopup(map)
{

    map.on(
        "click",
        "osm-pois",
        event =>
        {

            const feature =
                event.features[0];


            const props =
                feature.properties;


            const html =
                createPopupHTML(
                    props
                );


            new maplibregl.Popup()

                .setLngLat(
                    event.lngLat
                )

                .setHTML(
                    html
                )

                .addTo(map);

        }
    );


    // Mauszeiger ändern

    map.on(
        "mouseenter",
        "osm-pois",
        () =>
        {
            map.getCanvas()
               .style.cursor =
               "pointer";
        }
    );


    map.on(
        "mouseleave",
        "osm-pois",
        () =>
        {
            map.getCanvas()
               .style.cursor =
               "";
        }
    );

}



/**
 * HTML erzeugen
 */
function createPopupHTML(tags)
{

    let html =
    `
    <div class="popup">

    <h3>
    ${tags.name || "Unbenanntes Objekt"}
    </h3>
    `;


    if(tags.image)
    {
        html +=
        `
        <p>
        <a href="${tags.image}"
           target="_blank">
           Bild
        </a>
        </p>
        `;
    }


    if(tags.wikipedia)
    {
        html +=
        `
        <p>
        <a href="https://www.wikipedia.org/wiki/${encodeURIComponent(tags.wikipedia.replace(":", "/"))}"
           target="_blank">
           Wikipedia
        </a>
        </p>
        `;
    }


    if(tags.wikidata)
    {
        html +=
        `
        <p>
        <a href="https://www.wikidata.org/wiki/${tags.wikidata}"
           target="_blank">
           Wikidata
        </a>
        </p>
        `;
    }


    html +=
    "<hr>";



    html +=
    "<table>";



    Object.keys(tags)
    .forEach(
        key =>
        {

            html +=
            `
            <tr>
            <td><b>${key}</b></td>
            <td>${tags[key]}</td>
            </tr>
            `;

        }
    );



    html +=
    `
    </table>
    </div>
    `;


    return html;

}
