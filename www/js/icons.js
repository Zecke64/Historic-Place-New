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


// Icon aus den iconrules bestimmen
export function getIcon(tags) {
    return getIconRule(tags).icon;
}

/*
export function getIcon(tags) {
    for (const rule of iconRules) {
        // neue Syntax mit condition:
        if (rule.condition) {
            if (evaluateCondition(rule.condition, tags))
                return rule.icon;
        }
        // alte Syntx: OR
        else if (rule.match) {
            const matches = rule.match.some(
                ([ key, value ]) => value === "*" ? tags[key] !== undefined : tags[key] === value);

            if (matches)
                return rule.icon;
        }
    }

    return "null";
}
*/


export function getIconRule(tags) {
    for (const rule of iconRules) {
        if (rule.condition) {
            if (evaluateCondition(rule.condition, tags))
                return rule;
        }
        else if (rule.match) {
            const matches = rule.match.some(
                ([key, value]) =>
                    value === "*"
                        ? tags[key] !== undefined
                        : tags[key] === value
            );

            if (matches)
                return rule;
        }
    }

    return {
        icon : "null"
    };
}


export function getIconStyle(tags) {
    for (const rule of iconRules) {

        let matches = false;

        // Neue Syntax mit condition
        if (rule.condition) {
            matches = evaluateCondition(rule.condition, tags);
        }

        // Alte Syntax mit match
        else if (rule.match) {
            matches = rule.match.some(
                ([ key, value ]) =>
                    value === "*"
                        ? tags[key] !== undefined
                        : tags[key] === value
            );
        }

        if (matches) {
            return {
                icon : rule.icon,
                iconSize : rule.iconSize,
                lineWidth : rule.lineWidth,
                lineColor : rule.lineColor,
                fillColor : rule.fillColor,
                fillOpacity : rule.fillOpacity
            };
        }
    }

    return {
        icon : "null",
        iconSize : undefined,
        lineWidth : undefined,
        lineColor : undefined,
        fillColor : undefined,
        fillOpacity : undefined
    };
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
