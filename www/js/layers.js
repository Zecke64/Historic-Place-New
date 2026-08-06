/**
 * Verwaltung der Kartenlayer
 */

import { layerConfig } from "../config/layerconf.js";

console.log(
    "Layer-Konfiguration:",
    layerConfig
);

const layers = {};

export function initLayerManager(map)
{
    for(const layer of layerConfig)
    {
        console.log(
            "Init Layer:",
            layer.id,
            layer.source?.type
        );

        if(
            layer.source &&
            layer.source.type === "raster"
        )
        {
            addRasterLayer(
                map,
                layer
            );
        }
    }
}

/**
 * Rasterlayer hinzufügen
 */
export function addRasterLayer(map, options)
{
    console.log(
        "addRasterLayer options:",
        options
    );

    const
    {
        id,
        source,
        opacity = 1,
        visible = true
    } = options;

    const
    {
        tiles,
        tileSize = 256
    } = source;

    const mapLayer = options.mapLayers.find( l => l.type === "raster");
    if(!mapLayer)
    {
        console.warn(
            "Kein Raster MapLayer:",
            options.id
        );
    
        return;
    }

    map.addSource(
        mapLayer.id + "-source",
        {
            type:"raster",
            tiles:tiles,
            tileSize:tileSize
        }
    );


    map.addLayer(
        {
            id:mapLayer.id,
            type:"raster",
            source:mapLayer.id + "-source",
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
        titleKey:options.titleKey,
        category:options.category,
        opacity:opacity
/*
        id:id,
        title:title,
        group:group,
        opacity:opacity
*/
    };

}



/**
 * Layerinformationen liefern
 */
/*
export function getLayers()
{
    return layerConfig;
}
*/



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
