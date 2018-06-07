var herramientas = {};
herramientas.panelesActivos = [];

var botoneraConf = CONF.interfaz.panel.botonera;

// CARGA EL MENU PRINCIPAL DE ARRIBA SEGUN LA CONFIGURACIÓN
for(var boton in botoneraConf.botones){
	if(!botoneraConf.botones[boton].usaLibreriaExterna){
		herramientas[boton] = function(e){
			// En esta función entran todos los botones del menu superior al clicar en ellos
			var botonPulsado = null;

			for(var b in botoneraConf.botones){
				if(botoneraConf.botones[b].texto == e.textContent)
					botonPulsado = b;
			}

			var busqReali = botoneraConf.botones[botonPulsado];

			// Se crea una panel con la configuración recogida por defecto
			var panel = herramientas.crearPanel(
											busqReali.panelFuncion.titulo, 
											busqReali.panelFuncion.width, 
											busqReali.panelFuncion.height, 
											busqReali.panelFuncion.titulo, 
											busqReali.panelFuncion.botonDeSalir
			);

			// Le añadimos el titulo
			panel.addTitulo(botonPulsado, busqReali.texto);

			// Le añadimos los botones que tenga configurados
			for(var b in busqReali.panelFuncion.botones){
				panel.addBoton(botonPulsado, busqReali.panelFuncion.botones[b].texto,busqReali.panelFuncion.botones[b].funcion);
			}

			herramientas.panelesActivos[busqReali.panelFuncion.titulo] = panel;
		};
	}
}

// CREA UN PANEL
herramientas.crearPanel = function(id, width, height, className, botonDeSalir){
	var panel = new Panel(id, width, height, className, botonDeSalir);
  	$("#" + id).click(function() {
    	$("div").not(this).css("z-index", "1");
    	$(this).css("z-index", "2");
  	});
  	return panel;
};

// AL INICIAR:
herramientas.iniciarBotonera = function(){
	var panel = herramientas.crearPanel(
									botoneraConf.id, 
									botoneraConf.width, 
									botoneraConf.height, 
									botoneraConf.className, 
									botoneraConf.botonDeSalir
	);
	for(var bot in botoneraConf.botones){
		panel.addBoton(botoneraConf.id, botoneraConf.botones[bot]["texto"],botoneraConf.botones[bot]["funcion"]);
	}
	herramientas.panelesActivos[botoneraConf.id] = panel;
};

herramientas.iniciarBotonera();