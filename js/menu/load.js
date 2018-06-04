var layersMenu = CONF.interfaz.panel.layers;

// Cierra el panel
$('#cerrarPanel').on('click', function () {
  	map.enableInteract();
	document.getElementById("herramientas").classList.remove("herramientasFull");
	document.getElementById("panelMiRed").style.display = "none";
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
	var infoRed = document.getElementsByClassName("infoMiRed")[0].innerHTML;

	var confPanel = CONF.interfaz.panel.panelMiRed.infoPanelMiRed;
	var imagenLoading = confPanel.imagenCargando;
	var textoCargandoDatos = confPanel.textoCargandoDatos;
	var textoActualizandoDatos = confPanel.textoActualizandoDatos;

	if(infoRed == "")
		document.getElementsByClassName("infoMiRed")[0].innerHTML = "<div class='actualizacion' style='text-align: center;'><span class='cargando'><img src='" + imagenLoading + "' class='actualizandoDatos' /></img> <blink class='textoCargando'>" + textoCargandoDatos + "</blink></span></div>";
	else {
		if(!infoRed.includes("<div class=\"actualizacion\""))
			document.getElementsByClassName("infoMiRed")[0].innerHTML = "<div class='actualizacion' style='text-align: center;'><span class='cargando'><img src='" + imagenLoading + "' class='actualizandoDatos' /></img> <blink class='textoCargando'>" + textoActualizandoDatos + "</blink></span></div>" + document.getElementsByClassName("infoMiRed")[0].innerHTML;
	}

	document.getElementsByClassName("mired")[0].disabled = true;
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
	link.href = document.URL + layersMenu[id].urlAjax;
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
					actualizarInfoRedPanel();
					
					map.display = true;
					$.ajax ({ 
						url: archivo,
						type: 'post',
						data: {queboton : this.textContent},
						success: function(r){
							var lines = r.split('\n');
							if(lines[0] == layer.nombre){
								map.setFlyingTo(this.textContent);
								var conectados = [];
								for(var i = 0;i < lines.length;i++){
								    if(lines[i].includes("Nmap scan report for"))
								    	conectados[conectados.length] = lines[i].split("Nmap scan report for ")[1];
								}
								if(conectados && conectados[0])
									addInfoToPanel(conectados);
								else
									document.getElementsByClassName("actualizacion")[0].className += " invisible";
								document.getElementsByClassName("mired")[0].disabled = false;
							}
						}
					});
				} else {
					var noExisteUrlAjax = CONF.interfaz.panel.layersErrors.noExisteUrlAjax
					var mirarConf = CONF.interfaz.panel.layersErrors.mirarConf;
					console.log(noExisteUrlAjax + " '" + this.textContent + "' " + mirarConf);
				}
			}
		}
	};

	var layers = document.getElementById('menu');
	layers.appendChild(link);	
};
