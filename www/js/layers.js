/**
 * Verwaltung der Kartenlayer
 */

const layers = {};


/**
 * Rasterlayer hinzufügen
 */
export function addRasterLayer(map, options)
{
    const
    {
        id,
        title,
        tiles,
        opacity = 1,
        visible = true,
        group = "default"
    } = options;


    map.addSource(
        id + "-source",
        {
            type:"raster",
            tiles:tiles,
            tileSize:256
        }
    );


    map.addLayer(
        {
            id:id,

            type:"raster",

            source:id + "-source",

            layout:
            {
                visibility:
                    visible
                    ?
                    "visible"
                    :
                    "none"
            },

            paint:
            {
                "raster-opacity":
                    opacity
            }
        }
    );


    layers[id] =
    {
        id:id,
        title:title,
        group:group,
        opacity:opacity
    };

}



/**
 * Layerinformationen liefern
 */
export function getLayers()
{
    return layers;
}



/**
 * Sichtbarkeit ändern
 */
export function setLayerVisibility(
    map,
    id,
    visible
)
{
    map.setLayoutProperty(
        id,
        "visibility",
        visible
        ?
        "visible"
        :
        "none"
    );
}



/**
 * Transparenz ändern
 */
export function setLayerOpacity(
    map,
    id,
    opacity
)
{
    map.setPaintProperty(
        id,
        "raster-opacity",
        Number(opacity)
    );
}
