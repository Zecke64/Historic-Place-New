/**
 * Template Handling für Layer
 */

import {layerConfig, layerTemplates} from "../config/layerconf.js";

// layer config in template reinmergen
function deepMerge(base, override) {
    const result = {...base};

    for (const key of Object.keys(override)) {
        const value = override[key];

        if (value && typeof value === "object" && !Array.isArray(value) && base[key] &&
            typeof base[key] === "object" && !Array.isArray(base[key])) {
            result[key] = deepMerge(base[key], value);
        } else {
            result[key] = value;
        }
    }

    return result;
}

// template rekursiv auflösen
function resolveTemplate(templateName, stack = []) {
    if (stack.includes(templateName)) {
        throw new Error(
            `Zyklische Layer-Template-Vererbung: ${[...stack, templateName].join(" -> ")}`);
    }

    const template = layerTemplates[templateName];

    if (!template) {
        throw new Error(`Unbekanntes Layer-Template: ${templateName}`);
    }

    let result = {};

    if (template.extends) {
        result = resolveTemplate(template.extends, [...stack, templateName ]);
    }

    return deepMerge(result, template);
}

function createMapLayers(layer) {
    const result = [];

    if (layer.shape) {
        result.push({id : `${layer.id}-fill`, type : "fill"});

        result.push({id : `${layer.id}-outline`, type : "line"});
    }

    if (layer.source) {
        result.push({id : `${layer.id}-raster`, type : "raster"});
    }

    return result;
}

function resolveLayer(layer) {
    let result = {};

    if (layer.template) {
        result = resolveTemplate(layer.template);
    }

    result = deepMerge(result, layer);

    delete result.template;
    delete result.extends;

    result.mapLayers = createMapLayers(result);

    return result;
}

export const resolvedLayerConfig = layerConfig.map(resolveLayer);

console.log("RESOLVED LAYERS:", resolvedLayerConfig);

console.log("KLIVER:", resolvedLayerConfig.find(layer => layer.id === "kliver"));
