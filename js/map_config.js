var latManual = -2.6869315;
var lonManual = 42.854014;
var popup = '';

L.mapbox.accessToken = 'pk.eyJ1IjoiaXZhbmNvcmNvbGVzIiwiYSI6ImNpcHhuc2VlbzAwNzhoem0yeGt2dHowNzMifQ.G57kFhckY4Jq00VrVPJ2AQ';
mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbmNvcmNvbGVzIiwiYSI6ImNpcHhuc2VlbzAwNzhoem0yeGt2dHowNzMifQ.G57kFhckY4Jq00VrVPJ2AQ';

tempLat = (Math.random() * (-80 - 80) + 80).toFixed(4)
tempLon = (Math.random() * (-80 - 80) + 80).toFixed(4)

var start = [tempLat, tempLon];
var end = [latManual, lonManual];
var endLonLat = [lonManual, latManual];

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ivancorcoles/cjhms0cvi3dz82spapuicuest',
    center: start,
    zoom: 5
});

map.on("load", function() {
	map.once('moveend', function(){
		var x = document.getElementById("buscador");
		x.className = "";
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

var isAtStart = true;

$( document ).ready(function() {
    var target = isAtStart ? end : start;

    isAtStart = !isAtStart;

    map.flyTo({
	center: target,
	zoom: 14,
	bearing: 0,
	speed: 1.6,
	curve: 1.5,
	easing: function (t) {
	    return t;
	}
    });
});
