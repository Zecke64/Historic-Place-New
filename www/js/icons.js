import {iconRules} from "../config/icons.js";

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

export async function loadIcons(map) {

    const response = await fetch("img/icons.json");
    const icons = await response.json();

    for (const icon of icons) {
        console.log("Lade Icon:", icon);

        try {
            const image = await map.loadImage(`img/poi_icons/${icon}.png`);

            if (!map.hasImage(icon)) {
                map.addImage(icon, image.data);
            }

            console.log("Icon geladen:", icon);

        } catch (error) {
            console.error("Fehler beim Laden von", icon, error);
        }
    }
}
