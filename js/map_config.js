var lat = -2.6869315;
var lon = 42.854014;
var popup = '';
$.getJSON('http://freegeoip.net/json/', function(json) {
    if (json) {
      lat = json.latitude;
      lon = json.longitude;
    }
});

L.mapbox.accessToken = 'pk.eyJ1IjoiaXZhbmNvcmNvbGVzIiwiYSI6ImNpcHhuc2VlbzAwNzhoem0yeGt2dHowNzMifQ.G57kFhckY4Jq00VrVPJ2AQ';
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
	
	var miIp = '';
	$.ajax ({ 
		url: 'php/getPublicIP.php',
		type: 'post'
	}).done(function(responseData) {
		miIp = responseData;
	
		popup = new mapboxgl.Popup({ offset: 25 })
		    .setHTML('<h3 class="nombrePopup">Mi ubicación</h3><p class="textoPopup">'+miIp+'</p>');

		var el = document.createElement('div');
		el.id = 'miubicacion';

		new mapboxgl.Marker(el)
		    .setLngLat(end)
		    .setPopup(popup)
		    .addTo(map);

		map.addLayer({
			id: "miubicacion",
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
					iconUrl: 'images/database.png',
					iconSize: [20, 20],
					iconAnchor: [10, 10],
					popupAnchor: [0, -10],
					className: 'dot'
				      }
				}}
			    ]}
			},
			layout: {
			  "icon-image": "custom-marker",
			}
	      	});

	}).fail(function(fail) {
	    	console.log('Fallo encontrando Dominio!');
	}).complete(function(data) {
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
