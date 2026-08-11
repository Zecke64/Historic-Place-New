import { layerConfig } from "../../config/layerconf.js";
import { tr } from "./language.js";
import { updateLayerVisibility } from "../layers.js";


let activeCredits = [];
let creditElement = null;



export function createLayerControl(map)
{
    const control = document.createElement("div");
    control.className = "layer-control";

    createBaseSection(control, map);
    createOverlaySection(control, map);
    createHistObjSection(control, map);

    creditElement = document.createElement("div");
    creditElement.id = "map-credits";
    map.getContainer().appendChild( creditElement);

    map.getContainer().appendChild(control);

    activeCredits = [];

    for(const layer of layerConfig)
    {
        if(!layer.visible)
            continue;
        if(!layer.credit)
            continue;
        activeCredits.push( layer.id);
    }

    updateLayerCredits();

}


// Basiskarten
function createBaseSection(parent, map)
{
    const section = document.createElement("div");
    section.className = "layer-section";
    section.appendChild( createHeading("Basiskarten"));

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
    const section = document.createElement("div");
    section.className = "layer-section";
    section.appendChild( createHeading("Overlays"));

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



// Historische Objekte
function createHistObjSection(parent, map)
{
    const section = document.createElement("div");
    section.className = "layer-section";

    section.appendChild( 
	createHeading( tr("layer.historicalObjects") )
    );

    for(const layer of layerConfig)
    {
        if(layer.category !== "hist-objects")
            continue;

        section.appendChild( createOverlayEntry( layer, map)); }

    parent.appendChild(section);
}



function createOpacityControl(layer, map)
{
    if(layer.opacityControl === false)
        return null;

    const container = document.createElement("span");
    const slider = document.createElement("input");

    container.className = "layer-opacity-container";
    slider.type = "range";
    slider.min = 0;
    slider.max = 100;
    slider.value = Math.round(layer.opacity * 100);
    slider.className = "layer-opacity";

    const value = document.createElement("span");

    value.className = "layer-opacity-value";
    value.textContent = Math.round(layer.opacity * 100) + "%";

    slider.addEventListener(
        "input",
        () =>
        {
            const percent = slider.value;
            value.textContent = percent + "%";
            setLayerOpacity(
                map,
                layer,
                percent / 100
            );
        }
    );

    container.append( slider, value);

    return container;
}



// eine Zeile erzeugen
function createOverlayEntry(layer, map)
{
    const { row, label } = createLayerRow( layer, "layer-base");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = layer.visible;

    checkbox.addEventListener(
        "change",
        () =>
        {
	    layer.visible = checkbox.checked;

            if(layer.visible)
            {
                activeCredits = activeCredits.filter( id => id !== layer.id);
                activeCredits.push( layer.id);
            }
            else
            {
                activeCredits = activeCredits.filter( id => id !== layer.id);
            }

	    updateLayerVisibility( map);
	    updateLayerCredits();
        }
    );

    const opacityControl = createOpacityControl( layer, map);
    row.append( checkbox, label);
    if(opacityControl)
    {
        row.append( opacityControl);
    }

    return row;
}




function setLayerOpacity(
    map,
    layer,
    opacity
)
{
    layer.opacity = opacity;


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

	    // Shapes haben immer eine fixe Transparenz
            case "fill":
            case "line":
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
    const heading = document.createElement("div");
    heading.className = "layer-heading";
    heading.textContent = text;

    return heading;
}




function createLayerRow(layer, className)
{
    const row = document.createElement("div");
    row.className = "layer-row " + className;

    const label = document.createElement("span");

    label.dataset.i18n =
        layer.titleKey;

    label.textContent =
        tr(layer.titleKey);

    return { row, label };
}



function createBaseEntry(layer, map)
{
    const { row, label } = createLayerRow( layer, "layer-base");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "base-layer";
    radio.checked = layer.visible;

    radio.addEventListener(
        "change",
        () =>
        {
            if(radio.checked)
            {
                setBaseLayer( map, layer);
            }
        }
    );

    const opacityControl = createOpacityControl( layer, map);

    row.append( radio, label);

    if(opacityControl)
    {
        row.append( opacityControl);
    }

    return row;
}



function setBaseLayer(map, selectedLayer)
{
    for(const layer of layerConfig)
    {
        if(layer.category !== "base")
            continue;

        const visible = layer.id === selectedLayer.id;
        layer.visible = visible;

        for(const mapLayer of layer.mapLayers)
        {
            if(!map.getLayer(mapLayer.id))
                continue;

            map.setLayoutProperty(
                mapLayer.id,
                "visibility",
                visible ? "visible" : "none"
            );
        }
    }

    activeCredits =
        activeCredits.filter(
            id =>
            !layerConfig.some(
                layer =>
                    layer.category === "base" &&
                    layer.id === id
            )
        );

    activeCredits.push(
        selectedLayer.id
    );

    updateLayerCredits();
}



function updateLayerCredits()
{
    if(!creditElement)
        return;

    const credits = [];

    for(const layerId of activeCredits)
    {
        const layer =
            layerConfig.find( layer => layer.id === layerId);

        if(!layer)
            continue;

        if(!layer.credit)
            continue;

        credits.push(layer.credit);
    }

    creditElement.innerHTML = credits.join(" | ");
}
