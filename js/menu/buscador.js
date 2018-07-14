var lastSearch='';
var initialSizeInput=-1;

var typingTimer;
var doneTypingInterval = CONF.interfaz.panel.buscador.tiempoDeEsperaParaBuscar;

var buscadorInput = $("#buscador");

var startFlying = false;
var busquedaPorVoz = false;

var expEsDominio = CONF.interfaz.panel.buscador.expresiones.esDominio;
var expEsIp = CONF.interfaz.panel.buscador.expresiones.esIp;

var datos = [];
var buscando = false;

// Cambia la anchura del campo de busqueda cada vez que se cambia su contenido
$("#buscador").on('change', actualizarTamañoBuscador());

// Actializa la anchura del campo de texto
function actualizarTamañoBuscador() {
  	clearTimeout(typingTimer);
    buscadorInput.attr('size',(buscadorInput.val() !== '')?buscadorInput.val().length:1);
  	typingTimer = setTimeout(buscar, doneTypingInterval);
};

// Busca el dominio de una IP
function buscarDominio(busqueda){
	if(busqueda !== lastSearch){
		buscadorInput.addClass("cargandoBuscador");
		buscadorInput.attr('readonly', true);
		lastSearch = busqueda;
		buscando = false;
	}
	$.ajax ({ 
		url: CONF.interfaz.panel.buscador.buscarDominioIP.urlAjax,
		data: {busqueda: busqueda},
		type: 'post'
	}).done(function(responseData) {
		var ip = nslookupToIP(responseData);
		var datos = getLonLatFromIP(ip, busqueda);
		buscadorInput.attr('readonly', false);
	}).fail(function(fail) {
	    notificacion.notificar(
	    	"error", 
	    	"buscarDominio", 
	    	CONF.interfaz.panel.buscador.buscarDominioIP.errorAjax, 
	    	CONF.interfaz.panel.buscador.buscarDominioIP.errorAjaxDesc
	    );
	}).complete(function(data) {
	});
}

// Busca la IP de un dominio
function buscarIP(busqueda){
	if(busqueda !== lastSearch){
		buscadorInput.addClass("cargandoBuscador");
		buscadorInput.attr('readonly', true);
		lastSearch = busqueda;
	}
	$.ajax ({ 
		url: CONF.interfaz.panel.buscador.buscarDominioIP.urlAjax,
		data: {busqueda: busqueda},
		type: 'post'
	}).done(function(responseData) {
		var dominio = nslookupToDomain(responseData);
		var datos = getLonLatFromIP(busqueda, dominio);
		buscadorInput.attr('readonly', false);
	}).fail(function(fail) {
	    notificacion.notificar(
	    	"error", 
	    	"buscarIP", 
	    	CONF.interfaz.panel.buscador.buscarDominioIP.errorAjax, 
	    	CONF.interfaz.panel.buscador.buscarDominioIP.errorAjaxDesc
	    );
	}).complete(function(data) {
	});
}

// Función principal de búsqueda. Aquí se irán añadiendo nuevas funciones al buscador
function buscar() {
	clearTimeout(typingTimer);
    buscadorInput.val(buscadorInput.val().toLowerCase());
	var busqueda = buscadorInput.val();
	actualizarTamañoBuscador();
	
	if(busqueda.length > 3 && !buscando){
		switch (true) {
		    case expEsDominio.test(busqueda): 		// Busqueda DOMINIO
		    	buscando = true;
				buscarDominio(busqueda);
				break;
		    case expEsIp.test(busqueda):			// Busqueda IP
		    	buscando = true;
				buscarIP(busqueda);
				break;
		    default:								// Default
				buscadorInput.className = "";
				break;
		}
	}
}

// Returns IP (Llamado desde buscarDominio())
function nslookupToIP(responseData){
	var lines = responseData.split('\n');
	var onError = "";
	for(var i = 2; i < lines.length;i++){
	    	if(lines[i].includes("Address")){
				var ip = lines[i].split("\t")[lines[i].split("\t").length-1].split(" ")[1];
				if (expEsIp.test(ip)){  
					return ip;
				}
			} else if (lines[i].includes("server can't find")) {
				onError = lines[i].split(":")[1].trim();
			}
		}
	return onError;
}

// Returns Domain (Llamado desde buscarIP())
function nslookupToDomain(responseData){
	var lines = responseData.split('\n');
	var onError = "";
	for(var i = 0;i < lines.length;i++){
	    if(lines[i].includes("name = ")){
			return lines[i].split("name = ")[lines[i].split("name = ").length-1];
		} else if (lines[i].includes("server can't find")) {
			onError = lines[i].split(":")[1].trim();
		}
	}
	return onError;
}

// Añade en el panel lateral derecho otro elemento con la busqueda y la IP pasadas por parametro
function addToSection(busqueda, ip){ // Section es la barra lateral derecha que se despliega con el hover
	var node = document.createElement("section");
	node.setAttribute("id", busqueda);
	node.setAttribute("class", "active");
	node.setAttribute("class", "fade");
	node.setAttribute("onClick", "setActiveChapter('"+busqueda+"')")

	var icono = document.createElement("img");
	icono.setAttribute("src", "http://www.google.com/s2/favicons?domain=" + busqueda);
	icono.innerHTML = busqueda;

	var h3=document.createElement("h3");
	h3.innerHTML = busqueda;

	var p=document.createElement("p");
	p.innerHTML = ip;

	node.appendChild(icono);
	node.appendChild(h3);
	node.appendChild(p);

	var elemento = document.getElementById("features");
	elemento.insertBefore(node, elemento.firstChild);
}

// Le pasas un texto para que lo diga en alto
function respuestaEnVoz(decir, busqueda){
	responsiveVoice.speak(decir,"Spanish Female");
	text=encodeURIComponent(busqueda);
	var urlVoz="http://translate.google.com/translate_tts?tl=es&q="+text;
	$("audio").attr("src",urlVoz).get(0).play();
}


// Llamado por Mi Red. Se centra en el punto y luego se desplaza para centrar el div con el agujero en el punto
function openPanel(){
	actualLat = map.getCenter()["lat"];
	actualLon = map.getCenter()["lng"];
	// Mitad del circulo desde arriba : 242 px
	// Diferencia entre punto anterior y el centro del panel
	var actualLatPX = (300-242);
	var point = map.project(map.getCenter());
	point.y = actualLatPX;
	var newTarget = map.unproject(point);
	target = [actualLon,actualLat+(actualLat-newTarget.lat)/2];
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
	map.display = true;
}

// Añade información devuelta al entrar en el panel (escaneo)
function addInfoToPanel(info) {
	$("#panelMiRedIp").html(interfaceType); // IP
	$("#panelMiRedInterfaz").html(interfaceName + "</br><span id='panelMiRedMiIP'>" + interfaceIP + "</span>"); // Interfaz (ex: wlan0)

	// Lista con los dispositivos en la red
	var html = "<ul>";
	for(var i = 0; i < info.length; i++){
		html += '<li><img src="' + CONF.interfaz.panel.infoMiRed.dispositivos.imagen.url + '" alt="Equipo '+info[i]+'" class="' + CONF.interfaz.panel.infoMiRed.dispositivos.imagen.cssClass + '"/></br> <b>'+info[i]+'</b></li>'
	}
	html += '</ul>';

	$("#infoMiRed").html(html);
}

/*
	Agrega un marcador en el mapa y vuela a el

	Parametro: 	datos
	Formato: 	{
					"busqueda" : "dominio.com",
					"ip" : "0.0.0.0",
					"lon" : "42.5",
					"lat" : "-2.4",
					"location" : "ES"
				}
*/
function agregarMarcadorYVolar(datos){
	var busqueda = datos.busqueda;
	var ip = datos.ip;
	var lon = datos.lon;
	var lat = datos.lat;
	var location = datos["location"];
	if(!document.getElementById(busqueda)){
		setTimeout(function(){ buscadorInput.select(); }, 100);
		
		addToSection(busqueda, ip); // Añade al panel lateral
		
		buscadorInput.addClass("cargandoBuscador"); // Añade el gif de "cargando"

		if (typeof puntos === 'undefined')
			puntos = {};
		
		puntos[busqueda] = { // Añade a un array llamado puntos el nuevo punto
				bearing: 27,
				center: [lon, lat],
				zoom: 15,
				pitch: 20
		};

		// Activa el layer en el mapa
		setActiveChapter(busqueda); 
		
		// Si la voz está activada por buscar por la voz, habla en alto
		if(busquedaPorVoz){ 
			var volando = CONF.interfaz.panel.buscador.busquedaPorVoz.msgVolando;
			var localizado = CONF.interfaz.panel.buscador.busquedaPorVoz.localizadoEn;
			respuestaEnVoz(volando + busqueda+", " + localizado + location, busqueda);
			busquedaPorVoz = false;
		}

		var metodo = "insertarDominio";

		// Parametros para insertar el dominio a la BBDD
		var parametrosInsertarDominio = {  
			"metodo": metodo, 
			"datos": {
				"dominio" : busqueda,
				"ip" : ip,
				"location" : location,
				"lon" : lon,
				"lat" : lat
			},
			"bbddMethodsConf" : CONF.baseDatos.methods
		};

		// Inserción en la BBDD
		ddbb.conectar(parametrosInsertarDominio);

		// Saltamos notifición
		var confVoz = CONF.interfaz.panel.buscador.busquedaPorVoz;
		notificacion.notificar(
			"info", 
			"agregarMarcadorYVolar", 
			confVoz.msgVolando + " " + busqueda + ", " + confVoz.localizadoEn + " " + location
		); 
		
		if(typeof metasploit !== 'undefined')
			metasploit.email_harvest(busqueda);
		if(typeof theharvester !== 'undefined')
			theharvester.email_harvest(busqueda);

		metodoPython = CONF.core.servicioPython.metodoPredefinido;
		if(metodoPython == 'all'){
			metodos = ["getWhoIs","getNsLookUp","getNmap","getHarvest","getSublist3r","getWafW00f","getWhatWeb","getSpaghetti","getWpscan","getWpscanner"];
			for(m in metodos)
				servicioPython(busqueda, metodos[m])
		} else {
			servicioPython(busqueda, metodoPython)
		}

		// Añadimos el marcador
		map.addMarkerToSource('markers', [lon,lat], busqueda, ip); 
		startFlying = true;

		// Volamos al punto
		map.flyTo({
			center: [lon,lat],
			zoom: 14,
			bearing: 0,
			speed: 1.6,
			curve: 1.5,
			easing: function (t) {
			    return t;
			}
		});

		// Al terminar de volar le quitamos la clase anterior
		map.once('moveend', function(){
			buscadorInput.className = "";
		});
	}
}

// Llamada al servicio hosteado en localhost:5000
function servicioPython(dominio, metodo){
	$.ajax({
	    type:"POST",
	    dataType: "json",
	    data:{
			domain : dominio,
			metodo : metodo
		},
	    url: "http://localhost:5000/process",
	    success: function(data){
	    	if(!datos[dominio])
	    		datos[dominio] = [];
	    	datos[dominio].push(JSON.parse(data.domain));
	        console.log(datos);
	    }
	})
}

// Pasamos el dominio y la ip para resolver el LonLat y acto seguido, volamos alli
function getLonLatFromIP(ip,busqueda){
	if(expEsIp.test(ip)){
		api = CONF.interfaz.panel.buscador.getLonLatFromIP.api;
		$.ajax ({ 
			url: CONF.interfaz.panel.buscador.getLonLatFromIP.urlAjax,
			data: {api : api, ip: ip},
			type: 'post',
			success : function (responseData) {
				var datos = responseData.split(",");
				var lat = 0;
				var lon = 0;
				var location = 0;
				for(var i = 0;i < datos.length;i++){
					if(datos[i].includes("latitude")){
						lat = datos[i].split(":")[1];
					}
					if(datos[i].includes("longitude")){
						lon = datos[i].split(":")[1];
					}
					if(datos[i].includes("country_code")){
						location = (datos[i].split(":")[1]).replace(/['"]+/g, '');
					}
				}
				var resp = {
					"busqueda" : busqueda,
					"ip" : ip,
					"lon" : lon,
					"lat" : lat,
					"location" : location
				}
				agregarMarcadorYVolar(resp);
			}
		}).done(function(responseData) {
		}).fail(function() {
		   	notificacion.notificar(
		   		"error", 
		   		"getLonLatFromIP", 
		   		CONF.interfaz.panel.buscador.getLonLatFromIP.errorAjax, 
		   		CONF.interfaz.panel.buscador.getLonLatFromIP.errorAjaxDesc
	   		);
		});
	}
}

$(document).keydown(function (e) {
    var keycode1 = (e.keyCode ? e.keyCode : e.which);
    if (keycode1 == 0 || keycode1 == 9) {
        e.preventDefault();
        e.stopPropagation();
    }
});
