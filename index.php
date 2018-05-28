<!DOCTYPE html>
<html>
<head>
	<title>Connor Panel</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.js'></script>
	<link href='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css' rel='stylesheet' />
	<script src='http://codeorigin.jquery.com/jquery-1.10.2.min.js'></script>
	<link href='css/style.css' rel='stylesheet' />
	<link rel="stylesheet" href="css/font-awesome.min.css">
</head>
<body>
	<div id='map'></div>
	<div id='interfaz'>
		<div id="herramientas">
			<input type="text" name="buscador" id="buscador" size="1" spellcheck="false" autofocus />
			<nav id="menu"></nav>
		</div>
		<div id='featuresSombreado'></div>
		<div id='features'></div>
		<div id="">
	</div>
	<script src='js/map_config.js'></script>
	<script src='js/menu/buscador.js'></script>
	<script src='js/menu/load.js'></script>
	<script src='js/lateral/scroll.js'></script>
</body>
</html>
