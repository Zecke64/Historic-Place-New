console.log("GeoJSON-Geometrietypen:", features.reduce((result, feature) => {
    const type = feature.geometry?.type;

    result[type] = (result[type] || 0) + 1;

    return result;
}, {}));
