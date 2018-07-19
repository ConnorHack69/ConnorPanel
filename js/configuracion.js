var CONF = '';
$.ajax({
    type:"POST",
    dataType: "json",
    url: "http://localhost:5000/getBBDDconfig",
    success: function(data){
    	CONF = data;

    	var prefixDomain = "http://localhost/ConnorPanel/";
		var loadedScripts = [
								"js/db/database.js",
								"js/core/Panel.js",
								"js/helpers.js",
								"js/app.js",
								"js/voice.js",
								"js/map_config.js",
								"js/map.js",
								"js/toolsConfiguration/herramientas/herramientas.js",
								"js/toolsConfiguration/reconocimiento/reconng.js",
								"js/toolsConfiguration/shell.js",
								"js/telegram.js",
								"js/notificacion.js",
								"js/draganddrop.js",
								"js/menu/buscador.js",
								"js/menu/load.js",
								"js/lateral/scroll.js"
							];
		for(scriptCargado in loadedScripts){
			var script = document.createElement('script');
			script.src = loadedScripts[scriptCargado];
			document.head.appendChild(script);
		}

    },
    failure: function(){
    	console.log("Error cargando los datos. ¿Está Python funcionando?")
    }
})