var toggleableLayerIds = [ 
	{
		nombre: 'Mi Red', 
		documento: 'mired.php',
		onClickPersonalizado: 'flyToMe',
		className: "mired"
	}, {
		nombre: 'WiFi Gratis', 
		documento: 'wifigratis.php'
	},{
		nombre: 'WPA', 
		documento: 'wpa.php'
	},{	
		nombre: 'Dominios Vulnerados', 
		documento: 'domvulns.php'
	},{
		nombre: 'Ingenieria Social', 
		documento: 'ingsoci.php'
	},{
		nombre: 'Perfiles', 
		documento: 'perfiles.php'
	}
];

for (var i = 0; i < toggleableLayerIds.length; i++) {
	var id = toggleableLayerIds[i];
	var link = document.createElement('a');
	link.href = document.URL + 'php/panel/' + id.documento;
	link.className = 'active ' + id.className;
	link.id = id.documento;
	link.textContent = id.nombre;

	link.onclick = function (e) {
		var clickedLayer = this.textContent;
		e.preventDefault();
		e.stopPropagation();

		if(this.textContent == 'Mi Red')
			map.flyToMe();

		if(map.getLayer(clickedLayer)){

			var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

			if (visibility === 'visible') {
			    map.setLayoutProperty(clickedLayer, 'visibility', 'none');
			    this.className = '';
			} else {
			    this.className = 'active';
			    map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
			}
		} else {
			if(this.textContent == 'Mi Red'){
				var archivo = "#";
				for(var j = 0; j < toggleableLayerIds.length; j++)
					if(toggleableLayerIds[j].nombre == clickedLayer)
						archivo = "php/panel/" + toggleableLayerIds[j].documento;

				var infoRed = document.getElementsByClassName("infoMiRed")[0].innerHTML;
				if(infoRed == "")
					document.getElementsByClassName("infoMiRed")[0].innerHTML = "<div class='actualizacion' style='text-align: center;'><span class='cargando'><img src='images/loading.gif' class='actualizandoDatos' /></img> <blink class='textoCargando'>Cargando datos...</blink></span></div>";
				else {
					if(!document.getElementsByClassName("infoMiRed")[0].innerHTML.includes("<div class=\"actualizacion\""))
						document.getElementsByClassName("infoMiRed")[0].innerHTML = "<div class='actualizacion' style='text-align: center;'><span class='cargando'><img src='images/loading.gif' class='actualizandoDatos' /></img> <blink class='textoCargando'>Actualizando datos...</blink></span></div>" + document.getElementsByClassName("infoMiRed")[0].innerHTML;
				}
				document.getElementsByClassName("mired")[0].disabled = true;
				map.display = true;
				$.ajax ({ 
					url: archivo,
					type: 'post',
					data: {queboton : this.textContent},
					success: function(r){
						var lines = r.split('\n');
						if(lines[0] == 'Mi Red'){
							map.setFlyingTo(this.textContent);
							var conectados = [];
							for(var i = 0;i < lines.length;i++){
							    if(lines[i].includes("Nmap scan report for"))
							    	conectados[conectados.length] = lines[i].split("Nmap scan report for ")[1];
							}
							if(conectados && conectados[0])
								map.addInfoToPanel(conectados);
							else
								document.getElementsByClassName("actualizacion")[0].className += " invisible";
							document.getElementsByClassName("mired")[0].disabled = false;
						}
					}
				});
			}
		}
	};

	var layers = document.getElementById('menu');
	layers.appendChild(link);	
};
