var layersMenu = CONF.interfaz.panel.layers;

// Cierra el panel
$('#miRed_cerrarPanel').on('click', function () {
  	map.enableInteract();
	$("#herramientas").removeClass("herramientasFull");
	$("#panelMiRed").hide();
});

// Devuelve un Layer segun el orden por configuracion
function getLayerByIdOrder(index){
	for (var id in layersMenu)
		if(layersMenu[id].order == index)
			return id;
}

// Devuelve un Layer buscando por su nombre
function getLayerByName(name){
	for (var id in layersMenu)
		if(layersMenu[id].nombre == name)
			return id;
}

// Actualiza el contenido de infoRedPanel cuando se está actualizando al abrirse
function actualizarInfoRedPanel(){
	var infoRed = $("#infoMiRed").html();

	var confPanel = CONF.interfaz.panel.panelMiRed.infoPanelMiRed;
	var imagenLoading = confPanel.imagenCargando;
	var textoCargandoDatos = confPanel.textoCargandoDatos;
	var textoActualizandoDatos = confPanel.textoActualizandoDatos;

	if(infoRed == "")
		notificacion.notificar("info", "<span class='cargando'><img src='" + imagenLoading + "' class='actualizandoDatos' /></img> <blink class='textoCargando'>" + textoCargandoDatos + "</blink></span>");
	else
		if(!infoRed.includes("<div class=\"actualizacion\""))
			notificacion.notificar("info", "<span class='cargando'><img src='" + imagenLoading + "' class='actualizandoDatos' /></img> <blink class='textoCargando'>" + textoActualizandoDatos + "</blink></span>");
	
	$("." + CONF.interfaz.panel["layers"].mired["className"]).prop('disabled', true);
}

// Devuelve el urlAjax del Layer con el nombre pasado como parametro
function getLayerAjaxUrl(layerName){
	for(var j in layersMenu)
		if(layersMenu[j].nombre == layerName)
			return layersMenu[j].urlAjax;
	return -1;
}

var countOrder = 0;
for (var id in layersMenu) {
	// JS lo devuelve en orden de nombre de la key. Yo lo ordeno por la restriccion por configuracion
	id = getLayerByIdOrder(countOrder);
	countOrder++;

	// Creamos el elemento
	var link = document.createElement('a');
	link.href = document.URL + ((layersMenu[id].urlAjax) ? layersMenu[id].urlAjax : '#');
	link.className = 'active ' + layersMenu[id].className;
	link.id = layersMenu[id].urlAjax;
	link.textContent = layersMenu[id].nombre;

	link.onclick = function (e) {
		var clickedLayer = this.textContent;
		e.preventDefault();
		e.stopPropagation();

		var layer = layersMenu[getLayerByName(this.textContent)];

		if(this.textContent == layer.nombre && typeof layer.onClickPersonalizado !== 'undefined')
			map.flyToMe();

		if(map.getLayer(clickedLayer)){ // Si es una capa de puntos con el mismo nombre que el .nombre del Layer entra aquí

			var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

			if (visibility === 'visible') {
			    map.setLayoutProperty(clickedLayer, 'visibility', 'none');
			    this.className = '';
			} else {
			    this.className = 'active';
			    map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
			}
		} else { // Si es otra herramienta, entra aqui
			if(this.textContent == layer.nombre){
				var archivo = getLayerAjaxUrl(this.textContent);
				if(archivo != -1){
					if(layer.abrirPanel)
						actualizarInfoRedPanel();
					
					map.display = true;
					$.ajax ({ 
						url: archivo,
						type: 'post',
						success: function(r){
							var lines = r.split('\n');
							if(layer.abrirPanel) { // Mi red
								map.setFlyingTo(this.textContent);
								var conectados = [];
								for(var i = 0;i < lines.length;i++){
								    if(lines[i].includes("Nmap scan report for"))
								    	conectados[conectados.length] = lines[i].split("Nmap scan report for ")[1];
								}
								if(conectados && conectados[0] && layer.abrirPanel)
									addInfoToPanel(conectados);
								else
									document.getElementsByClassName("actualizacion")[0].className += " invisible";
								$("." + CONF.interfaz.panel["layers"].mired["className"]).prop('disabled', false);
							}
							if(layer.abrirShell) { // Shell
								shell.actualDir = lines[0];
								shell.mostrarShell();
							}
						}
					});
				} else {
					var noExisteUrlAjax = CONF.interfaz.panel.layersErrors.noExisteUrlAjax
					var mirarConf = CONF.interfaz.panel.layersErrors.mirarConf;
					notificacion.notificar(
						"error", 
						"Layers botonera lateral", 
						noExisteUrlAjax + " '" + this.textContent + "'", 
						mirarConf
					);
				}
			}
		}
	};

	$('#menu').append(link);	
};
