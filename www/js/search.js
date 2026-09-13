import {tr} from "./language.js";


// Nominatim-Suche

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

class SearchControl {

    onAdd(map) {

        this._map = map;

        const container = document.createElement("div");
        container.className = "maplibregl-ctrl search-control";

        const input = document.createElement("input");
        input.type = "text";
        input.dataset.i18n = "input.search";
        input.placeholder = tr("input.search");
        input.autocomplete = "off";

        const button = document.createElement("button");
        button.type = "button";
        button.dataset.i18n = "button.search";
        button.title = tr("button.search");
        button.textContent = "🔍";

        container.appendChild(input);
        container.appendChild(button);

        const search = async () => {

            const query = input.value.trim();

            if (!query)
                return;

            button.disabled = true;

            try {

                const params = new URLSearchParams({
                    q : query,
                    format : "jsonv2",
                    limit : "5",
                    "accept-language" : navigator.language
                });

                const response = await fetch(
                    `${NOMINATIM_URL}?${params}`
                );

                if (!response.ok)
                    throw new Error(`HTTP ${response.status}`);

                const results = await response.json();

                if (results.length === 0) {
                    console.log("Kein Suchergebnis:", query);
                    return;
                }

                const result = results[0];

                const lon = Number(result.lon);
                const lat = Number(result.lat);

                if (result.boundingbox) {

                    const [south, north, west, east] =
                        result.boundingbox.map(Number);

                    map.fitBounds(
                        [
                            [west, south],
                            [east, north]
                        ],
                        {
                            padding : 200,
                            duration : 1000
                        }
                    );

                } else {

                    map.flyTo({
                        center : [lon, lat],
                        zoom : 16,
                        duration : 1000
                    });
                }

            } catch (error) {

                console.error("Nominatim-Suche fehlgeschlagen:", error);

            } finally {

                button.disabled = false;
            }
        };

        button.addEventListener("click", search);

        input.addEventListener("keydown", event => {

            if (event.key === "Enter")
                search();
        });

        this._container = container;

        return container;
    }

    onRemove() {

        this._container.remove();
        this._map = undefined;
    }
}


export function createSearchControl() {
    return new SearchControl();
}


