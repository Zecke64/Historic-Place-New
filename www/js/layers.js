/**
 * Verwaltung der Kartenlayer
 */

import { layerConfig } from "../config/layerconf.js";
// import { initOverpassLayer } from "./overpass.js";

const layers = {};
const layerRegistry = {};
const layerState = {};

export async function initLayerManager(map)
{
    for(const layer of layerConfig)
    {
	layerRegistry[layer.id] = layer;

	layerState[layer.id] =
        {
            visible: layer.visible
        };

        if(
            layer.source &&
            layer.source.type === "raster"
        )
        {
            addRasterLayer( map, layer);
        }

        if(layer.shape)
        {
            await addGeoJsonLayer( map, layer);
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
                visibility: visible ?  "visible" : "none"
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
    };

}


export async function addGeoJsonLayer(map, options)
{
    const
    {
        id,
        shape,
        mapLayers,
	visible = true
    } = options;

    if(!shape || shape.type !== "geojson")
    {
        return;
    }

    const sourceId = id + "-shape-source";

    map.addSource(
        sourceId,
        {
            type:"geojson",
            data:shape.url
        }
    );

    for(const mapLayer of mapLayers)
    {
        if(
            mapLayer.type !== "fill" &&
            mapLayer.type !== "line"
        )
        {
            continue;
        }

        const layer =
        {
            id:mapLayer.id,
            type:mapLayer.type,
            source:sourceId,
	    layout:
            {
                visibility: visible ? "visible" : "none"
            }
        };

        if(mapLayer.type === "fill")
        {
            layer.paint =
            {
                "fill-opacity": options.shape?.style?.fillOpacity ?? 0.3
            };
        }

        if(mapLayer.type === "line")
        {
            layer.paint =
            {
                "line-width":2,
		"line-opacity": options.shape?.style?.lineOpacity ?? 1
            };
        }

        map.addLayer(layer);
    }
}




export function updateLayerVisibility(map)
{
    const zoom = map.getZoom();

    for(const layer of layerConfig)
    {
        for(const mapLayer of layer.mapLayers)
        {
            let visible = false;

            if(layer.visible)
            {
                if(mapLayer.type === "fill" ||
                   mapLayer.type === "line")
                {
                    visible =
                        zoom >= layer.display.overview.minZoom &&
                        zoom < layer.display.detail.minZoom;
                }

                if(mapLayer.type === "raster")
                {
                    visible =
                        zoom >= layer.display.detail.minZoom;
                }

		if(layer.type === "poi")
		{
    	  	    visible = layer.visible && zoom >= layer.display.overview.minZoom;
		}
            }

            if(map.getLayer(mapLayer.id))
            {
                map.setLayoutProperty(
                    mapLayer.id,
                    "visibility",
                    visible ? "visible" : "none"
                );
            }
        }
    }
}


export function initZoomHandling(map)
{
    map.on(
        "zoom",
        () =>
        {
            updateLayerVisibility(map);
        }
    );
}


