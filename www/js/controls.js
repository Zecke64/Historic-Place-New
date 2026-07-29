/**
 * Kartensteuerungen
 */

export function addControls(map)
{

    // Zoom + Kompass
    map.addControl(
        new maplibregl.NavigationControl(),
        "top-left"
    );


    // Maßstab
    map.addControl(
        new maplibregl.ScaleControl(
        {
            maxWidth: 200,
            unit: "metric"
        }),
        "bottom-left"
    );


}
