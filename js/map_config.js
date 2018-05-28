var lat = -2.6869315;
var lon = 42.854014;

$.getJSON('http://freegeoip.net/json/', function(json) {
    if (json) {
      lat = json.latitude;
      lon = json.longitude;
    }
});

mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbmNvcmNvbGVzIiwiYSI6ImNpcHhuc2VlbzAwNzhoem0yeGt2dHowNzMifQ.G57kFhckY4Jq00VrVPJ2AQ';

tempLat = (Math.random() * (-80 - 80) + 80).toFixed(4)
tempLon = (Math.random() * (-80 - 80) + 80).toFixed(4)

var start = [tempLat, tempLon];
var end = [lat, lon];

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
	map.loadImage("https://i.imgur.com/MK4NUzI.png", function(error, image) {
	      	if (error) throw error;
	      	map.addImage("custom-marker", image);
	      	map.addLayer({
			id: "puntos",
			type: "symbol",
			source: {
			  type: "geojson",
			  data: {
			    type: "FeatureCollection",
			    features:[{
				type: 'Feature',
				geometry: {
				      type: 'Point',
				      coordinates: end
				},
				properties: {
				      icon: {
					iconUrl: 'https://www.mapbox.com/mapbox.js/assets/images/astronaut1.png',
					iconSize: [50, 50],
					iconAnchor: [25, 25],
					popupAnchor: [0, -25],
					className: 'dot'
				      }
				}}
			    ]}
			},
			layout: {
			  "icon-image": "custom-marker",
			}
	      	});
    	});
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
