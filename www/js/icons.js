import {
    iconRules, 
    defaultStyle,
    invisibleStyle
} from "../config/icons.js";


// AND/OR Logik in den Icon conditions
function evaluateCondition(condition, tags) {
    // Einzelne Bedingung: ["amenity", "prison"]
    if (Array.isArray(condition)) {
        const [key, value] = condition;

        return value === "*" ? tags[key] !== undefined : tags[key] === value;
    }

    // AND
    if (condition.type === "AND") {
        return condition.conditions.every(subCondition => evaluateCondition(subCondition, tags));
    }

    // OR
    if (condition.type === "OR") {
        return condition.conditions.some(subCondition => evaluateCondition(subCondition, tags));
    }

    return false;
}



export function getIconRule(tags, zoom) {
    for (const rule of iconRules) {
        if (rule.condition) {
            if (evaluateCondition(rule.condition, tags))
                return applyZoomStyle(rule, zoom);
        }
        else if (rule.match) {
            const matches = rule.match.some(
                ([key, value]) =>
                    value === "*"
                        ? tags[key] !== undefined
                        : tags[key] === value
            );

            if (matches)
                return applyZoomStyle(rule, zoom);
        }
    }

    return { ...invisibleStyle };
}



function applyZoomStyle(rule, zoom) {

    if (zoom < (rule.minZoom ?? 0))
        return { ...invisibleStyle };

    const style = {
        ...defaultStyle,
        ...rule
    };

    delete style.match;
    delete style.condition;
    delete style.zoom;
    delete style.minZoom;

    // bei der Rule werden explizit zoom-abhängige settings gemacht
    if (rule.zoom) {
        const levels = Object.keys(rule.zoom)
            .map(Number)
            .filter(level => level <= zoom)
            .sort((a, b) => a - b);
        // die für die rule relevanten zoomlevels sind jetzt ermittelt und aufsteigend sortiert

        // kein relevanter zoomlevel in den rules --> Objekt unsichtbar
        if (levels.length === 0)
            return { ...invisibleStyle };

        // jetzt werden die rules von kleinem bis zu <= zoom angewendet
        for (const level of levels) {
            Object.assign(style, rule.zoom[level]);
        }
    }

    return style;
}



export async function loadIcons(map) {

    const response = await fetch("img/icons.json");
    const icons = await response.json();

    for (const icon of icons) {

        try {
            const image = await map.loadImage(`img/poi_icons/${icon}.png`);

            if (!map.hasImage(icon)) {
                map.addImage(icon, image.data);
            }
        } catch (error) {
            console.error("Fehler beim Laden von", icon, error);
        }
    }
}

