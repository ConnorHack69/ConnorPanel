<!DOCTYPE html>
<html>
<head>
	<title>Connor Panel</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" rel="stylesheet" />
	<script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"></script>
	
	<script src='https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js'></script>
	<link href='https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.css' rel='stylesheet' />

	<script src='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.js'></script>
	<link href='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css' rel='stylesheet' />

	<script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/leaflet.markercluster.js'></script>
	<link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/MarkerCluster.css' rel='stylesheet' />
	<link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/MarkerCluster.Default.css' rel='stylesheet' />

	<link href='css/style.css' rel='stylesheet' />
	<link href="css/font-awesome.min.css" rel="stylesheet" />
</head>
<body>
	<div id='map'></div>
	<div id='interfaz'>
		<div id="herramientas">
			<input type="text" name="buscador" id="buscador" size="1" spellcheck="false"  ondrop="dropHandler(event);" onkeyup="buscar()" onfocus="escuchar()" x-webkit-speech autofocus />
  			<audio src="" hidden class=speech></audio>
			<nav id="menu"></nav>
			<div id="panelMiRed">
				<div class="tituloMiRed">
					<img src="images/minimizar.png" alt="Cerrar Panel" id="cerrarPanel"></img>
				</div>
				<div class="panelMiRedMarker">
					<div class="huecoVacio"><span id="panelMiRedIp"></span></div>
					<div class="markerMiRed"></div>
					<div class="huecoVacio"><span id="panelMiRedInterfaz"></span></div>
				</div>
				<div id="cargandoTexto"></div>
				<div class="infoMiRed"></div>
			</div>
			<div class="words"></div>
		</div>
		<div id='featuresSombreado'></div>
		<div id='features'></div>
	</div>
	<script src='js/configuracion.js'></script>
	<script src='js/map_config.js'></script>
	<script src='js/map.js'></script>
	<script src='js/voice.js'></script>
	<!--<script src='js/musica.js'></script>  Aqui se cargará la funcion de js/musica.js -->
	<script src='js/draganddrop.js'></script>
	<script src='js/menu/buscador.js'></script>
	<script src='js/menu/load.js'></script>
	<script src='js/lateral/scroll.js'></script>
</body>
</html>
