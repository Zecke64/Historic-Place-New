
import {tr,getLanguage} from "./language.js";

// Nominatim-Suche
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";


function getResultTypeLabel(result) {

    const type = result.addresstype || result.type || "";

    const typeKeys = {
        city: "search.type.city",
        town: "search.type.city",
        village: "search.type.village",
        hamlet: "search.type.village",
        river: "search.type.river",
        stream: "search.type.stream",
        canal: "search.type.canal",
        lake: "search.type.lake",
        county: "search.type.county",
        state: "search.type.state",
        country: "search.type.country",
        city_district: "search.type.district",
        borough: "search.type.district",
        suburb: "search.type.district",
        neighbourhood: "search.type.neighbourhood",
        municipality: "search.type.municipality",
        forest: "search.type.forest",
        island: "search.type.island",
        peak: "search.type.peak",
        road: "search.type.road",
        house: "search.type.house",
        postcode: "search.type.postcode"
    };

    const key = typeKeys[type];

    return key ? tr(key) : "";
}




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

        // Liste der Suchtreffer
        const suggestions = document.createElement("div");
        suggestions.className = "search-suggestions";
        suggestions.hidden = true;
        suggestions.setAttribute("role", "listbox");

        container.append(input, button, suggestions);

        let searchResults = [];
        let activeIndex = -1;
        let searching = false;
        let lastRequestAt = 0;

        const hideSuggestions = () => {
            suggestions.hidden = true;
            suggestions.replaceChildren();
            searchResults = [];
            activeIndex = -1;
        };

        const updateActiveOption = () => {
            const options =
                suggestions.querySelectorAll(".search-suggestion");

            options.forEach((option, index) => {
                const active = index === activeIndex;

                option.classList.toggle("active", active);
                option.setAttribute("aria-selected", String(active));
            });

            options[activeIndex]?.scrollIntoView({
                block: "nearest"
            });
        };

        // Ausgewählten Treffer auf der Karte anzeigen
        const selectResult = result => {

            hideSuggestions();

            const lon = Number(result.lon);
            const lat = Number(result.lat);

            if (!Number.isFinite(lon) || !Number.isFinite(lat))
                return;

            input.value =
                result.name || result.display_name.split(",")[0];

            if (result.boundingbox) {

                const [south, north, west, east] =
                    result.boundingbox.map(Number);

                map.fitBounds(
                    [
                        [west, south],
                        [east, north]
                    ],
                    {
                        padding: 200,
                        duration: 1000
                    }
                );

            } else {

                map.flyTo({
                    center: [lon, lat],
                    zoom: 16,
                    duration: 1000
                });
            }
        };

        // Treffer als auswählbare Optionen darstellen
        const showSuggestions = results => {

            hideSuggestions();
            searchResults = results;

            if (results.length === 0) {
                const message = document.createElement("div");
                message.className = "search-no-results";
                message.textContent = tr("search.noResults");

                suggestions.appendChild(message);
                suggestions.hidden = false;
                return;
            }

            results.forEach((result, index) => {

                const option = document.createElement("button");
                option.type = "button";
                option.className = "search-suggestion";
                option.setAttribute("role", "option");
                option.setAttribute("aria-selected", "false");

                const name = document.createElement("span");
                name.className = "search-suggestion-name";

                const resultName =
                    result.name || result.display_name.split(",")[0];

                const typeLabel = getResultTypeLabel(result);

                name.textContent = typeLabel
                    ? `${resultName} (${typeLabel})`
                    : resultName;


                const description = document.createElement("span");
                description.className = "search-suggestion-description";
                description.textContent = result.display_name;

                option.append(name, description);

                option.addEventListener("click", () => {
                    selectResult(result);
                });

                option.addEventListener("mouseenter", () => {
                    activeIndex = index;
                    updateActiveOption();
                });

                suggestions.appendChild(option);
            });

            suggestions.hidden = false;
        };

        // Suche erst auf ausdrückliche Benutzeraktion
        const search = async () => {

            const query = input.value.trim();

            if (!query || searching)
                return;

            searching = true;
            button.disabled = true;
            hideSuggestions();

            try {

                // Mindestens eine Sekunde zwischen Anfragen
                const delay = Math.max(
                    0,
                    1000 - (Date.now() - lastRequestAt)
                );

                if (delay > 0) {
                    await new Promise(resolve =>
                        setTimeout(resolve, delay)
                    );
                }

                lastRequestAt = Date.now();

                const params = new URLSearchParams({
                    q: query,
                    format: "jsonv2",
                    limit: "5",
                    addressdetails: "1",
                    "accept-language": getLanguage()
                });

                const response = await fetch(
                    `${NOMINATIM_URL}?${params}`
                );

                if (!response.ok)
                    throw new Error(`HTTP ${response.status}`);

                const results = await response.json();

                // Geänderte Eingabe: alte Ergebnisse nicht anzeigen
                if (input.value.trim() !== query)
                    return;

                showSuggestions(results);

            } catch (error) {

                console.error(
                    "Nominatim-Suche fehlgeschlagen:",
                    error
                );

            } finally {

                searching = false;
                button.disabled = false;
            }
        };

        button.addEventListener("click", search);

        input.addEventListener("input", hideSuggestions);

        input.addEventListener("keydown", event => {

            if (event.key === "ArrowDown" && !suggestions.hidden) {
                event.preventDefault();

                activeIndex =
                    (activeIndex + 1) % searchResults.length;

                if (searchResults.length)
                    updateActiveOption();

            } else if (
                event.key === "ArrowUp" &&
                !suggestions.hidden &&
                searchResults.length
            ) {
                event.preventDefault();

                activeIndex =
                    activeIndex <= 0
                        ? searchResults.length - 1
                        : activeIndex - 1;

                updateActiveOption();

            } else if (event.key === "Enter") {
                event.preventDefault();

                if (!suggestions.hidden && activeIndex >= 0) {
                    selectResult(searchResults[activeIndex]);
                } else {
                    search();
                }

            } else if (event.key === "Escape") {
                hideSuggestions();
            }
        });

        // Liste schließen, wenn außerhalb geklickt wird
        this._onDocumentClick = event => {
            if (!container.contains(event.target))
                hideSuggestions();
        };

        document.addEventListener("click", this._onDocumentClick);

        this._container = container;

        return container;
    }

    onRemove() {
        document.removeEventListener(
            "click",
            this._onDocumentClick
        );

        this._container.remove();
        this._map = undefined;
    }
}

export function createSearchControl() {
    return new SearchControl();
}

