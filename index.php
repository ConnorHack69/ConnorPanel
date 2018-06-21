<?php 
  session_start(); 

  if (!isset($_SESSION['username'])) {
  	$_SESSION['msg'] = "You must log in first";
  	header('location: registration/login.php');
  }
  if (isset($_GET['logout'])) {
  	session_destroy();
  	unset($_SESSION['username']);
  	header("location: registration/login.php");
  }
?>
<!DOCTYPE html>
<html>
<head>
	<title>Connor Panel</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" rel="stylesheet" />
	<script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"></script>
	
	<script src='https://api.mapbox.com/mapbox.js/v3.0.1/mapbox.js'></script>
  <link href='https://api.mapbox.com/mapbox.js/v3.0.1/mapbox.css' rel='stylesheet' />

	<script src='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.js'></script>
	<link href='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css' rel='stylesheet' />

  	
  	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

	<script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/leaflet.markercluster.js'></script>
	<link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/MarkerCluster.css' rel='stylesheet' />
	<link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/MarkerCluster.Default.css' rel='stylesheet' />

    <link id="themecss" rel="stylesheet" type="text/css" href="//www.shieldui.com/shared/components/latest/css/light/all.min.css" />
    <script type="text/javascript" src="//www.shieldui.com/shared/components/latest/js/shieldui-all.min.js"></script>
	
	<script src="http://code.responsivevoice.org/responsivevoice.js"></script>
	
	<script> window.intergramId = "323409446"
	    window.intergramCustomizations = {
	        titleClosed: 'Support',
	        titleOpen: 'Support Chat',
	        introMessage: 'Hi! If you have any issue or any doubt, you can tell us by this chat',
	        autoResponse: 'If any support agent is online at Telegram, you would have any answer in some minutes',
	        autoNoResponse: 'There is no any agent right now, but would response when read your question. Be online for wait your response or try at other moment',
	        mainColor: "#1d3c2f", // Can be any css supported color 'red', 'rgb(255,87,34)', etc
	        alwaysUseFloatingButton: false // Use the mobile floating button also on large screens
	    };
    </script>
	<script id="intergram" type="text/javascript" src="https://www.intergram.xyz/js/widget.js"></script>

	<script src='js/togeojson.js'></script>

	<link href='css/style.css' rel='stylesheet' />
	<link href='css/core.css' rel='stylesheet' />
	<link href='css/progress.css' rel='stylesheet' />
	<link href="css/font-awesome.min.css" rel="stylesheet" />
</head>
<body>
	<div id='map'></div>
	<div id='interfaz'>
		<div id="herramientas">
			<div class="usuario">
				<p class="usuarioMsg">Welcome <strong><?php echo $_SESSION['username']; ?></strong></p>
				<p class="usuarioCS"><a class="cerrarSesion" href="index.php?logout='1'">Cerrar Sesión</a></p>
			</div>
			<input type="text" name="buscador" id="buscador" size="1" spellcheck="false"  ondrop="dropHandler(event);" onkeyup="buscar()" onfocus="escuchar()" x-webkit-speech autofocus />
  			<audio src="" hidden class=speech></audio>
			<nav id="menu"></nav>
			<div id="botonera"></div>
			<div id="panelMiRed">
				<div class="tituloMiRed">
					<img src="images/minimizar.png" alt="Cerrar Panel" id="miRed_cerrarPanel" class="cerrarPanel"></img>
				</div>
				<div class="panelMiRedMarker">
					<div class="huecoVacio"><span id="panelMiRedIp"></span></div>
					<div class="markerMiRed"></div>
					<div class="huecoVacio"><span id="panelMiRedInterfaz"></span></div>
				</div>
				<div id="cargandoTexto"></div>
				<div id="infoMiRed"></div>
				<div id="tools"></div>
			</div>
			<div id="divShell" class="shell-wrap resizable" draggable="true"></div>
			<div id="notification" style="display: none;"></div>
		</div>
		<!--<div id='featuresSombreado'></div>-->
		<div id='features'></div>
	</div>
	<!-- Primero importamos la configuración básica de la web -->
	<script src='js/configuracion.js'></script>

	<!-- Ajax call and notification -->
	<script src='js/db/database.js'></script>

	<!-- El core va a llevar todas las clases para instanciar de forma sencilla Paneles, botones, etc. -->
	<script src='js/core/Panel.js'></script>

	<!-- Cargamos la configuración de todas las tools que queremos habilitar -->
	<script src='js/toolsConfiguration/herramientas/herramientas.js'></script>
	<script src='js/toolsConfiguration/reconocimiento/reconng.js'></script>
	<script src='js/toolsConfiguration/reconocimiento/theharvester.js'></script>
	<!--<script src='js/toolsConfiguration/metasploit/metasploit.js'></script>-->
	<script src='js/toolsConfiguration/shell.js'></script>
	<script src='js/telegram.js'></script>

	<script src='js/map_config.js'></script>
	<script src='js/map.js'></script>

	<script src='js/helpers.js'></script>
	<script src='js/app.js'></script>
	
	<script src='js/voice.js'></script>
	<script src='js/notificacion.js'></script>
	<script src='js/draganddrop.js'></script>
	<script src='js/menu/buscador.js'></script>
	<script src='js/menu/load.js'></script>
	<script src='js/lateral/scroll.js'></script>
</body>
</html>
