var latManual = -2.6869315;
var lonManual = 42.854014;
var popup = '';

var initialCentering = true;

var allMarkers = {};

L.mapbox.accessToken = 'pk.eyJ1IjoiaXZhbmNvcmNvbGVzIiwiYSI6ImNpcHhuc2VlbzAwNzhoem0yeGt2dHowNzMifQ.G57kFhckY4Jq00VrVPJ2AQ';
mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbmNvcmNvbGVzIiwiYSI6ImNpcHhuc2VlbzAwNzhoem0yeGt2dHowNzMifQ.G57kFhckY4Jq00VrVPJ2AQ';

tempLat = (Math.random() * (-80 - 80) + 80).toFixed(4)
tempLon = (Math.random() * (-80 - 80) + 80).toFixed(4)

var start = [tempLat, tempLon];
var end = [latManual, lonManual];
var endLonLat = [lonManual, latManual];

var interfaceType;
var interfaceName;
var interfaceIP;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ivancorcoles/cjhms0cvi3dz82spapuicuest',
    center: start,
    zoom: 5
});

$.ajax ({ 
	url: 'php/getNetInterface.php',
	type: 'post',
	fataType: 'json',
}).done(function(responseData) {
	var respuesta = JSON.parse(responseData)
	interfaceType = respuesta.interfaz;
	interfaceName = respuesta.nombreRed;
	interfaceIP = respuesta.miIP;
});

map.on("load", function() {
	map.on('moveend', function(){
		var x = document.getElementById("buscador");
		x.className = "";
		if(!map.display && map.flyingTo && map.flyingTo != '' && map.FlyingToLonLat && map.FlyingToLonLat != ''){
			var actualLat = map.getCenter()["lat"];
			var actualLon = map.getCenter()["lng"];
			var flyingToLat = map.FlyingToLonLat[1];
			var flyingToLon = map.FlyingToLonLat[0];
			
			if(!startFlying && !initialCentering && actualLat.toFixed(5) == flyingToLat.toFixed(5) && actualLon.toFixed(5) == flyingToLon.toFixed(5))
				map.openPanel();

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
					map.openPanel();
				document.getElementById("panelMiRed").style.display = "block";
				document.getElementById("herramientas").className += " herramientasFull";
				map.display = null;
				map.disableInteract();
			}
		}
	});
	map.add3Dbuildings();
	map.flyToMe();
});

window.addEventListener("keydown",function (e) {
    if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) { 
        e.preventDefault();
	if(document.getElementById("buscador"))
		document.getElementById("buscador").select();
    }
})
