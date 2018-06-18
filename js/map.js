// Boton de salir del panel
var nombreMiUbicacion = CONF.mapa.miubicacion.name;

// Devuelve el array de todos los markers
map.getAllMarkers = function() {
	return allMarkers;
}

// Devuelve el array de todos los layers
map.getAllLayers = function() {
	return map.getStyle().layers;
}

// Devuelve el array de todos los layers
map.getAllSources = function() {
	return map.getStyle().sources;
}

/* Al abrir el panel, deshabilitamos el mapa. 
   Con esto solucionamos el problema de poder jugar con el mapa por 
   el margen inferior del panel, ya que el div no era 100% height */
map.disableInteract = function() {
	map["scrollZoom"].disable();
	map["boxZoom"].disable();
	map["dragRotate"].disable();
	map["dragPan"].disable();
	map["keyboard"].disable();
	map["doubleClickZoom"].disable();
	map["touchZoomRotate"].disable();
}

// Habilita la interacción con el mapa
map.enableInteract = function() {
	map["scrollZoom"].enable();
	map["boxZoom"].enable();
	map["dragRotate"].enable();
	map["dragPan"].enable();
	map["keyboard"].enable();
	map["doubleClickZoom"].enable();
	map["touchZoomRotate"].enable();
}

// Variable para controlar que se está volando y no abrir el panel al clicar en Mi Red
map.setFlyingTo = function(flyTo){
	map.flyingTo = flyTo;
}

// Variable para controlar que se está volando y no abrir el panel al clicar en Mi Red
map.setFlyingToLonLat = function(lonLat) {
	map.FlyingToLonLat = lonLat;
}

// Metodo llamado for map.flyToMe() para agregar el punto de Mi ubicación una vez se resuelva la IP y LonLat
map.agregarMarcadorYvolar = function(target, ip){
	map.addMarkerToSource('markers', target, nombreMiUbicacion, ip);
	map.setFlyingTo(nombreMiUbicacion);
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

// Vuela a la direccion actual del dispositivo con el que estamos en la web resolviendo IP y LonLat
map.flyToMe = function() {
	var target;
	var ipTarget;
	var lat;
	var lon;

	// Comprobamos si podemos coger la ubicación actual del propio navegador
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

	// Recuperamos la IP publica
	$.ajax ({ 
		url: CONF["plugins"].getPublicIP.urlAjax,
		type: 'post'
	}).done(function(ip) {
		if(lon && lat) { // Si hemos podido obtener un Lon Lat o lo hemos leido por configuración
			target = [lon,lat];
			map.agregarMarcadorYvolar(target, ip); // Agregamos el marcador y vamos hasta allí
		} else {
			if(ip){ // Si tenemos IP, pedimos el LonLat
				$.ajax ({ 
					url: CONF["plugins"].getLonLatFromIP.urlAjax,
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
					if(target){ // Si hemos obtenido LonLat, agregamos marcador y vamos hasta allí
						map.agregarMarcadorYvolar(target, ip);
					}
				}).fail(function() {
				});
			}
		}
	}).fail(function(fail) {
	}).complete(function(data) {
	});
}

// Devuelve los features asociados a un crupo de features (por ejemplo 'markers')
map.getSourceFeatures = function(source) {
	return map.getSource(source)._options.data.features;
}

map.crearSource = function(source){
	if(!map.getSource(source)){
		map.addSource(source, {
			"type": "geojson",
			"data": {
			    "type": "FeatureCollection",
			    "features": []
			}
		});
	}
}
map.crearMarcador = function(titulo, lonLat){
	return {
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
}
// Añadir punto al mapa
map.addMarkerToSource = function(source, lonLat, titulo, ip) {
	// Si no existe el source contenedor de puntos, lo creamos
	map.crearSource(source);

	// Recogemos el source (ya existe si o si)
	var sourceTemp = map.getSource(source);
	
	var nuevoMarker = map.crearMarcador(titulo, lonLat);
	
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
	
	// Añadimos un Layer con el source recogido
	map.addLayer({
		"id": source,
		"source": source,
		"className": "markersClass",
		"type": "circle",
		"paint": {
		    "circle-radius": 20,
		    "circle-color": "#007cbf"
		}
	});
}
map.crearCluster = function(dir, nombreCapa){
	var nombre = nombreCapa.split(".")[0].split("_")[0];
	map.addSource(nombreCapa.split(".")[0], {
        type: "geojson",
        data: dir + nombreCapa,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 40
    });
	map.addLayer({
        id: "clusters_" + nombreCapa.split(".")[0],
        type: "circle",
        source: nombreCapa.split(".")[0],
        filter: ["has", "point_count"],
        paint: {
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
        id: "cluster-count_"+nombreCapa.split(".")[0],
        type: "symbol",
        source: nombreCapa.split(".")[0],
        filter: ["has", "point_count"],
        layout: {
			"icon-image": nombre,
	        "icon-size": 0.9,
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
	      	"text-offset": [0.6, 0.6],
	      	"text-anchor": "top",
	      	"text-optional": true
        }
    });

    map.addLayer({
        id: "unclustered-point_"+nombreCapa.split(".")[0],
        type: "symbol",
        source: nombreCapa.split(".")[0],
        filter: ["!has", "point_count"],
        layout: {
            "icon-image" : nombre,
            "icon-size" : 0.9
        }
    });

	var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

	map.setLayoutProperty("clusters_" + nombreCapa.split(".")[0], 'visibility', 'none');
	map.setLayoutProperty("cluster-count_"+nombreCapa.split(".")[0], 'visibility', 'none');
	map.setLayoutProperty("unclustered-point_"+nombreCapa.split(".")[0], 'visibility', 'none');
	
    map.on('mouseenter', 'cluster-count_'+nombreCapa.split(".")[0], function(e) {
        map.getCanvas().style.cursor = 'pointer';

        if(e.features[0].geometry){
	        var coordinates = e.features[0].geometry.coordinates.slice();
	        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
	            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
	        }
	        if(e.features[0].layer && e.features[0].layer.source){
	        	var description = e.features[0].layer.source;
	       		popup.setLngLat(coordinates)
	            	.setHTML("<span class='desccluster'>" + description + "</span>")
	            	.addTo(map);
	        }
	    }
    });

    map.on('mouseleave', 'cluster-count_'+nombreCapa.split(".")[0], function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    var popup;

    map.on('mouseenter', 'unclustered-point_'+nombreCapa.split(".")[0], function() {
    	if(map.getZoom() > 12)
    		map.getCanvas().style.cursor = 'pointer';
    });
    
    map.on('click', 'unclustered-point_'+nombreCapa.split(".")[0], function(e) {
        if(map.getZoom() > 12) {
	        if(e.features[0].geometry){
		        var coordinates = e.features[0].geometry.coordinates.slice();
	            var desc = '<table>';
	            for(var prop in e.features[0].properties){
	            	var property = e.features[0].properties[prop];
	            	if(property != 'null'){
	            		// Si es un HTML lo que va a cargar desde el parametro y hay una URL, lo coge como tal pero casca el <a> porque le añade todo el html
	            		if(!isNaN(property))
		                    desc += '<tr><td class="prop">'+prop+'</td><td class="propText">'+property+'</td></tr>';
		                else if(property.startsWith("http") && expEsDominio.test(property.split("/")[2]))
		                    desc += '<tr><td colspan="2" class="propURL"><a href="'+property+'" target="_blank">'+prop+'</a></td></tr>';
		                else
		                    desc += '<tr><td class="prop">'+prop+'</td><td class="propText">'+property+'</td></tr>';
		            }
	            }
	            desc += '</table>';
	            //var description = e.features[0].properties.description;
	            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
	                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
	            }
	            
	            new mapboxgl.Popup()
	                .setLngLat(coordinates)
	                .setHTML(desc)
	                .addTo(map);
	        }
    	}
    });

    map.on('mouseleave', 'unclustered-point_'+nombreCapa.split(".")[0], function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
}

// Load JSON files into Markers. CSS Class has to be ".marker_NAMEOFTHEFILEJSON" with no extension
map.addGeoJSONFiles = function(){
	const testFolder = 'geoJson/';
	$.ajax ({ 
		url: 'php/getGeoJSONFileList.php',
		data: {geojson: "../" + testFolder},
		type: 'post',
        success: function( data ) { 
        	var archivos = data.replace("[", "").replace("]", "").split(",");
        	for(var i = 2; i < archivos.length; i++){
    			var nombreCapa = archivos[i].replace(/['"]+/g, '')
;    			map.crearCluster(testFolder, nombreCapa);
        	}
        	map.addLayerSelectorPanel();
        }
	});
}

map.addLayerSelectorPanel = function(){
	var id = CONF.interfaz.panel.layerSelectorPanel.id;
	// Width is added for hovering it but have to pass as param
	// Height isn't used cause is auto but have to pass as param
	var widthPanel = CONF.interfaz.panel.layerSelectorPanel.width;
	var widthOverPanel = CONF.interfaz.panel.layerSelectorPanel.widthOver;
	var heightPanel = CONF.interfaz.panel.layerSelectorPanel.height;
	var heightOverPanel = CONF.interfaz.panel.layerSelectorPanel.heightOver;
	var classNamePanel = CONF.interfaz.panel.layerSelectorPanel.className;
	var nombrePanel = CONF.interfaz.panel.layerSelectorPanel.nombrePanel;
	map.layerSelectorPanel = new Panel(id, widthPanel, heightPanel, classNamePanel, false);
	var panelId = map.layerSelectorPanel.id + "_panel";
	document.getElementById(panelId).onmouseover = function() {
		var parsedWidthOverPanel;
		if(!isNaN(widthOverPanel))
	        parsedWidthOverPanel = widthOverPanel + "px";
		else
	        parsedWidthOverPanel = widthOverPanel;
		document.getElementById(panelId).style.width = parsedWidthOverPanel;

		var parsedHeightOverPanel;
		if(!isNaN(heightOverPanel))
	        parsedHeightOverPanel = heightOverPanel + "px";
		else
	        parsedHeightOverPanel = heightOverPanel;
		document.getElementById(panelId).style.height = parsedHeightOverPanel;
	}
	document.getElementById(panelId).onmouseleave = function() {
		var parsedWidthPanel;
		if(!isNaN(widthPanel))
	        parsedWidthPanel = widthPanel + "px";
		else
	        parsedWidthPanel = widthPanel;
		document.getElementById(panelId).style.width = parsedWidthPanel;

		var parsedHeightPanel;
		if(!isNaN(widthPanel))
	        parsedHeightPanel = heightPanel + "px";
		else
	        parsedHeightPanel = heightPanel;
		document.getElementById(panelId).style.height = parsedHeightPanel;
	}
	map.layerSelectorPanel.addTitulo(id, nombrePanel);
	map.layerSelectorPanel.addLayerSelectorPanel(id);
}

// Añadir capa con edificios 3D
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