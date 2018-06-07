var herramientas = {};

herramientas.busquedasRealizadas = function(){
	var panel = herramientas.crearPanel("busquedasRealizadas", 200, 500);
	panel.addTitulo("Busquedas Realizadas");
	panel.addBoton("PULSAME","alert(123)");
};

herramientas.ingenieriaForense = function(){
	var panel = herramientas.crearPanel("ingenieriaForense", 200, 500);
	panel.addTitulo("Ingenieria Forense");
	panel.addBoton("Otra prueba","alert('Ingenieria Forense')");
};

herramientas.crearPanel = function(id, height, width){
	var panel = new Panel(id, height, width);
  	$("#" + id).click(function() {
    	$("div").not(this).css("z-index", "1");
    	$(this).css("z-index", "2");
  	});
  	return panel;
};