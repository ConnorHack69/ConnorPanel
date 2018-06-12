// Cargamos variables necesarias
var latManual = CONF.mapa.initialCoordinates.lat;
var lonManual = CONF.mapa.initialCoordinates.lon;

var initialCentering = true;

var allMarkers = {};

mapboxgl.accessToken = CONF.mapa.mapbox.apiKey;

tempLat = (Math.random() * (-80 - 80) + 80).toFixed(4);
tempLon = (Math.random() * (-80 - 80) + 80).toFixed(4);

var start = [tempLat, tempLon];
var end = [latManual, lonManual];
var endLonLat = [lonManual, latManual];

var interfaceType;
var interfaceName;
var interfaceIP;

// Iniciamos mapa asociado al div map
var map = new mapboxgl.Map({
    container: 'map',
    style: CONF.mapa.mapbox.style,
    center: start,
    zoom: 5
});

// Pedimos nuestra interfaz, ip local y el nombre de la red a la que estamos conectados

$.ajax ({
	url: CONF["plugins"].getNetInterface.urlAjax,
	type: 'post',
	fataType: 'json',
}).done(function(responseData) {
	var respuesta = JSON.parse(responseData)
	interfaceType = respuesta.interfaz;
	interfaceName = respuesta.nombreRed;
	interfaceIP = respuesta.miIP;
});

// Al cargar el mapa: 
map.on("load", function() {
	map.on('moveend', function(){
		$("#buscador").removeClass("cargandoBuscador");
		// Este if else se ha creado para poder poner el panel de Mi Red a la distancia correcta y que se centre bien
		if(!map.display && map.flyingTo && map.flyingTo != '' && map.FlyingToLonLat && map.FlyingToLonLat != ''){
			var actualLat = map.getCenter()["lat"];
			var actualLon = map.getCenter()["lng"];
			var flyingToLat = map.FlyingToLonLat[1];
			var flyingToLon = map.FlyingToLonLat[0];
			
			if(!startFlying && !initialCentering && actualLat.toFixed(5) == flyingToLat.toFixed(5) && actualLon.toFixed(5) == flyingToLon.toFixed(5))
				openPanel();

			if(startFlying)
				startFlying = !startFlying;
			if(initialCentering)
				initialCentering = false;
		} else {
			if(map.display) {
				var actualLat = map.getCenter()["lat"];
				var actualLon = map.getCenter()["lng"];
				var flyingToLat = map.FlyingToLonLat[1];
				var flyingToLon = map.FlyingToLonLat[0];
				if(!startFlying && !initialCentering && ((actualLat.toFixed(5)+0.0055) == (flyingToLat.toFixed(5)) || actualLon.toFixed(5) == flyingToLon.toFixed(5)))
					openPanel();
				$("#panelMiRed").show();
				$("#herramientas").addClass("herramientasFull");
				map.display = null;
				map.disableInteract();
			}
		}
	});
	map.on('click', 'markers', function (e) { // Al clicas un marker, nos centramos en el
		map.flyTo({center: e.features[0].geometry.coordinates});
	});
	map.on('mouseenter', 'markers', function () {
    	map.getCanvas().style.cursor = 'pointer'; // Cambiamos el estilo del curso en el hover del feature
	});
	map.on('mouseleave', 'markers', function () {
    	map.getCanvas().style.cursor = '';
	});
	map.add3Dbuildings();
	/*map.addSource("earthquakes", {
        type: "geojson",
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: "geoJson/CCTV.geojson",
        cluster: true,
        clusterMaxZoom: 21, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });
	map.addLayer({
        id: "clusters",
        type: "circle",
        source: "earthquakes",
        filter: ["has", "point_count"],
        paint: {
            // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6",
                100,
                "#f1f075",
                750,
                "#f28cb1"
            ],
            "circle-radius": [
                "step",
                ["get", "point_count"],
                30,
                100,
                40,
                750,
                50
            ]
        }
    });

    map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "earthquakes",
        filter: ["has", "point_count"],
        layout: {
			"icon-image": "CCTV",
	        "icon-size": 0.9,
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            //"text-size": 18,
	      	"text-offset": [0.6, 0.6],
	      	"text-anchor": "top",
	      	"text-optional": true
        }
    });

    map.addLayer({
        id: "unclustered-point",
        type: "symbol",
        source: "earthquakes",
        filter: ["!has", "point_count"],
        layout: {
            "icon-image" : "CCTV",
            "icon-size" : 1
        }
    });

	var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'cluster-count', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        if(e.features[0].layer && e.features[0].layer.source){
        	var description = e.features[0].layer.source;
       		popup.setLngLat(coordinates)
            	.setHTML("<span class='desccluster'>" + description + "</span>")
            	.addTo(map);
        }
    });

    map.on('mouseleave', 'cluster-count', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    map.on('mouseenter', 'unclustered-point', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates)
            .setHTML("<span class='descuncluster'>" + description + "</span>")
            .addTo(map);
    });

    map.on('mouseleave', 'unclustered-point', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });*/

	map.addGeoJSONFiles();
	map.flyToMe();
});

window.addEventListener("keydown",function (e) { // ctrl + f ==> Foco al input de busqueda
    if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) { 
        e.preventDefault();
	if($("#buscador"))
		$("#buscador").select();
    }
})
