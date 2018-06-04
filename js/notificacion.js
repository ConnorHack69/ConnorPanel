var notificacion = {};

var velocidadNotificacionFadeIn = CONF.interfaz.panel.notificacion.velocidad.fadeIn;
var velocidadNotificacionFadeOut = CONF.interfaz.panel.notificacion.velocidad.fadeOut;
var delayMilisegundos = CONF.interfaz.panel.notificacion.delayMensaje;

var visible = false;

notificacion.notificar = function (type, texto) {
	if(!visible){
		$("#notification").text('');
		if(type == "error")
			$("#notification").addClass("errorNotificacion");
		else {
			$("#notification").removeClass("errorNotificacion");
		}
		// Depende el tipo ("error", "info") deberá llevar diferente color
		$("#notification").fadeIn(velocidadNotificacionFadeIn).append(texto).delay(delayMilisegundos).fadeOut(velocidadNotificacionFadeOut);
		$.when(
			$('#notification').fadeOut(velocidadNotificacionFadeOut)
		).done(function() {
    		visible = false;
		});
		visible = true;
	}
	$("#notification").click(function(){
	       notificacion.cerrar();
	});
}

notificacion.cerrar = function () {
	$("#notification").fadeOut(velocidadNotificacionFadeOut);
	visible = false;
}