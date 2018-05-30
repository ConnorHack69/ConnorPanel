map.getAllMarkers = function() {
	return allMarkers;
}
map.disableInteract = function() {
	map["scrollZoom"].disable();
	map["boxZoom"].disable();
	map["dragRotate"].disable();
	map["dragPan"].disable();
	map["keyboard"].disable();
	map["doubleClickZoom"].disable();
	map["touchZoomRotate"].disable();
}
map.enableInteract = function() {
	map["scrollZoom"].enable();
	map["boxZoom"].enable();
	map["dragRotate"].enable();
	map["dragPan"].enable();
	map["keyboard"].enable();
	map["doubleClickZoom"].enable();
	map["touchZoomRotate"].enable();
}
map.setFlyingTo = function(flyTo){
	map.flyingTo = flyTo;
}
map.setFlyingToLonLat = function(lonLat) {
	map.FlyingToLonLat = lonLat;
}
map.openPanel = function(){
	actualLat = map.getCenter()["lat"];
	actualLon = map.getCenter()["lng"];
	actualLat -= 0.0006;
	target = [actualLon,actualLat];
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
	map.display = true;
}
map.addInfoToPanel = function(info) {
	var html = "<ul>";
	for(var i = 0; i < info.length; i++){
		html += '<li><img src="images/equipo.png" alt="Equipo '+info[i]+'" class="imagenEquipo"/> <b>'+info[i]+'</b></li>'
	}
	html += '</ul>';
	document.getElementsByClassName("infoMiRed")[0].innerHTML = html;
}
map.flyToMe = function() {
	var target;
	var ipTarget;
	var lat;
	var lon;
	if(!lonManual && !latManual && navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position) {
		  	lat = position.coords.latitude;
			lon = position.coords.longitude;
		});
	}
	if(lonManual && latManual){
		lat = lonManual;
		lon = latManual;
	}
	$.ajax ({ 
		url: 'php/getPublicIP.php',
		type: 'post'
	}).done(function(ip) {
		if(lon && lat) {
			target = [lon,lat];
			map.addMarkerToSource('markers', target, 'Mi ubicación', ip);
			map.setFlyingTo('Mi ubicacion');
			map.setFlyingToLonLat(target);
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
		} else {
			if(ip){
				$.ajax ({ 
					url: 'php/getLonLatFromIP.php',
					data: {ip: ipTarget},
					type: 'post'
				}).done(function(responseData) {
					var datos = responseData.split(",");
					for(var i = 0;i < datos.length;i++){
						if(datos[i].includes("latitude")){
							lat = datos[i].split(":")[1];
						}
						if(datos[i].includes("longitude")){
							lon = datos[i].split(":")[1];
						}
					}
					target = [lon,lat];
					if(target){
						map.addMarkerToSource('markers', target, 'Mi ubicación', ip);
						map.setFlyingTo('Mi ubicacion');
						map.setFlyingToLonLat(target);
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
					}
				}).fail(function() {
				});
			}
		}
	}).fail(function(fail) {
	}).complete(function(data) {
	});
}
map.getSourceFeatures = function(source) {
	return map.getSource(source)._options.data.features;
}

// Añadir punto al mapa
map.addMarkerToSource = function(source, lonLat, titulo, ip) {
	// Si no existe el source contenedor de puntos, lo creamos
	if(!map.getSource(source)){
		map.addSource(source, {
			"type": "geojson",
			"data": {
			    "type": "FeatureCollection",
			    "features": []
			}
		    });
	}

	// Recogemos el source (ya existe si o si)
	var sourceTemp = map.getSource(source);
	
	var nuevoMarker = {
		"type": "Feature",
		"geometry": {
		    "type": "Point",
		    "coordinates": lonLat
		},
		"properties": {
		    "title": titulo,
		    "marker-symbol": "default_marker"
		}
    	};
	
	// Añadimos al final del array de Features, uno nuevo con los datos recogidos como params
	sourceTemp._data.features[sourceTemp._data.features.length] = nuevoMarker;
	
	// Añadimos a la variable global
	allMarkers[titulo] = nuevoMarker;
	
	// Si al layer que se le va a añadir este source ya existe, lo borramos
	if(map.getLayer(source))
		map.removeLayer(source);

	// Borramos el source original (no se puede borrar sin el paso anterior: borrar el layer al que está asignado)
	map.removeSource(source);

	// Añadimos un source con el nombre recogido por params
	map.addSource(source, {
		"type": "geojson",
		"data": {
		    "type": "FeatureCollection",
		    "features": sourceTemp._data.features
		}
	});
	
	// Añadimos un Layer con el source recodigo
	map.addLayer({
		"id": source,
		"source": source,
		"className": "prueba",
		"type": "circle",
		"paint": {
		    "circle-radius": 20,
		    "circle-color": "#007cbf"
		}
	});
}
map.add3Dbuildings = function(){
	if(!map.getLayer("3d-buildings")){
		var layers = map.getStyle().layers;

		var labelLayerId;
		for (var i = 0; i < layers.length; i++) {
			if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
			    labelLayerId = layers[i].id;
			    break;
			}
		}
		map.addLayer({
			'id': '3d-buildings',
			'source': 'composite',
			'source-layer': 'building',
			'filter': ['==', 'extrude', 'true'],
			'type': 'fill-extrusion',
			'minzoom': 15,
			'paint': {
			    'fill-extrusion-color': '#162e24',
			    'fill-extrusion-height': [
				"interpolate", ["linear"], ["zoom"],
				15, 0,
				15.05, ["get", "height"]
			    ],
			    'fill-extrusion-base': [
				"interpolate", ["linear"], ["zoom"],
				15, 0,
				15.05, ["get", "min_height"]
			    ],
			    'fill-extrusion-opacity': .8
			}
		    }, labelLayerId);
	}
}
