import {
    getLayers,
    setLayerVisibility,
    setLayerOpacity
}
from "./layers.js";



export function createLayerControl(map)
{

    const panel =
        document.getElementById(
            "layerPanel"
        );


    panel.innerHTML =
        "<h3>Layer</h3>";



    const groups = {};



    Object.values(getLayers())
    .forEach(layer =>
    {

        if(!groups[layer.group])
        {
            groups[layer.group] = [];
        }

        groups[layer.group]
        .push(layer);

    });



    Object.keys(groups)
    .forEach(group =>
    {

        const title =
            document.createElement("b");

        title.innerText =
            group;


        panel.appendChild(title);



        groups[group]
        .forEach(layer =>
        {

            const div =
                document.createElement("div");


            div.innerHTML =
            `
            <label>
            <input type="checkbox" checked>
            ${layer.title}
            </label>

            <br>

            <input type="range"
                   min="0"
                   max="1"
                   step="0.05"
                   value="${layer.opacity}">
            `;


            const checkbox =
                div.querySelector(
                    "input[type=checkbox]"
                );


            const slider =
                div.querySelector(
                    "input[type=range]"
                );



            checkbox.onchange =
            () =>
            {

                setLayerVisibility(
                    map,
                    layer.id,
                    checkbox.checked
                );

            };



	    slider.oninput =
	    () =>
	    {

	        setLayerOpacity(
		    map,
		    layer.id,
		    parseFloat(slider.value)
	        );

	    };

            panel.appendChild(div);

        });


    });

}
