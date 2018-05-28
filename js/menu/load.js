var toggleableLayerIds = [ 
	{
		nombre: 'Mi Red', 
		documento: 'mired.php'
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
	link.className = 'active';
	link.id = id.documento;
	link.textContent = id.nombre;

	link.onclick = function (e) {
		var clickedLayer = this.textContent;
		e.preventDefault();
		e.stopPropagation();
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
			var archivo = "#";
			for(var j = 0; j < toggleableLayerIds.length; j++)
				if(toggleableLayerIds[j].nombre == clickedLayer)
					archivo = "php/panel/" + toggleableLayerIds[j].documento;
			$.ajax ({ 
				url: archivo,
				type: 'post',
				success: function(r){
					var lines = r.split('\n');
					for(var i = 0;i < lines.length;i++){
					    if(lines[i].includes("Nmap scan report for"))
					    	console.log("Linea " + i + " : " + lines[i]);
					}
				}
			});
		}
	};

	var layers = document.getElementById('menu');
	layers.appendChild(link);	
};
