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

	// Añadimos al final del array de Features, uno nuevo con los datos recogidos como params
	sourceTemp._data.features[sourceTemp._data.features.length] = {
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
