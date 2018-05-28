var satellite   = L.tileLayer(viz.leaflet.tiles.OpenStreetMap.satellite, { attribution: viz.leaflet.tiles.OpenStreetMap.attribution})
		,streets  = L.tileLayer(viz.leaflet.tiles.OpenStreetMap.WorldStreet, { attribution: viz.leaflet.tiles.OpenStreetMap.attribution})
		,OpenTopoMap = L.tileLayer(viz.leaflet.tiles.OpenTopoMap.url, { attribution: viz.leaflet.tiles.OpenTopoMap.attribution})
		,ThunderforestCycle = L.tileLayer(viz.leaflet.tiles.Thunderforest.Cycle, { attribution: viz.leaflet.tiles.Thunderforest.attribution})
		,ThunderforestTransport = L.tileLayer(viz.leaflet.tiles.Thunderforest.Transport, { attribution: viz.leaflet.tiles.Thunderforest.attribution})
		,ThunderforestTransportDark = L.tileLayer(viz.leaflet.tiles.Thunderforest.TransportDark, { attribution: viz.leaflet.tiles.Thunderforest.attribution})
		,ThunderforestTransportLandscape = L.tileLayer(viz.leaflet.tiles.Thunderforest.TransportLandscape, { attribution: viz.leaflet.tiles.Thunderforest.attribution})
		,ThunderforestTransportOutdoors = L.tileLayer(viz.leaflet.tiles.Thunderforest.TransportOutdoors, { attribution: viz.leaflet.tiles.Thunderforest.attribution})
		,ThunderforestTransportPioneer = L.tileLayer(viz.leaflet.tiles.Thunderforest.TransportPioneer, { attribution: viz.leaflet.tiles.Thunderforest.attribution})
		,OpenMapSurferRoads = L.tileLayer(viz.leaflet.tiles.OpenMapSurfer.Roads, { attribution: viz.leaflet.tiles.OpenMapSurfer.attribution})
		,OpenMapSurferGrayscale = L.tileLayer(viz.leaflet.tiles.OpenMapSurfer.Grayscale, { attribution: viz.leaflet.tiles.OpenMapSurfer.attribution})
		,HyddaFull = L.tileLayer(viz.leaflet.tiles.Hydda.Full, { attribution: viz.leaflet.tiles.Hydda.attribution})
		,HyddaBase = L.tileLayer(viz.leaflet.tiles.Hydda.Base, { attribution: viz.leaflet.tiles.Hydda.attribution})
		,StamenToner = L.tileLayer(viz.leaflet.tiles.Stamen.Toner, { attribution: viz.leaflet.tiles.Stamen.attribution, ext: 'png'})
		,StamenTonerBackground = L.tileLayer(viz.leaflet.tiles.Stamen.TonerBackground, { attribution: viz.leaflet.tiles.Stamen.attribution, ext: 'png'})
		,StamenTonerLite = L.tileLayer(viz.leaflet.tiles.Stamen.TonerLite, { attribution: viz.leaflet.tiles.Stamen.attribution, ext: 'png'})
		,StamenWatercolor = L.tileLayer(viz.leaflet.tiles.Stamen.Watercolor, { attribution: viz.leaflet.tiles.Stamen.attribution, ext: 'png'})
		,StamenTerrain = L.tileLayer(viz.leaflet.tiles.Stamen.Terrain, { attribution: viz.leaflet.tiles.Stamen.attribution, ext: 'png'})
		,StamenTerrainBackground = L.tileLayer(viz.leaflet.tiles.Stamen.TerrainBackground, { attribution: viz.leaflet.tiles.Stamen.attribution, ext: 'png'})
		,EsriWorldStreetMap = L.tileLayer(viz.leaflet.tiles.Esri.WorldStreetMap, { attribution: viz.leaflet.tiles.Esri.attribution})
		,EsriWorldImagery = L.tileLayer(viz.leaflet.tiles.Esri.WorldImagery, { attribution: viz.leaflet.tiles.Esri.attribution})
		,EsriWorldTerrain = L.tileLayer(viz.leaflet.tiles.Esri.WorldTerrain, { attribution: viz.leaflet.tiles.Esri.attribution})
		,EsriWorldShadedRelief = L.tileLayer(viz.leaflet.tiles.Esri.WorldShadedRelief, { attribution: viz.leaflet.tiles.Esri.attribution})
		,EsriWorldPhysical = L.tileLayer(viz.leaflet.tiles.Esri.WorldPhysical, { attribution: viz.leaflet.tiles.Esri.attribution})
		,EsriOceanBasemap = L.tileLayer(viz.leaflet.tiles.Esri.OceanBasemap, { attribution: viz.leaflet.tiles.Esri.attribution})
		,EsriNatGeoWorldMap = L.tileLayer(viz.leaflet.tiles.Esri.NatGeoWorldMap, { attribution: viz.leaflet.tiles.Esri.attribution})
		,EsriWorldGrayCanvas = L.tileLayer(viz.leaflet.tiles.Esri.WorldGrayCanvas, { attribution: viz.leaflet.tiles.Esri.attribution})
		,CartoDBPositron = L.tileLayer(viz.leaflet.tiles.CartoDB.Positron, { attribution: viz.leaflet.tiles.CartoDB.attribution})
		,CartoDBPositronNoLabels = L.tileLayer(viz.leaflet.tiles.CartoDB.PositronNoLabels, { attribution: viz.leaflet.tiles.CartoDB.attribution})
		,CartoDBPositronOnlyLabels = L.tileLayer(viz.leaflet.tiles.CartoDB.PositronOnlyLabels, { attribution: viz.leaflet.tiles.CartoDB.attribution})
		,CartoDBDarkMatter = L.tileLayer(viz.leaflet.tiles.CartoDB.DarkMatter, { attribution: viz.leaflet.tiles.CartoDB.attribution})
		,CartoDBDarkMatterNoLabels = L.tileLayer(viz.leaflet.tiles.CartoDB.DarkMatterNoLabels, { attribution: viz.leaflet.tiles.CartoDB.attribution})
		,CartoDBDarkMatterOnlyLabels = L.tileLayer(viz.leaflet.tiles.CartoDB.DarkMatterOnlyLabels, { attribution: viz.leaflet.tiles.CartoDB.attribution})

		, baseLayers = {
			 "OpenStreetMap satellite": satellite
			,"OpenStreetMap Streets": streets
			,"OpenStreetMap Topology": OpenTopoMap
			,"Thunderforest Cycle": ThunderforestCycle
			,"Thunderforest Transport": ThunderforestTransport
			,"Thunderforest Transport Dark": ThunderforestTransportDark
			,"Thunderforest Transport Landscape": ThunderforestTransportLandscape
			,"Thunderforest Transport Outdoors": ThunderforestTransportOutdoors
			,"Thunderforest Transport Pioneer": ThunderforestTransportPioneer
			,"OpenMapSurfer Roads": OpenMapSurferRoads
			,"OpenMapSurfer Grayscale": OpenMapSurferGrayscale
			,"Hydda Full": HyddaFull
			,"Hydda Base": HyddaBase
			,"Stamen Toner": StamenToner
			,"Stamen TonerBackground": StamenTonerBackground
			,"Stamen TonerLite": StamenTonerLite
			,"Stamen Watercolor": StamenWatercolor
			,"Stamen Terrain": StamenTerrain
			,"Stamen TerrainBackground": StamenTerrainBackground
			,"Esri WorldStreetMap": EsriWorldStreetMap
			,"Esri WorldImagery": EsriWorldImagery
			,"Esri WorldTerrain": EsriWorldTerrain
			,"Esri WorldShadedRelief": EsriWorldShadedRelief
			,"Esri WorldPhysical": EsriWorldPhysical
			,"Esri OceanBasemap": EsriOceanBasemap
			,"Esri NatGeoWorldMap": EsriNatGeoWorldMap
			,"Esri WorldGrayCanvas": EsriWorldGrayCanvas
			,"CartoDB Positron": CartoDBPositron
			,"CartoDB PositronNoLabels": CartoDBPositronNoLabels
			,"CartoDB PositronOnlyLabels": CartoDBPositronOnlyLabels
			,"CartoDB DarkMatter": CartoDBDarkMatter
			,"CartoDB DarkMatterNoLabels": CartoDBDarkMatterNoLabels
			,"CartoDB DarkMatterOnlyLabels": CartoDBDarkMatterOnlyLabels
		};
lon='';
lat='';
function initGeolocation(){
	if( navigator.geolocation ) {
		// Call getCurrentPosition with success and failure callbacks
		navigator.geolocation.getCurrentPosition( success, fail );
	} else {
		alert("Sorry, your browser does not support geolocation services.");
	}
}

function success(position) {
	lon = position.coords.longitude;
	lat = position.coords.latitude;
}

function fail() {
	// Could not obtain location
}

initGeolocation()

var map = L.map('map',{	center: [lat,lon],zoom: 15,layers: [CartoDBDarkMatterNoLabels /*layers to show on load*/]});

L.control.layers(baseLayers).addTo(map);
