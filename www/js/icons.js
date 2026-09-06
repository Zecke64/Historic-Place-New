import {iconRules, defaultStyle} from "../config/icons.js";


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

    return { ...defaultStyle };
}



function applyZoomStyle(rule, zoom) {
    const style = {
        ...defaultStyle,
        ...rule
    };

    delete style.match;
    delete style.condition;
    delete style.zoom;

    if (rule.zoom) {
        const levels = Object.keys(rule.zoom)
            .map(Number)
            .filter(level => level <= zoom)
            .sort((a, b) => a - b);

        for (const level of levels) {
            Object.assign(style, rule.zoom[level]);
        }
    }

    //console.log("ZOOM STYLE", zoom, rule.icon, style.icon);
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


/*
export function getIconRotation(tags) {
    const direction = parseFloat(tags?.direction);

    return Number.isFinite(direction) ? direction : 0;
}
*/
