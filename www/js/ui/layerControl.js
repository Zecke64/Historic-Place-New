import { layers } from "../config/layers.js";
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
export function getLayers()
{
    return layers;
}


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


    for(const layer of layers)
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


    for(const layer of layers)
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

    label.textContent =
        tr(layer.titleKey);


    row.append(
        checkbox,
        label
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
        "Set visibility:",
        layer.id,
        visible,
        layer.mapLayers
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
    for(const layer of layers)
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
