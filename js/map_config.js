// Cargamos variables necesarias
var latManual = CONF.mapa.initialCoordinates.lat;
var lonManual = CONF.mapa.initialCoordinates.lon;

var initialCentering = true;

var allMarkers = {};

mapboxgl.accessToken = CONF.mapa.mapbox.apiKey;

tempLat = (Math.random() * (-80 - 80) + 80).toFixed(4)
tempLon = (Math.random() * (-80 - 80) + 80).toFixed(4)

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
		var x = document.getElementById("buscador");
		x.className = "";
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
				document.getElementById("panelMiRed").style.display = "block";
				document.getElementById("herramientas").className += " herramientasFull";
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
	map.flyToMe();
});

window.addEventListener("keydown",function (e) { // ctrl + f ==> Foco al input de busqueda
    if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) { 
        e.preventDefault();
	if(document.getElementById("buscador"))
		document.getElementById("buscador").select();
    }
})
