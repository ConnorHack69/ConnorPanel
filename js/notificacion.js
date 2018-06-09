var notificacion = {};

var velocidadNotificacionFadeIn = CONF.interfaz.panel.notificacion.velocidad.fadeIn;
var velocidadNotificacionFadeOut = CONF.interfaz.panel.notificacion.velocidad.fadeOut;
var delayMilisegundos = CONF.interfaz.panel.notificacion.delayMensaje;

var consoleConf = CONF.interfaz.panel.notificacion.console;

var errorPart1 = consoleConf.whatMakesError;
var errorPart2 = consoleConf.descripcionError;

var infoPart1 = consoleConf.whatMakesInfo;
var infoPart2 = consoleConf.descripcionInfo;

var visible = false;

notificacion.notificar = function (type, whatMakesError, texto, descripcionError) {
	var msg = '';
	if(texto == '' && descripcionError == '')
		msg = whatMakesError;
	else
		msg = texto;

	if(!visible){
		$("#notification").text('');
		if(type == "error"){
			$("#notification").addClass("errorNotificacion");
			// Styled console.log
			console.log("%c["+whatMakesError+"] -%c" + msg + " " + descripcionError, 
							"color: " + errorPart1.color + "; font-size:" + errorPart1.fontSize + "; background: " + errorPart1.background + "; padding: " + errorPart1.padding + ";", 
							"color: " + errorPart2.color + "; font-size:" + errorPart2.fontSize + "; background: " + errorPart2.background + "; padding: " + errorPart2.padding + ";");
		} else {
			console.log("%c["+whatMakesError+"] -%c" + msg, 
							"color: " + infoPart1.color + "; font-size:" + infoPart1.fontSize + "; background: " + infoPart1.background + "; padding: " + infoPart1.padding + ";", 
							"color: " + infoPart2.color + "; font-size:" + infoPart2.fontSize + "; background: " + infoPart2.background + "; padding: " + infoPart2.padding + ";");
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