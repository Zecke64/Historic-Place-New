import {zoomClassDefaults, zoomClasses} from "../config/zoomclasses.js";

function resolveZoomClass(zoomClass) {
    const defaults = {...zoomClassDefaults, ...(zoomClass.defaults || {})};

    return {
        ...zoomClass,

        groups : zoomClass.groups.map(group => ({...defaults, ...group}))
    };
}

export const resolvedZoomClasses = zoomClasses.map(resolveZoomClass);
