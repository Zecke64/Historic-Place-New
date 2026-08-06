import { layerConfig } from "../../config/layerconf.js";
import { tr } from "./language.js";


export function createLayerControl(map)
{
    const control =
        document.createElement("div");

    control.className =
        "layer-control";


    createBaseSection(control, map);

    createOverlaySection(control, map);


    map.getContainer()
        .appendChild(control);
}



// noch benötigt?
/*
export function getLayers()
{
    //return layers;
    return layerConfig;
}
*/


// Basiskarten
function createBaseSection(parent, map)
{
    const section =
        document.createElement("div");

    section.className =
        "layer-section";


    section.appendChild(
        createHeading("Basiskarten")
    );


    for(const layer of layerConfig)
    {
        if(layer.category !== "base")
            continue;


        section.appendChild(
            createBaseEntry(
		layer,
		map
	    )
        );
    }


    parent.appendChild(section);
}


// Overlays
function createOverlaySection(parent, map)
{
    const section =
        document.createElement("div");

    section.className =
        "layer-section";


    section.appendChild(
        createHeading("Overlays")
    );


    for(const layer of layerConfig)
    {
        if(layer.category !== "overlay")
            continue;


        section.appendChild(
            createOverlayEntry(
		layer,
		map
            )
        );
    }


    parent.appendChild(section);
}



// eine Zeile erzeugen
function createOverlayEntry(layer, map)
{
    const row =
        document.createElement("div");

    row.className =
        "layer-row layer-overlay";


    const checkbox =
        document.createElement("input");

    checkbox.type =
        "checkbox";

    checkbox.checked =
        layer.visible;


    checkbox.addEventListener(
        "change",
        () =>
        {
            setLayerVisibility(
                map,
                layer,
                checkbox.checked
            );
        }
    );


    const label =
        document.createElement("span");

    label.textContent = tr(layer.titleKey);


    const slider = document.createElement("input");

    slider.type = "range";
    slider.min = 0;
    slider.max = 100;
    slider.value = Math.round(layer.opacity * 100);
    slider.className = "layer-opacity";

    slider.addEventListener(
        "input",
        () =>
        {
            const percent =
                slider.value;

            value.textContent =
                percent + "%";

            setLayerOpacity(
                map,
                layer,
                percent / 100
            );
        }
    );


    const value = document.createElement("span");

    value.className = "layer-opacity-value";
    value.textContent = Math.round(layer.opacity * 100) + "%";


    row.append(
        checkbox,
        label,
	slider,
	value
    );


    return row;
}



function setLayerVisibility(
    map,
    layer,
    visible
)
{

    console.log(
        "Set visibility OBJECT:",
        JSON.stringify(layer, null, 2)
    );

    console.log(
        "setLayerVisibility map:",
        map
    );

    console.log(
        "setLayerVisibility layer:",
        layer
    );

    console.log(
        "visible:",
        visible
    );

    for(const mapLayer of layer.mapLayers)
    {
        console.log(
            "   Map layer:",
            mapLayer.id,
            map.getLayer(mapLayer.id)
        );


        if(!map.getLayer(mapLayer.id))
        {
            console.warn(
                "Layer nicht gefunden:",
                mapLayer.id
            );

            continue;
        }


        map.setLayoutProperty(
            mapLayer.id,
            "visibility",
            visible
                ? "visible"
                : "none"
        );
    }
}



function setLayerOpacity(
    map,
    layer,
    opacity
)
{
    layer.opacity =
        opacity;


    for(const mapLayer of layer.mapLayers)
    {
        if(!map.getLayer(mapLayer.id))
            continue;


        switch(mapLayer.type)
        {
            case "raster":

                map.setPaintProperty(
                    mapLayer.id,
                    "raster-opacity",
                    opacity
                );

                break;


            case "fill":

                map.setPaintProperty(
                    mapLayer.id,
                    "fill-opacity",
                    opacity
                );

                break;


            case "line":

                map.setPaintProperty(
                    mapLayer.id,
                    "line-opacity",
                    opacity
                );

                break;


            case "circle":

                map.setPaintProperty(
                    mapLayer.id,
                    "circle-opacity",
                    opacity
                );

                break;


            case "symbol":

                map.setPaintProperty(
                    mapLayer.id,
                    "icon-opacity",
                    opacity
                );

                map.setPaintProperty(
                    mapLayer.id,
                    "text-opacity",
                    opacity
                );

                break;
        }
    }
}



function createHeading(text)
{
    const heading =
        document.createElement("div");

    heading.className =
        "layer-heading";

    heading.textContent =
        text;

    return heading;
}



function createBaseEntry(layer, map)
{
    const row =
        document.createElement("div");

    row.className =
        "layer-row layer-base";


    const radio =
        document.createElement("input");

    radio.type =
        "radio";

    radio.name =
        "base-layer";

    radio.checked =
        layer.visible;


    radio.addEventListener(
        "change",
        () =>
        {
            if(radio.checked)
            {
                setBaseLayer(
                    map,
                    layer
                );
            }
        }
    );


    const label =
        document.createElement("span");

    label.textContent =
        tr(layer.titleKey);


    row.append(
        radio,
        label
    );


    return row;
}



function setBaseLayer(map, selectedLayer)
{
    for(const layer of layerConfig)
    {
        if(layer.category !== "base")
            continue;


        const visible =
            layer.id === selectedLayer.id;


        layer.visible =
            visible;


        for(const mapLayer of layer.mapLayers)
        {
            if(!map.getLayer(mapLayer.id))
                continue;


            map.setLayoutProperty(
                mapLayer.id,
                "visibility",
                visible
                    ? "visible"
                    : "none"
            );
        }
    }
}
