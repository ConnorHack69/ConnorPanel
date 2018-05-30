<!DOCTYPE html>
<html>
<head>
	<title>Connor Panel</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" />
	<script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"></script>
	<script src='https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js'></script>
	<link href='https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.css' rel='stylesheet' />

	<script src='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.js'></script>
	<link href='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css' rel='stylesheet' />

	<script src='http://codeorigin.jquery.com/jquery-1.10.2.min.js'></script>

	<script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/leaflet.markercluster.js'></script>
	<link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/MarkerCluster.css' rel='stylesheet' />
	<link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/MarkerCluster.Default.css' rel='stylesheet' />


	<link href='css/style.css' rel='stylesheet' />
	<link rel="stylesheet" href="css/font-awesome.min.css">
</head>
<body>
	<div id='map'></div>
	<div id='interfaz'>
		<div id="herramientas">
			<input type="text" name="buscador" id="buscador" size="1" spellcheck="false" autofocus />
			<nav id="menu"></nav>
			<div id="panelMiRed">
				<div class="tituloMiRed">
					<img src="images/minimizar.png" alt="Cerrar Panel" id="cerrarPanel"></img>
				</div>
				<div class="panelMiRedMarker">
					<div class="huecoVacio"></div>
					<div class="markerMiRed"></div>
					<div class="huecoVacio"></div>
				</div>
				<div class="infoMiRed"></div>
			</div>
		</div>
		<div id='featuresSombreado'></div>
		<div id='features'></div>
	</div>
	<script src='js/map_config.js'></script>
	<script src='js/map.js'></script>
	<script src='js/menu/buscador.js'></script>
	<script src='js/menu/load.js'></script>
	<script src='js/lateral/scroll.js'></script>
</body>
</html>
