export const layerTemplates =
{
    "basis-template":
    {
        category:   "overlay",
        icon:       "map",
        visible:    false,
        opacity:    1.0
    },

    "raster-template":
    {
        extends: "basis-template",
        type:    "raster",
        source:
        {
            type:     "raster",
            tileSize: 256
        },
        display:
        {
            overview: { minZoom: 0 },
            detail:   { minZoom: 0 }
        }
    },

    "ovl-raster-template":
    {
	extends: "raster-template",
        shape:
        {
            type: "geojson"
        },
    },

    "wms-template":
    {
        extends: "basis-template",
        type: "wms",
        source:
        {
            type: "wms",
            version: "1.3.0",
            format: "image/png",
            transparent: false,
            crs: "EPSG:3857"
        },
        shape:
        {
            type: "geojson"
        },
        display:
        {
            overview: { minZoom: 0 },
            detail:   { minZoom: 0 }
        }
    }
};



export const layerConfig = [

    // #################################################################################
    //
    //  Basiskarten: nur eine ist aktiv
    //
    // #################################################################################

    {
        id : "opentopomap",
        template : "raster-template",
        category : "base",
        titleKey : "layer.opentopomap",
        source : {tiles : [ "https://tile.opentopomap.org/{z}/{x}/{y}.png" ]},
    },

    {
        id : "openstreetmap",
        template : "raster-template",
        category : "base",
        titleKey : "layer.openstreetmap",
        visible : true,
        source : {
            tiles : [
                "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
                "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
                "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
        },
    },

    // #################################################################################
    //
    //  Overlay-Layer: Können alle aktiv sein
    //
    // #################################################################################


    // ################################   Deutsches Reich 1893   ################################
    {
        id : "kdr1893",
        template : "ovl-raster-template",
        titleKey : "layer.kdr1893",
        description : 'Karte des Deutschen Reichs 1893 aus der David Rumsey Map Collection',
        source : {
            tiles : ["https://tiles.historic.place/kdr1893/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/kdr1893.json" },
        display : {
            overview : { minZoom : 7 },
            detail   : { minZoom : 10 }
        },
        credit : '<a href="https://www.davidrumsey.com" target="_blank">David Rumsey Map Collection</a>'
    },

    // ################################   German Maps 1936   ################################
    {
        id : "byu1936",
        template : "ovl-raster-template",
        titleKey : "layer.byu1936",
        description : 'Pre-WW2 German Maps, BYU Harold B. Library Collections',
        source : {
            tiles : ["https://tiles.historic.place/gm1936/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/byu1936.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://lib.byu.edu/collections/german-maps/" target="_blank">BYU Harold B. Lee Library</a>'
    },

    // ################################   Newport 1845   ################################
    {
        id : "newport",
        template : "ovl-raster-template",
        titleKey : "layer.newport",
        description : 'Newport 1845 National Library of Wales',
        source : {
            tiles : ["https://tiles.historic.place/newport1845/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/newport.json" },
        display : {
            overview : { minZoom : 11 },
            detail   : { minZoom : 14 }
        },
        credit : '<a href="https://www.llgc.org.uk/en/" target="_blank">National Library of Wales</a>'
    },

    // ################################   Berlin 1940   ################################
    {
        id : "Berlin_1940",
        template : "ovl-raster-template",
        titleKey : "layer.Berlin_1940",
        description : 'Geoportal Berlin, Berlin um 1940',
        source : {
            tiles : ["https://tiles.historic.place/city/Berlin_1940/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Berlin_1940.json" },
        display : {
            overview : { minZoom : 13 },
            detail   : { minZoom : 16 }
        },
        credit : '<a href="https://www.stadtentwicklung.berlin.de/geoinformation/geodateninfrastruktur/de/geodienste/" target="_blank">Geoportal Berlin, Berlin um 1940</a>'
    },

    // ################################   Dresden 1833   ################################
    {
        id : "dresden1833",
        template : "ovl-raster-template",
        titleKey : "layer.dresden1833",
        description : 'Dresden 1833 David Rumsey Map Collection',
        source : {
            tiles : ["https://tiles.historic.place/city/Dresden_1833/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/dresden1833.json" },
        display : {
            overview : { minZoom : 11 },
            detail   : { minZoom : 14 }
        },
        credit : '<a href="https://www.davidrumsey.com" target="_blank">David Rumsey Map Collection</a>'
    },

    // ################################   Belgrad 1940   ################################
    {
        id : "Belgrad1940",
        template : "ovl-raster-template",
        titleKey : "layer.Belgrad1940",
        description : 'Belgrad 1940, Map Archive of Wojskowy Instytut Geograficzny 1919 - 1939 (non-commercial use)',
        source : {
            tiles : ["https://tiles.historic.place/city/Belgrad1940/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Belgrad1940.json" },
        display : {
            overview : { minZoom : 11 },
            detail   : { minZoom : 14 }
        },
        credit : '<a href="https://english.mapywig.org/news.php" target="_blank">Map Archive of Wojskowy Instytut Geograficzny (non-commercial use)</a>'
    },

    // ################################   Umgebung von Wien 1941   ################################
    {
        id : "Umgebung_von_Wien_1941",
        template : "ovl-raster-template",
        titleKey : "layer.Umgebung_von_Wien_1941",
        description : 'Umgebung von Wien 1941, Map Archive of Wojskowy Instytut Geograficzny 1919 - 1939 (non-commercial use)',
        source : {
            tiles : ["https://tiles.historic.place/city/Umgebung_von_Wien_1941/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Umgebung_von_Wien_1941.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://english.mapywig.org/news.php" target="_blank">Map Archive of Wojskowy Instytut Geograficzny (non-commercial use)</a>'
    },

    // ################################   Moskau 1836   ################################
    {
        id : "moskau1836",
        template : "ovl-raster-template",
        titleKey : "layer.moskau1836",
        description : 'Moskau 1836 David Rumsey Map Collection ',
        source : {
            tiles : ["https://tiles.historic.place/city/Moskau_1836/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/moskau1836.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://www.davidrumsey.com" target="_blank">David Rumsey Map Collection</a>'
    },

    // ################################   Budapest 1933   ################################
    {
        id : "budapest1933",
        template : "ovl-raster-template",
        titleKey : "layer.budapest1933",
        description : 'Budapest 1933, Map Archive of Wojskowy Instytut Geograficzny 1919 - 1939 ',
        source : {
            tiles : ["https://tiles.historic.place/city/Budapest_1933/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/budapest1933.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://english.mapywig.org/news.php" target="_blank">Map Archive of Wojskowy Instytut Geograficzny</a>'
    },

    // ################################   Schwarzwald(Nord) 1920   ################################
    {
        id : "Schwarzwald-Nord-1920",
        template : "ovl-raster-template",
        titleKey : "layer.Schwarzwald-Nord-1920",
        description : 'Schwarzwald(Nord) 1920, Map Archive of Wojskowy Instytut Geograficzny 1919 - 1939 (non-commercial use)',
        source : {
            tiles : ["https://tiles.historic.place/region/Schwarzwald-Nord-1920/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Schwarzwald-Nord-1920.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://english.mapywig.org/news.php" target="_blank">Map Archive of Wojskowy Instytut Geograficzny (non-commercial use)</a>'
    },

    // ################################   Helsinki 1900   ################################
    {
        id : "Helsinki_1900",
        template : "ovl-raster-template",
        titleKey : "layer.Helsinki_1900",
        description : 'Helsinki 1900, Helsinki Region Infoshare',
        source : {
            tiles : ["https://tiles.historic.place/city/Helsinki_1900/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Helsinki_1900.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://www.hri.fi/fi/" target="_blank">Helsinki Region Infoshare</a>'
    },

    // ################################   Lyon 1888   ################################
    {
        id : "Lyon_1888",
        template : "ovl-raster-template",
        titleKey : "layer.Lyon_1888",
        description : 'Lyon 1888, Bibliothèque nationale de France',
        source : {
            tiles : ["https://tiles.historic.place/city/Lyon_1888/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Lyon_1888.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://visualiseur.bnf.fr/CadresFenetre?O=IFN-8439740&M=imageseule" target="_blank">Bibliothèque nationale de France</a>'
    },

    // ################################   Tartu 1892   ################################
    {
        id : "Tartu_1892",
        template : "ovl-raster-template",
        titleKey : "layer.Tartu_1892",
        description : 'Tartu 1892, National Archives of Estonia',
        source : {
            tiles : ["https://tiles.historic.place/city/Tartu_1892/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Tartu_1892.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://www.ra.ee" target="_blank">National Archives of Estonia</a>'
    },

    // ################################   Umeå 1937   ################################
    {
        id : "Umea_1937",
        template : "ovl-raster-template",
        titleKey : "layer.Umea_1937",
        description : 'Umeå 1937 , Wikimaps Warper',
        source : {
            tiles : ["https://tiles.historic.place/city/Umea_1937/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Umea_1937.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://warper.wmflabs.org/" target="_blank">Wikimaps Warper</a>'
    },

    // ################################   Zürich 1910   ################################
    {
        id : "Zuerich_1910",
        template : "ovl-raster-template",
        titleKey : "layer.Zuerich_1910",
        description : 'Zürich 1910 , Wikimaps Warper',
        source : {
            tiles : ["https://tiles.historic.place/city/Zuerich_1910/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Zuerich_1910.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://imagebase.ubvu.vu.nl/cdm/ref/collection/krt/id/1784" target="_blank">Universiteitsbibliotheek Vrije Universiteit Amsterdam</a>, <a href="https://warper.wmflabs.org/" target="_blank">Wikimaps Warper</a>'
    },

    // ################################   Zürich 1504   ################################
    {
        id : "Zuerich_1504",
        template : "ovl-raster-template",
        titleKey : "layer.Zuerich_1504",
        description : 'Zürich 1504 , Wikimaps Warper',
        source : {
            tiles : ["https://tiles.historic.place/city/Zuerich_1504/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Zuerich_1504.json" },
        display : {
            overview : { minZoom : 12 },
            detail   : { minZoom : 15 }
        },
        credit : '<a href="https://commons.wikimedia.org/wiki/File:Keller_Stadtplan_Z%C3%BCrich_1504.jpg" target="_blank">Wikimedia Commons</a>, <a href="https://warper.wmflabs.org/maps/57" target="_blank">Wikimaps Warper</a>'
    },

    // ################################   Lindau 1822   ################################
    {
        id : "Lindau_1822",
        template : "ovl-raster-template",
        titleKey : "layer.Lindau_1822",
        description : 'Lindau 1822 , Wikimaps Warper',
        source : {
            tiles : ["https://tiles.historic.place/city/Lindau_1822/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Lindau_1822.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://www.bayerische-landesbibliothek-online.de/" target="_blank">Bayerische Landesbibliothek Online</a>, <a href="https://warper.wmflabs.org/" target="_blank">Wikimaps Warper</a>'
    },

    // ################################   Rostock 1911   ################################
    {
        id : "rostock_1911",
        template : "ovl-raster-template",
        titleKey : "layer.rostock_1911",
        description : 'Hansestadt Rostock , (ODC-By) v1.0',
        source : {
            tiles : ["https://tiles.historic.place/city/Rostock_1911/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/rostock_1911.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://www.opendata-hro.de/dataset/plan-von-rostock_1911/resource/18e531e2-b28b-4ae2-9630-940bf60df6ad" target="_blank">Hansestadt Rostock </a>, <a href="https://opendatacommons.org/licenses/by/1.0/" target="_blank">(ODC-By) v1.0</a>'
    },

    // ################################   Rostock Tarnow 1790   ################################
    {
        id : "Rostock_Tarnow_1790",
        template : "ovl-raster-template",
        titleKey : "layer.Rostock_Tarnow_1790",
        description : 'Hansestadt Rostock , (CC0 1.0)',
        source : {
            tiles : ["https://tiles.historic.place/city/Rostock_Tarnow_1790/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Rostock_Tarnow_1790.json" },
        display : {
            overview : { minZoom : 11 },
            detail   : { minZoom : 14 }
        },
        credit : '<a href="https://www.opendata-hro.de/dataset/tarnow_1790" target="_blank">Hansestadt Rostock </a>, <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank">(CC0 1.0)</a>'
    },

    // ################################   Rostock Schmettau 1788   ################################
    {
        id : "Rostock_Schmettau_1788",
        template : "ovl-raster-template",
        titleKey : "layer.Rostock_Schmettau_1788",
        description : 'Hansestadt Rostock , (CC0 1.0)',
        source : {
            tiles : ["https://tiles.historic.place/region/Rostock_1788/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Rostock_Schmettau_1788.json" },
        display : {
            overview : { minZoom : 11 },
            detail   : { minZoom : 14 }
        },
        credit : '<a href="https://www.opendata-hro.de/dataset/schmettau_1788" target="_blank">Hansestadt Rostock </a>, <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank">(CC0 1.0)</a>'
    },

    // ################################   Rostock Wiebeking 1786   ################################
    {
        id : "Rostock_Wiebeking_1786",
        template : "ovl-raster-template",
        titleKey : "layer.Rostock_Wiebeking_1786",
        description : 'Hansestadt Rostock , (CC0 1.0)',
        source : {
            tiles : ["https://tiles.historic.place/region/Rostock_Wiebeking_1786/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Rostock_Wiebeking_1786.json" },
        display : {
            overview : { minZoom : 11 },
            detail   : { minZoom : 14 }
        },
        credit : '<a href="https://www.opendata-hro.de/dataset/wiebeking_1786" target="_blank">Hansestadt Rostock </a>, <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank">(CC0 1.0)</a>'
    },

    // ################################   Cherbourg 1943   ################################
    {
        id : "Cherbourg_1943",
        template : "ovl-raster-template",
        titleKey : "layer.Cherbourg_1943",
        description : 'Cherbourg 1943 , Used by permission of the University of Texas Libraries, The University of Texas at Austin',
        source : {
            tiles : ["https://tiles.historic.place/city/Cherbourg_1943/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Cherbourg_1943.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://www.lib.utexas.edu/maps/" target="_blank">The University of Texas at Austin</a>'
    },

    // ################################   Markgröningen 1751   ################################
    {
        id : "Markgroeningen_1751",
        template : "ovl-raster-template",
        titleKey : "layer.Markgroeningen_1751",
        description : 'Markgröningen 1751 , Wikimaps Warper',
        source : {
            tiles : ["https://tiles.historic.place/city/Markgroeningen_1751/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Markgroeningen_1751.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://www.landesarchiv-bw.de" target="_blank">Landesarchiv Baden-Württemberg</a>, <a href="https://warper.wmflabs.org/" target="_blank">Wikimaps Warper</a>'
    },

    // ################################   Urmesstischblatter Spandau-Berlin Nord 1835-18401   ################################
    {
        id : "Urmesstisch_Berlin_1835-1840",
        template : "ovl-raster-template",
        titleKey : "layer.Urmesstisch_Berlin_1835-1840",
        description : 'Urmesstischblatter_Spandau-Berlin_Nord_1835-1840 , Wikimaps Warper',
        source : {
            tiles : ["https://tiles.historic.place/city/Urmesstisch_Berlin_1835-1840/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Urmesstisch_Berlin_1835-1840.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://warper.wmflabs.org/" target="_blank">Wikimaps Warper</a>'
    },

    // ################################   Berlin 1907   ################################
    {
        id : "Berlin_1907",
        template : "ovl-raster-template",
        titleKey : "layer.Berlin_1907",
        description : 'Mende Großer Verkehrs-Plan Berlin und seine Vororte 1907 , Wikimaps Warper',
        source : {
            tiles : ["https://tiles.historic.place/city/Berlin_1907/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Berlin_1907.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://blocksignal.de/krt/f.php?k=vw" target="_blank">blocksignal.de</a>, <a href="https://warper.wmflabs.org/" target="_blank">Wikimaps Warper</a>'
    },

    // ################################   Duebener-Heide Flurnamen 1800   ################################
    {
        id : "Duebener-Heide_Flurnamen_1800",
        template : "ovl-raster-template",
        titleKey : "layer.Duebener-Heide_Flurnamen_1800",
        description : 'Quellennachweis: Archiv,Landesamt für Denkmalpflege und Archäologie Sachsen-Anhalt.',
        source : {
            tiles : ["https://tiles.historic.place/region/Duebener-Heide_Flurnamen_1800/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Duebener-Heide_Flurnamen_1800.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://www.lda-lsa.de/" target="_blank">Archiv,Landesamt für Denkmalpflege und Archäologie Sachsen-Anhalt</a>'
    },

    // ################################   USA 1900   ################################
    {
        id : "usa_1900",
        template : "ovl-raster-template",
        titleKey : "layer.usa_1900",
        description : 'United States Geological Survey-Historical Topographic Maps',
        source : {
            tiles : ["https://tiles.historic.place/region/usa_1900/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/usa_1900.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : 'USA 1900,<a href="https://www.usgs.gov" target="_blank">U.S. Geological Survey Department of the Interior/USGS U.S. Geological Survey</a>'
    },

    // ################################   Top. Aufnahme der Pfalz (1836-1841)   ################################
    {
        id : "Pfalz_1836-1841",
        template : "ovl-raster-template",
        titleKey : "layer.Pfalz_1836-1841",
        description : 'Top. Aufnahme der Pfalz (1836-1841), Landesamt für Vermessung und Geobasisinformation (LVermGeo) Rheinland-Pfalz',
        source : {
            tiles : ["https://tiles.historic.place/region/pfalz_1836-1841/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Pfalz_1836-1841.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://www.lvermgeo.rlp.de" target="_blank">©GeoBasis-DE / LVermGeoRP (2016)</a>'
    },

    // ################################   Preußische Kartenaufnahme Rheinland 1843-1878   ################################
    {
        id : "Preußische_Kartenaufnahme_1843-1878",
        template : "ovl-raster-template",
        titleKey : "layer.Preußische_Kartenaufnahme_1843-1878",
        description : 'Preußische Kartenaufnahme 1843-1878, Landesamt für Vermessung und Geobasisinformation (LVermGeo) Rheinland-Pfalz',
        source : {
            tiles : ["https://tiles.historic.place/region/Preußische_Kartenaufnahme_1843-1878/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Preußische_Kartenaufnahme_1843-1878.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://www.lvermgeo.rlp.de" target="_blank">©GeoBasis-DE / LVermGeoRP (2016)</a>'
    },

    // ################################   Kliver Flözkarte ~1890   ################################
    {
        id : "Kliver",
        template : "ovl-raster-template",
        titleKey : "layer.Kliver",
        description : 'Flözkarte des Saarländischen Kohledistrikts nach Moritz Kliver (1881-1908)',
        source : {
            tiles : ["https://tiles.historic.place/mining/Kliver/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Kliver.json" },
        display : {
            overview : { minZoom : 11 },
            detail   : { minZoom : 14 }
        },
        credit : 'Kliver courtesy of <a href="https://www.sulb.uni-saarland.de/" target="_blank">SULB</a>'
    },

    // ################################   Duhamel-Atlas 1810   ################################
    {
        id : "Duhamel",
        template : "ovl-raster-template",
        titleKey : "layer.Duhamel",
        description : 'Duhamel-Atlas (Atlas des concessions du Terrain Houiller de la Sarre) von Beaunier und Calmelet (1810)',
        source : {
            tiles : ["https://tiles.historic.place/mining/Duhamel/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Duhamel.json" },
        display : {
            overview : { minZoom : 9 },
            detail   : { minZoom : 12 }
        },
        credit : "Duhamel-Atlas courtesy of Bibliothèque de l'"+'École des mines de Paris, <a href="https://www.bib.mines-paristech.fr/" target="_blank"> MINES ParisTech</a>'
    },

    // ################################   Oberschlesisches Steinkohlebecken 1902   ################################
    {
        id : "Oberschlesien_1902",
        template : "ovl-raster-template",
        titleKey : "layer.Oberschlesien_1902",
        description : 'Flötzkarte des Oberschlesischen Steinkohlenbeckens 1902',
        source : {
            tiles : ["https://tiles.historic.place/mining/Oberschlesien_1902/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Oberschlesien_1902.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://english.mapywig.org/news.php" target="_blank">provided by Mapywig (non-commercial use)</a>'
    },

    // ################################   Atlas Fourcy 1859   ################################
    {
        id : "Fourcy",
        template : "ovl-raster-template",
        titleKey : "layer.Fourcy",
        description : 'Atlas Fourcy (premier atlas souterrain de Paris), 1859',
        source : {
            tiles : ["https://tiles.historic.place/mining/Fourcy/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Fourcy.json" },
        display : {
            overview : { minZoom : 12 },
            detail   : { minZoom : 15 }
        },
        credit : "Atlas Fourcy courtesy of Bibliothèque de l'"+'École des mines de Paris, <a href="https://www.bib.mines-paristech.fr/" target="_blank"> MINES ParisTech</a>'
    },

    // ################################   Wien 1684 (Suttinger)   ################################
    {
        id : "Wien_1684",
        template : "ovl-raster-template",
        titleKey : "layer.Wien_1684",
        description : 'Grundrissplan der Stadt Wien nach Suttinger 1683 (1684)',
        source : {
            tiles : ["https://tiles.historic.place/city/Wien_1684/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Wien_1684.json" },
        display : {
            overview : { minZoom : 13 },
            detail   : { minZoom : 16 }
        },
        credit : '<a href="https://www.data.gv.at/katalog/dataset/stadt-wien_kartenvor1850wien/resource/25088e6c-f612-48f2-a5be-b35f23e78fa1" target="_blank">Stadt Wien</a>, <a href="https://creativecommons.org/licenses/by/3.0/at/deed.de" target="_blank">(CC BY 3.0 AT)</a>'
    },

    // ################################   Gent 1841   ################################
    {
        id : "Gent_1841",
        template : "ovl-raster-template",
        titleKey : "layer.Gent_1841",
        description : 'High res map of Ghent by Saurel 1841',
        source : {
            tiles : ["https://tiles.historic.place/city/Gent_1841/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Gent_1841.json" },
        display : {
            overview : { minZoom : 11 },
            detail   : { minZoom : 14 }
        },
        credit : '<a href="https://adore.ugent.be/view?q=_id:%22archive.ugent.be:6CFD6A70-8CD1-11E2-A445-9E8DB44EB760%22&search_type=advanced" target="_blank">Universiteitsbibliotheek Gent</a>, <a href="https://creativecommons.org/licenses/by-nc-sa/2.0/be/deed.nl" target="_blank">(CC BY-NC-SA 2.0 BE)</a>, <a href="https://warper.wmflabs.org/maps/1291" target="_blank">Wikimaps Warper</a>'
    },

    // ################################   Saargebiet 1927   ################################
    {
        id : "Saar",
        template : "ovl-raster-template",
        titleKey : "layer.Saar",
        description : 'Heimatkarte Saargebiet 1927, Map Archive of Wojskowy Instytut Geograficzny (non-commercial use)',
        source : {
            tiles : ["https://tiles.historic.place/region/Heimatkarte-Saargebiet_1927/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Saar.json" },
        display : {
            overview : { minZoom : 9 },
            detail   : { minZoom : 12 }
        },
        credit : '<a href="https://english.mapywig.org/news.php" target="_blank">Map Archive of Wojskowy Instytut Geograficzny (non-commercial use)</a>'
    },

    // ################################   Mines d'Anzin 1880   ################################
    {
        id : "Mines_D_Anzin",
        template : "ovl-raster-template",
        titleKey : "layer.Mines_D_Anzin",
        description : "Carte des concessions et chemins de fer de la Compagnie propriétaire des mines d'Anzin, Raismes, Fresnes, Vieux-Condé, Denain, Saint-Saulve, Odomez et Hasnon ",
        source : {
            tiles : ["https://tiles.historic.place/mining/Mines_D_Anzin/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Mines_D_Anzin.json" },
        display : {
            overview : { minZoom : 9 },
            detail   : { minZoom : 12 }
        },
        credit : '<a href="https://gallica.bnf.fr/ark:/12148/btv1b8445093c/f1" target="_blank"> gallica.bnf.fr / Bibliothèque nationale de France </a>'
    },

    // ################################   Stockholm 1861   ################################
    {
        id : "stockholm",
        template : "ovl-raster-template",
        titleKey : "layer.stockholm",
        description : 'Topografiska corpsens map of Stockholm, Blad I-IX 1861',
        source : {
            tiles : ["https://tiles.historic.place/city/Stockholm_1861/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/stockholm.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : 'Historical map created by Topografiska corpsen, original at<a href="https://stockholmskallan.se/Soksida/Post/?nid=9746" target="_blank">Stockholms stadsarkiv</a> ,<a href="https://creativecommons.org/licenses/by-sa/2.5/se/" target="_blank">(CC BY-SA 2.5 SE)</a>, <a href="https://commons.wikimedia.org/wiki/Category:Topografiska_corpsens_map_of_Stockholm,_Blad_I-IX" target="_blank">Wikimedia Commons</a>'
    },

    // ################################   Göteborg 1888   ################################
    {
        id : "goeteborg",
        template : "ovl-raster-template",
        titleKey : "layer.goeteborg",
        description : 'Map of Gothenburg, Sweden, published by N. P. Pehrsson in 1888',
        source : {
            tiles : ["https://tiles.historic.place/city/Goeteborg_1888/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/goeteborg.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : '<a href="https://www.riksarkivet.se/goteborg" target="_blank">Riksarkivet, Landsarkivet i Göteborg</a> ,<a href="https://creativecommons.org/publicdomain/mark/1.0/deed.en" target="_blank">Public Domain</a>, <a href="https://commons.wikimedia.org/wiki/File:Simon%27s_1888_Gothenburg_map.tiff" target="_blank">Wikimedia Commons</a>'
    },

    // ################################   Tây Ninh 1898   ################################
    {
        id : "TAYNINH",
        template : "ovl-raster-template",
        titleKey : "layer.TAYNINH",
        description : 'Tây Ninh, published by E. Dufrénoy (Paris)  in 1898',
        source : {
            tiles : ["https://tiles.historic.place/region/TAYNINH_1898/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/TAYNINH.json" },
        display : {
            overview : { minZoom : 8 },
            detail   : { minZoom : 11 }
        },
        credit : '<a href="https://gallica.bnf.fr/accueil/fr/content/accueil-fr?mode=desktop" target="_blank">gallica.bnf.fr / Bibliothèque nationale de France</a> ,<a href="https://creativecommons.org/licenses/by-nc/2.0/" target="_blank">(CC BY-NC 2.0)</a>, <a href="https://commons.wikimedia.org/wiki/File:TayNinh1898.jpg" target="_blank">Wikimedia Commons</a>'
    },

    // ################################   Poland 1920   ################################
    {
        id : "Polen_1920",
        template : "ovl-raster-template",
        titleKey : "layer.Polen_1920",
        description : 'Poland : 1:2,000,000 Digital Commonwealth, Norman B. Leventhal Map Center Collection, Boston Public Library',
        source : {
            tiles : ["https://tiles.historic.place/region/Poland--Boundaries--Maps_1920/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Polen_1920.json" },
        display : {
            overview : { minZoom : 3 },
            detail   : { minZoom : 6 }
        },
        credit : ' Poland 1920  Arctowski, Henryk, General Drafting Company, <a href="https://www.digitalcommonwealth.org" target="_blank">Digital Commonwealth</a>, <a href="https://www.digitalcommonwealth.org/search/commonwealth:x633fb66g" target="_blank"> Norman B. Leventhal Map Center Collection, Boston Public Library</a>, <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank">(CC BY-NC-SA)</a>'
    },

    // ################################   Frankreich 1799   ################################
    {
        id : "Frankreich_1799",
        template : "ovl-raster-template",
        titleKey : "layer.Frankreich_1799",
        description : 'Clement Cruttwell Map of France 1799, Geographicus Rare Antique Maps',
        source : {
            tiles : ["https://tiles.historic.place/region/Frankreich_1799/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Frankreich_1799.json" },
        display : {
            overview : { minZoom : 3 },
            detail   : { minZoom : 6 }
        },
        credit : 'Frankreich 1799 Cruttwell, C., Atlas to Cruttwells Gazetteer, 1799<a href="https://www.geographicus.com/P/AntiqueMap/FranceDepartments-cruttwell-1799" target="_blank"> Geographicus Rare Antique Maps</a>, a cooperation project with <a href="https://commons.wikimedia.org/wiki/File:1799_Clement_Cruttwell_Map_of_France_in_Departments_-_Geographicus_-_FranceDepartments-cruttwell-1799.jpg" target="_blank">Wikimedia Commons</a>, <a href="https://warper.wmflabs.org/maps/1531#Preview_tab" target="_blank">Wikimaps Warper</a>, <a href="https://commons.wikimedia.org/wiki/Commons:Licensing#Material_in_the_public_domain" target="_blank">Public domain</a>'
    },

    // ################################   Egypt 1885   ################################
    {
        id : "Egypt_1885",
        template : "ovl-raster-template",
        titleKey : "layer.Egypt_1885",
        description : 'W. & A.K. Johnston Limited, Norman B. Leventhal Map Center Collection, Boston Public Library, Digital Commonwealth',
        source : {
            tiles : ["https://tiles.historic.place/region/Egypt_1885/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Egypt_1885.json" },
        display : {
            overview : { minZoom : 3 },
            detail   : { minZoom : 6 }
        },
        credit : 'Egypt 1885 W. & A.K. Johnston Limited, <a href="https://www.digitalcommonwealth.org" target="_blank">Digital Commonwealth</a>, <a href="https://www.digitalcommonwealth.org/collections/commonwealth:41688024w" target="_blank"> Norman B. Leventhal Map Center Collection, Boston Public Library</a>, <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank">(CC BY-NC-SA)</a>'
    },

    // ################################   Brasil 1911   ################################
    {
        id : "Brasil_1911",
        template : "ovl-raster-template",
        titleKey : "layer.Brasil_1911",
        description : 'Rio de Janeiro : Jornal do Brasil, Leventhal Map Center Collection, Boston Public Library, Digital Commonwealth',
        source : {
            tiles : ["https://tiles.historic.place/region/Brasil_1911/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Brasil_1911.json" },
        display : {
            overview : { minZoom : 3 },
            detail   : { minZoom : 6 }
        },
        credit : 'Brasil 1911 from Rio de Janeiro : Jornal do Brasil, <a href="https://www.digitalcommonwealth.org" target="_blank">Digital Commonwealth</a>, <a href="https://www.digitalcommonwealth.org/collections/commonwealth:41688024w" target="_blank"> Norman B. Leventhal Map Center Collection, Boston Public Library</a>, <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank">(CC BY-NC-SA)</a>'
    },

    // ################################   Finmarken 1861   ################################
    {
        id : "Finmarken_1861",
        template : "ovl-raster-template",
        titleKey : "layer.Finmarken_1861",
        description : 'Kartverket (Norges Geografiske Oppmåling):J. A. Friis, Etnografisk Kart over Finmarken 1861, (CC BY 4.0)',
        source : {
            tiles : ["https://tiles.historic.place/region/Finmarken_1861/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Finmarken_1861.json" },
        display : {
            overview : { minZoom : 4 },
            detail   : { minZoom : 7 }
        },
        credit : ' Etnografisk Kart over Finmarken 1861, <a href="https://kartverket.no/Kart/Historiske-kart/Historiske-kart-galleri/" target="_blank">Kartverket (Norges Geografiske Oppmåling)</a>, <a href="https://en.wikipedia.org/wiki/Jens_Andreas_Friis" target="_blank">J. A. Friis</a>, <a href="https://creativecommons.org/licenses/by/4.0/deed.no" target="_blank">(CC BY 4.0)</a>'
    },

    // ################################   Leipzig 1850-1892   ################################
    {
        id : "Leipzig",
        template : "ovl-raster-template",
        titleKey : "layer.Leipzig",
        description : 'Stadtplan des Brandversicherungsinspektor Carl Robert Friedrich Kanitz (1811-1893), Stadtarchiv Leipzig, (dl-de/by-2-0)',
        source : {
            tiles : ["https://tiles.historic.place/city/Leipzig_1850-1892/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Leipzig.json" },
        display : {
            overview : { minZoom : 12 },
            detail   : { minZoom : 15 }
        },
        credit : ' Carl Robert Friedrich Kanitz, <a href="https://opendata.leipzig.de/" target="_blank">Open Data Stadtarchiv Leipzig</a>, <a href="https://www.govdata.de/dl-de/by-2-0" target="_blank">(dl-de/by-2-0)</a>'
    },

    // ################################   Memorial Atlas of Ireland 1901   ################################

    // ################################   Ireland British War Office 1:25k GSGS 3906   ################################

    // ################################   Japan 1890   ################################
    {
        id : "Japan_1890",
        template : "ovl-raster-template",
        titleKey : "layer.Japan_1890",
        description : 'Vegetationsgebiete der Japanischen Inseln: Fesca, Max, ETH-Bibliothek Zürich, Public Domain Mark',
        source : {
            tiles : ["https://tiles.historic.place/region/Japan_1890/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Japan_1890.json" },
        display : {
            overview : { minZoom : 3 },
            detail   : { minZoom : 6 }
        },
        credit : 'Fesca, Max: Vegetationsgebiete der Japanischen Inseln, <a href="https://dx.doi.org/10.3931/e-rara-39312" target="_blank">ETH-Bibliothek Zürich, Rar K 236</a>, <a href="https://creativecommons.org/publicdomain/mark/1.0//deed.de" target="_blank">Public Domain Mark</a>'
    },

    // ################################   Hokkaido 1892   ################################
    {
        id : "Hokkaido",
        template : "ovl-raster-template",
        titleKey : "layer.Hokkaido",
        description : 'Full map of Hokkaido, City map of Sapporo, City map of Hakodate, Taikichi Tanaka (Tokyo, author and editor), Magokichi Matsumura (Tokyo, printer), Sanshodo (Tokyo, editor), International Research Center for Japanese Culture',
        source : {
            tiles : ["https://tiles.historic.place/region/Hokkaido/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Hokkaido.json" },
        display : {
            overview : { minZoom : 4 },
            detail   : { minZoom : 7 }
        },
        credit : 'Full map of Hokkaido, <a href="https://lapis.nichibun.ac.jp/chizu/map_detail.php?id=002409852" target="_blank">(from the collection of the International Research Center for Japanese Studies)</a>'
    },

    // ################################   Former Yugoslavia   ################################
    {
        id : "Yugoslavia",
        template : "ovl-raster-template",
        titleKey : "layer.Yugoslavia",
        description : 'Former Yugoslavia Topographic Maps 1:50,000, Series M709, The University of Texas Libraries at Austin, U.S. Defense Mapping Agency, Tiles from OpenStreetMap Hrvatska',
        source : {
            tiles : ["https://tiles.historic.place/https://tms.osm-hr.org/ustopo/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Yugoslavia.json" },
        display : {
            overview : { minZoom : 4 },
            detail   : { minZoom : 7 }
        },
        credit : '<a href="https://www.lib.utexas.edu/maps/topo/former_yugoslavia/" target="_blank">The University of Texas Libraries at Austin, U.S. Defense Mapping Agency, Tiles from <a href="https://osm-hr.org/openstreetmap-hrvatska/"                                                                                                                                                                target="_blank">OpenStreetMap Hrvatska</a>'
    },

    // ################################   Tel Aviv 1936   ################################
    {
        id : "Tel_Aviv_1936",
        template : "ovl-raster-template",
        titleKey : "layer.Tel_Aviv_1936",
        description : 'Tel Aviv 1936 from NYPL Map Warper',
        source : {
            tiles : ["https://tiles.historic.place/https://mapwarper.net/mosaics/tile/596/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Tel_Aviv_1936.json" },
        display : {
            overview : { minZoom : 12 },
            detail   : { minZoom : 15 }
        },
        credit : 'Survey of Palestine, "Jaffa : Survey of Palestine, 1936" <a href="https://mapwarper.net/layers/596" target="_blank">NYPL Map Warper</a>'
    },

    // ################################   Grossherzogthum Baden 1839   ################################
    {
        id : "Grossherzogtum_Baden",
        template : "ovl-raster-template",
        titleKey : "layer.Grossherzogtum_Baden",
        description : 'Topographische Karte über das Grossherzogthum Baden 1839',
        source : {
            tiles : ["https://tiles.historic.place/region/Herzogtum_Baden/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Grossherzogtum_Baden.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : 'Grossherzogthum Baden 1839, <a href="https://digi.ub.uni-heidelberg.de/sammlungen/karten/rothe/" target="_blank">Universitätsbibliothek Heidelberg Ministerium für Wissenschaft, Forschung und Kunst Baden-Württemberg</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/de/deed.en" target="_blank">(CC BY-SA 3.0 DE)</a>'
    },

    // ################################   Karte der Rheinlande von Tranchot und v. Müffling 1803-1820   ################################
    {
        id : "Rheinland_1803-1820",
        template : "ovl-raster-template",
        titleKey : "layer.Rheinland_1803-1820",
        description : 'Kartenaufnahme der Rheinlande durch Tranchot und von Müffling (1803 - 1820), Landesamt für Vermessung und Geobasisinformation (LVermGeo) Rheinland-Pfalz',
        source : {
            tiles : ["https://tiles.historic.place/region/Rheinland_1803-1820/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Rheinland_1803-1820.json" },
        display : {
            overview : { minZoom : 11 },
            detail   : { minZoom : 14 }
        },
        credit : 'Karte der Rheinlande von Tranchot und v. Müffling 1803-1820 , <a href="https://www.lvermgeo.rlp.de" target="_blank">©GeoBasis-DE / LVermGeoRP (2016)</a>'
    },

    // ################################   Atlas Tyrolensis 1774   ################################
    {
        id : "Tirol",
        template : "ovl-raster-template",
        titleKey : "layer.Tirol",
        description : 'Atlas Tyrolensis des Peter Anich und des Blasius Hueber aus dem Jahre 1774 ',
        source : {
            tiles : ["https://tiles.historic.place/region/Atlas_Tyrolensis/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Tirol.json" },
        display : {
            overview : { minZoom : 8 },
            detail   : { minZoom : 11 }
        },
        credit : 'Atlas Tyrolensis, <a href="https://commons.wikimedia.org/wiki/File:Atlas_Tyrolensis-small.jpg" target="_blank">Wikimedia Commons</a>, <a href="https://www.tirol.gv.at/kunst-kultur/landesarchiv/archiv-und-quelle/24/" target="_blank">Tiroler Landesarchiv -Historische Kartenwerke Tirol-</a>, <a href="https://en.wikipedia.org/wiki/Public_domain" target="_blank">Public domain</a>'
    },

    // ################################   Verkehrskarte Magdeburg 1922   ################################
    {
        id : "Magdeburg",
        template : "ovl-raster-template",
        titleKey : "layer.Magdeburg",
        description : 'Ravensteins Spezialkarte des Deutschen Reichs, Regierungsbezirk Magdeburg Karte Nr. 37, 1:300000',
        source : {
            tiles : ["https://tiles.historic.place/region/Verkehrskarte_Magdeburg_1922/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Magdeburg.json" },
        display : {
            overview : { minZoom : 8 },
            detail   : { minZoom : 11 }
        },
        credit : 'Verkehrskarte Magdeburg von Hans Ravenstein, Ravensteins Geographische Verlagsanstalt <a href="https://commons.wikimedia.org/wiki/File:Neue Spezial- und Verkehrskarte für den Regierungsbezirk Magdeburg.jpg" target="_blank">Wikimedia Commons</a>, <a href="https://en.wikipedia.org/wiki/Public_domain" target="_blank">Public domain</a>'
    },

    // ################################   Carte industrielle de la région parisienne 1927   ################################
    {
        id : "Paris",
        template : "ovl-raster-template",
        titleKey : "layer.Paris",
        description : 'Carte industrielle de la région parisienne 1927, Bibliothèque nationale de France, Tiles from Map Warper',
        source : {
            tiles : ["https://tiles.historic.place/https://mapwarper.net/mosaics/tile/867/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Paris.json" },
        display : {
            overview : { minZoom : 10 },
            detail   : { minZoom : 13 }
        },
        credit : 'Carte industrielle de la région parisienne, <a href="https://catalogue.bnf.fr/ark:/12148/cb40712638q" target="_blank">gallica.bnf.fr / Bibliothèque nationale de France</a>, Tiles from <a href="https://mapwarper.net/layers/867" target="_blank">Map Warper</a>'
    },

    // ################################   Post und Eisenbahn-Reisekarte Deutschland 1859   ################################
    {
        id : "posteisen-1859",
        template : "ovl-raster-template",
        titleKey : "layer.posteisen-1859",
        description : 'Post und Eisenbahn-Reisekarte Deutschland 1859, Bayerische Staatsbibliothek München',
        source : {
            tiles : ["https://tiles.historic.place/region/Reisekarte_Deutschland_1856/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/kdr1893.json" },
        display : {
            overview : { minZoom : 4 },
            detail   : { minZoom : 7 }
        },
        credit : 'Post und Eisenbahn-Reisekarte Deutschland 1859 , <a href="https://www.bsb-muenchen.de" target="_blank">© Bayerische Staatsbibliothek München, urn:nbn:de:bvb:12-bsb00112332-6</a>, <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA 4.0</a>'
    },

    // ################################   Ostbelgien Grenze 1873   ################################
    {
        id : "Eupen-grenz-1873",
        template : "ovl-raster-template",
        titleKey : "layer.Eupen-grenz-1873",
        description : 'National Geographic Institute www.ign.be',
        source : {
            tiles : ["https://tiles.historic.place/loc/Ostbelgien-Grenze/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Eupen-grenz.json" },
        display : {
            overview : { minZoom : 7 },
            detail   : { minZoom : 10 }
        },
        credit : 'Extract from IGN maps with the authorization A3647 Of the National Geographic Institute <a href="https://www.ign.be" target="_blank">www.ign.be" <img src="../../../i/ign.png" width="131px" hight="31px"></a>'
    },

    // ################################   Ostbelgien Grenze 1936   ################################
    {
        id : "Eupen-grenz-1936",
        template : "ovl-raster-template",
        titleKey : "layer.Eupen-grenz-1936",
        description : 'National Geographic Institute www.ign.be',
        source : {
            tiles : ["https://tiles.historic.place/loc/Ostbelgien-Grenze-1936/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Eupen-grenz.json" },
        display : {
            overview : { minZoom : 7 },
            detail   : { minZoom : 10 }
        },
        credit : 'Extract from IGN maps with the authorization A3647 Of the National Geographic Institute <a href="https://www.ign.be" target="_blank">www.ign.be" <img src="../../../i/ign.png" width="131px" hight="31px"></a>'
    },

    // ################################   Westrussland 1905   ################################
    {
        id : "Westruss",
        template : "ovl-raster-template",
        titleKey : "layer.Westruss",
        description : 'Westrussland aus der David Rumsey Map Collection',
        source : {
            tiles : ["https://tiles.historic.place/region/Westrussland/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Westruss.json" },
        display : {
            overview : { minZoom : 5 },
            detail   : { minZoom : 8 }
        },
        credit : '<a href="http://www.davidrumsey.com" target="_blank">David Rumsey Map Collection</a>, Andrees Allgemeiner Handatlas-Authors Richard Andree and Albert Scobel'
    },

    // ################################   Schmettau 1787   ################################
    {
        id : "Schmettau-1787",
        template : "ovl-raster-template",
        titleKey : "layer.Schmettau-1787",
        description : 'Quelle © Staatsbibliothek zu Berlin – Preußischer Kulturbesitz',
        source : {
            tiles : ["https://tiles.historic.place/region/Schmettau-1787/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Schmettau-1787.json" },
        display : {
            overview : { minZoom : 8 },
            detail   : { minZoom : 11 }
        },
        credit : '<a href="https://geobasis-bb.de/lgb/de/geodaten/historische-karten/schmettausches-kartenwerk-%281767-1787%29/" target="_blank">Landesvermessung und Geobasisinformation Brandenburg (LGB) </a> Quelle © Staatsbibliothek zu Berlin – Preußischer Kulturbesitz, <a href="https://www.govdata.de/dl-de/by-2-0" target="_blank">dl-de-by-2.0 (Daten geändert)</a>'
    },

    // ################################   Wandkarte vom Königreiche Sachsen 1857   ################################
    {
        id : "sachsen-1857",
        template : "ovl-raster-template",
        titleKey : "layer.sachsen-1857",
        description : 'Wandkarte vom Königreiche Sachsen 1857, Leibniz-Institut für Länderkunde e.V.',
        source : {
            tiles : ["https://tiles.historic.place/region/Sachsen_1857/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/sachsen.json" },
        display : {
            overview : { minZoom : 7 },
            detail   : { minZoom : 10 }
        },
        credit : 'Wandkarte vom Königreiche Sachsen 1857 ,<a href="https://leibniz-ifl.de/" target="_blank">Leibniz-Institut für Länderkunde e.V., Leipzig</a>, <a href="https://commons.wikimedia.org/wiki/Category:1857_maps_of_Saxony" target="_blank">Wikimedia Commons</a>, <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.en" target="_blank">(CC0 1.0) Public Domain Dedication</a>'
    },

    // ################################   Sächsische Meilenblätter 1781/1810   ################################
    {
        id : "sachsen-1781",
        template : "ovl-raster-template",
        titleKey : "layer.sachsen-1781",
        description : 'Meilenblätter von Sachsen,Berliner Exemplar aufgenommen vom Sächs. Ing.-Korps 1780 - 1806 unter Ltg. von Friedrich Ludwig Aster',
        source : {
            tiles : ["https://tiles.historic.place/region/SMB/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/sachsen.json" },
        display : {
            overview : { minZoom : 7 },
            detail   : { minZoom : 10 }
        },
        credit : 'Meilenblätter von Sachsen, Sächs. Ing.-Korps unter Ltg. von Friedrich Ludwig Aster, <a href="https://www.deutschefotothek.de/cms/kartenforum-sachsen-meilenblaetter-berlin.xml" target="_blank">SLUB / Deutsche Fotothek</a>, <a href="https://commons.wikimedia.org/wiki/Category:Meilenbl%C3%A4tter" target="_blank">Wikimedia Commons</a>, <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.en" target="_blank">(CC0 1.0) Public Domain Dedication</a>'
    },

    // ################################   Sitzenrodaer-Forst 1780   ################################
    {
        id : "sitzenroda",
        template : "ovl-raster-template",
        titleKey : "layer.sitzenroda",
        description : 'Karte vom Sitzenroder Forstrevier, Handzeichnung, 1780',
        source : {
            tiles : ["https://tiles.historic.place/region/Sitzenrodaer-Forst_1780/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/sachsen.json" },
        display : {
            overview : { minZoom : 7 },
            detail   : { minZoom : 10 }
        },
        credit : 'Karte vom Sitzenroder Forstrevier 1780 ,<a href="http://www.deutschefotothek.de/documents/obj/70400358" target="_blank"> Pönisch, Carl Ernst, Sächsische Landesbibliothek - Staats- und Universitätsbibliothek Dresden (SLUB)</a>, <a href="https://creativecommons.org/publicdomain/mark/1.0/deed.en" target="_blank">(CC0 1.0) Public Domain</a>'
    },

    // ################################   MTB35xx Saarbrücken/St. Johann 1882-87   ################################
    {
        id : "MTB35xx-SB-StJ",
        template : "ovl-raster-template",
        titleKey : "layer.MTB35xx-SB-StJ",
        description : 'MTB35xx Saarbrücken/St. Johann 1882-87',
        source : {
            tiles : ["https://tiles.historic.place/city/MTB35xx-SB-StJ/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/MTB35xx-SB-StJ.json" },
        display : {
            overview : { minZoom : 9 },
            detail   : { minZoom : 12 }
        },
        credit : 'Landesarchiv Saarbrücken, Bestand K Hellwig, Nr. 0315 / CC-BY-SA 3.0 DE'
    },

    // ################################   Carte GeoFR 161 Pfalz 1770   ################################
    {
        id : "GeoFR161",
        template : "ovl-raster-template",
        titleKey : "layer.GeoFR161",
        description : 'Carte GeoFR 161 Pfalz 1770',
        source : {
            tiles : ["https://tiles.historic.place/region/GeoFR161-Pfalz-1770/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/GeoFR161.json" },
        display : {
            overview : { minZoom : 8 },
            detail   : { minZoom : 11 }
        },
        credit : 'Landesarchiv Saarbrücken, Bestand K Hellwig, Nr. 0261, Urheber César-Francois Cassini de Thury (1714-1784) / CC-BY-SA 3.0 DE'
    },

    // ################################   Ostfrankreich-Vogesen Hachette 1892   ################################
    {
        id : "OstFR-Vogesen-1892",
        template : "ovl-raster-template",
        titleKey : "layer.OstFR-Vogesen-1892",
        description : 'Ostfrankreich-Vogesen Hachette 1892',
        source : {
            tiles : ["https://tiles.historic.place/region/OstFR-Vogesen-1892/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/OstFR-Vogesen-1892.json" },
        display : {
            overview : { minZoom : 9 },
            detail   : { minZoom : 12 }
        },
        credit : 'Landesarchiv Saarbrücken, Bestand K Hellwig, Nr. 959-972, Urheber Librairie Hachette et Cie. / CC-BY-SA 3.0 DE'
    },

    // ################################   Püttlingen Tractus 1784   ################################
    {
        id : "Puettl-Tractus-1784",
        template : "ovl-raster-template",
        titleKey : "layer.Puettl-Tractus-1784",
        description : 'Püttlingen Tractus 1784',
        source : {
            tiles : ["https://tiles.historic.place/city/Puettlingen/Tractus_1784/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Puettl-Tractus-1784.json" },
        display : {
            overview : { minZoom : 11 },
            detail   : { minZoom : 14 }
        },
        credit : 'Stadtarchiv Püttlingen'
    },

    // ################################   Püttlingen Nassau-SB 1822   ################################
    {
        id : "Puettl-Nassau-1822",
        template : "ovl-raster-template",
        titleKey : "layer.Puettl-Nassau-1822",
        description : 'Püttlingen Nassau SB 1822',
        source : {
            tiles : ["https://tiles.historic.place/city/Puettlingen/Nassau_1822/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Puettl-Nassau-1822.json" },
        display : {
            overview : { minZoom : 9 },
            detail   : { minZoom : 12 }
        },
        credit : 'Saarländisches Landesarchiv'
    },

    // ################################   Tractus Rittenhofen/Coelln/Engelfangen 1759   ################################
    {
        id : "Rittenhofen-Coelln-Engelfangen_1759",
        template : "ovl-raster-template",
        titleKey : "layer.Rittenhofen-Coelln-Engelfangen_1759",
        description : 'Rittenhofen/Coelln/Engelfangen 1759',
        source : {
            tiles : ["https://tiles.historic.place/city/Puettlingen/RittCoEng_1759/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Rittenhofen-Coelln-Engelfangen_1759.json" },
        display : {
            overview : { minZoom : 11 },
            detail   : { minZoom : 14 }
        },
        credit : 'Saarländisches Landesarchiv'
    },

    // ################################   Tractus Herchenbach 1807   ################################
    {
        id : "Herchenbach_1807",
        template : "ovl-raster-template",
        titleKey : "layer.Herchenbach_1807",
        description : 'Herchenbach Tractus 1807',
        source : {
            tiles : ["https://tiles.historic.place/city/Puettlingen/Herchenbach_1807/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Herchenbach_1807.json" },
        display : {
            overview : { minZoom : 11 },
            detail   : { minZoom : 14 }
        },
        credit : 'Stadtarchiv Püttlingen, Bestand D1.1-8167 bis D1.1-8170'
    },

    // ################################   Tractus Wehrden 1755   ################################
    {
        id : "Wehrden_1755",
        template : "ovl-raster-template",
        titleKey : "layer.Wehrden_1755",
        description : 'Wehrden Tractus 1755',
        source : {
            tiles : ["https://tiles.historic.place/city/Voelklingen/Wehrden_1755/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Wehrden_1755.json" },
        display : {
            overview : { minZoom : 11 },
            detail   : { minZoom : 14 }
        },
        credit : 'Stadtarchiv Völklingen D1/691'
    },

    // ################################   Tractus Geislautern 1822-1825   ################################
    {
        id : "Geislautern",
        template : "ovl-raster-template",
        titleKey : "layer.Geislautern",
        description : 'Geislautern Tractus 1822-1825',
        source : {
            tiles : ["https://tiles.historic.place/city/Voelklingen/Geislautern/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Geislautern.json" },
        display : {
            overview : { minZoom : 11 },
            detail   : { minZoom : 14 }
        },
        credit : 'Landesarchiv Saarland K Kat 434: Geislautern, gemeinfrei'
    },

    // ################################   Tractus Fürstenhausen 1822-1825   ################################
    {
        id : "Fuerstenhausen",
        template : "ovl-raster-template",
        titleKey : "layer.Fuerstenhausen",
        description : 'Fürstenhausen Tractus 1822-1825',
        source : {
            tiles : ["https://tiles.historic.place/city/Voelklingen/Fuerstenhausen/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Fuerstenhausen.json" },
        display : {
            overview : { minZoom : 11 },
            detail   : { minZoom : 14 }
        },
        credit : 'Landesarchiv Saarland K Kat 370: Geislautern, gemeinfrei'
    },

    // ################################   Tractus Völklingen 1823   ################################
    {
        id : "Voelklingen_1823",
        template : "ovl-raster-template",
        titleKey : "layer.Voelklingen_1823",
        description : 'Völklingen Tractus 1823',
        source : {
            tiles : ["https://tiles.historic.place/city/Voelklingen/Voelklingen_1823/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Voelklingen_1823.json" },
        display : {
            overview : { minZoom : 11 },
            detail   : { minZoom : 14 }
        },
        credit : 'Stadtarchiv Völklingen D1/597'
    },

    // ################################   Preussische Uraufnahme 1850   ################################
    {
        id : "Saar-PreussUr-1850",
        template : "ovl-raster-template",
        titleKey : "layer.Saar-PreussUr-1850",
        description : 'Preußische Uraufnahme 1850',
        source : {
            tiles : ["https://tiles.historic.place/region/Saar-PreussUr-1850/{z}/{x}/{y}.png"]
        },
        shape : { url : "./shape/Saar-PreussUr-1850.json" },
        display : {
            overview : { minZoom : 9 },
            detail   : { minZoom : 12 }
        },
        credit : 'Staatsbibliothek Berlin / LVGL Saarland'
    },


    // #################################################################################
    //
    //  WMS-Layer
    //
    // #################################################################################

    // ################################   Sachsen vor 1945   ################################
    {
        id: "mtb-sachsen-vor-1945",
        template: "wms-template",
        titleKey: "layer.mtb-sachsen-vor-1945",
        description: "Messtischblatt vor 1945",
        source: {
            url: "https://geodienste.sachsen.de/wms_geosn_hist/guest",
            layers: "messtischblatt_vor_1945",
            transparent: true,
        },
        shape : { url : "./shape/sachsen.json" },
        display : {
            overview : { minZoom : 7 },
            detail   : { minZoom : 12 }
        },
        credit: "GeoSN"
    },

    // ################################   Sachsen DDR   ################################
    {
        id: "mtb-sachsen-ddr",
        template: "wms-template",
        titleKey: "layer.sachsen-ddr",
        description: "Sachsen TK25 DDR Ausgabe Staat, Staatsbetrieb Geobasisinformation und Vermessung Sachsen - GeoSN",
        source: {
            url: "https://geodienste.sachsen.de/wms_geosn_hist/guest",
            layers: "tk25_ddr_ausgabe_staat",
            transparent: true,
        },
        shape : { url : "./shape/sachsen.json" },
        display : {
            overview : { minZoom : 7 },
            detail   : { minZoom : 12 }
        },
        credit: "GeoSN"
    },


    // ################################   Sachsen 1990-1996   ################################
    {
        id: "mtb-sachsen-1990",
        template: "wms-template",
        titleKey: "layer.sachsen-1990",
        description: "Sachsen 1990-1996, Staatsbetrieb Geobasisinformation und Vermessung Sachsen - GeoSN",
        source: {
            url: "https://geodienste.sachsen.de/wms_geosn_hist/guest",
            layers: "tk25_ab_1990",
            transparent: true,
        },
        shape : { url : "./shape/sachsen.json" },
        display : {
            overview : { minZoom : 7 },
            detail   : { minZoom : 12 }
        },
        credit: "GeoSN"
    },


    // ################################   Dutch Topographical & Military Map 1850   ################################
    {
        id: "dutch-topomil-1850",
        template: "wms-template",
        titleKey: "layer.dutch-topomil-1850",
        description: "Kadaster, University of Groningen",
        source: {
            url: "https://geo.rug.nl/image/services/HistorischeKaarten/TMK_Kleur/ImageServer/WMSServer?",
            layers: "0",
            transparent: true,
        },
        shape : { url : "./shape/Bonnebladen_1865.json" },
        display : {
            overview : { minZoom : 7 },
            detail   : { minZoom : 11 }
        },
        credit: '<a href="https://opendata.rug.nl/datasets?group_id=cfe67a82c2754794a6ff0dfbf0e84603"target="_blank">Kadaster, University of Groningen</a>'
    },


    // ################################   Dutch Topographical & Military Map 1850   ################################
    {
        id: "bonnebladen-1865",
        template: "wms-template",
        titleKey: "layer.bonnebladen-1865",
        description: "Kadaster, University of Groningen",
        source: {
            url: "https://geo.rug.nl/image/services/HistorischeKaarten/Bonnebladen/ImageServer/WMSServer?",
            layers: "0",
            transparent: true,
        },
        shape : { url : "./shape/Bonnebladen_1865.json" },
        display : {
            overview : { minZoom : 7 },
            detail   : { minZoom : 11 }
        },
        credit: '<a href="https://opendata.rug.nl/datasets?group_id=cfe67a82c2754794a6ff0dfbf0e84603"target="_blank">Kadaster, University of Groningen</a>'
    },


    // ################################   Wien 1912   ################################
    {
        id: "wien-1912",
        template: "wms-template",
        titleKey: "layer.wien-1912",
        description: "Generalstadtplan Wien 1912, Stadt Wien (CC BY 3.0 AT)",
        source: {
            url: "https://data.wien.gv.at/daten/wms?",
            layers: "GENLPLAN1912OGD",
            transparent: true,
        },
        shape : { url : "./shape/wien_1912.json" },
        display : {
            overview : { minZoom : 9 },
            detail   : { minZoom : 12 }
        },
        credit: '<a href="https://www.data.gv.at/katalog/dataset/35102370-ad3b-41e5-a5c3-567750be2711"target="_blank">Stadt Wien</a>, <a href="https://creativecommons.org/licenses/by/3.0/at/deed.de"target="_blank">(CC BY 3.0 AT)</a>'
    },



/*
    // ################################   Bayrische Originalpositionsblätter   ################################
    {
        id: "bayrische_originalpositionsblaetter",
        template: "ovl-raster-template",
        titleKey: "layer.bayrische_originalpositionsblaetter",
        description: "Bayrische Originalpositionsblätter 1:25.000, Ausgabe 1836-1841",
        source: {
            type: "wms",
            url: "https://geoportal.saarland.de/mapbender/php/wms.php?layer_id=41884",
            layers: "Bayrische_Originalpositionsblaetter",
            format: "image/png"
        }
    },

    // ################################   Preußische Generalstabskarte   ################################
    {
        id: "preussische_generalstabskarte",
        template: "ovl-raster-template",
        titleKey: "layer.preussische_generalstabskarte",
        description: "Preußische Generalstabskarte 1:86.400, Ausgabe 1816-1847",
        source: {
            type: "wms",
            url: "https://geoportal.saarland.de/mapbender/php/wms.php?layer_id=41884",
            layers: "Preußische_Generalstabskarte",
            format: "image/png"
        }
    },

    // ################################   Ur-Messtischblätter   ################################
    {
        id: "ur_messtischblaetter",
        template: "ovl-raster-template",
        titleKey: "layer.ur_messtischblaetter",
        description: "Ur-Messtischblätter 1:25.000, Ausgabe 1843-1878",
        source: {
            type: "wms",
            url: "https://geoportal.saarland.de/mapbender/php/wms.php?layer_id=41884",
            layers: "Ur-Messtischblaetter",
            format: "image/png"
        }
    },

    // ################################   Karte des Deutschen Reiches   ################################
    {
        id: "karte_deutsches_reich",
        template: "ovl-raster-template",
        titleKey: "layer.karte_deutsches_reich",
        description: "Karte des Deutschen Reiches 1:100.000, Ausgabe 1875-1945",
        source: {
            type: "wms",
            url: "https://geoportal.saarland.de/mapbender/php/wms.php?layer_id=41884",
            layers: "Karte_des_Deutschen_Reiches",
            format: "image/png"
        }
    },

    // ################################   TK25 1935-1940   ################################
    {
        id: "tk25_1935_1940",
        template: "ovl-raster-template",
        titleKey: "layer.tk25_1935_1940",
        description: "Topographische Karte 1:25.000, Ausgaben 1935-1940",
        source: {
            type: "wms",
            url: "https://geoportal.saarland.de/mapbender/php/wms.php?layer_id=41884",
            layers: "TK25_Ausgaben_1935-1940",
            format: "image/png"
        }
    },

    // ################################   TK25 1957-1965   ################################
    {
        id: "tk25_1957_1965",
        template: "ovl-raster-template",
        titleKey: "layer.tk25_1957_1965",
        description: "Topographische Karte 1:25.000, Ausgaben 1957-1965",
        source: {
            type: "wms",
            url: "https://geoportal.saarland.de/mapbender/php/wms.php?layer_id=41884",
            layers: "TK25_Ausgaben_1957-1965",
            format: "image/png"
        }
    },

    // ################################   TK25 1978-1982   ################################
    {
        id: "tk25_1978_1982",
        template: "ovl-raster-template",
        titleKey: "layer.tk25_1978_1982",
        description: "Topographische Karte 1:25.000, Ausgaben 1978-1982",
        source: {
            type: "wms",
            url: "https://geoportal.saarland.de/mapbender/php/wms.php?layer_id=41884",
            layers: "TK25_Ausgaben_1978-1982",
            format: "image/png"
        }
    },

    // ################################   KDS 1963   ################################
    {
        id: "kds_1963",
        template: "ovl-raster-template",
        titleKey: "layer.kds_1963",
        description: "Karte des Saarlandes 1:100.000, Ausgabe 1963",
        source: {
            type: "wms",
            url: "https://geoportal.saarland.de/mapbender/php/wms.php?layer_id=41884",
            layers: "KDS_1963",
            format: "image/png"
        }
    },
*/

    // #################################################################################
    //
    //  Historische Objekte
    //
    // #################################################################################

    {
        id :        "osm-pois",
        category :  "hist-objects",
        type :      "poi",
        titleKey :  "layer.osmPois",
        icon :      "poi",
        visible :   true,
        opacityControl : false,
        display : {
            overview :  {minZoom : 6}, 
            detail :    {minZoom : 12}
        },
        mapLayers : [
            {id : "poi-clusters",       type : "circle"}, 
            {id : "poi-cluster-count",  type : "symbol"},
            {id : "osm-pois",           type : "symbol"},
            {id : "osm-object-fill",    type : "fill"},
            {id : "osm-object-line",    type : "line"},
            {id : "osm-object-lines",   type : "line"},
            {id : "osm-object-icons",   type : "symbol"}
        ]
    }
];
