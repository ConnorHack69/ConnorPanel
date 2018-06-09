var telegram = {};

var token = CONF.interfaz.panel.redesSociales.telegram.apiKey;
var chatID = CONF.interfaz.panel.redesSociales.telegram.chatID;

telegram.enviarMensaje = function(){
	$.ajax ({ 
		url: CONF.interfaz.panel.redesSociales.telegram.urlAjax,
		data: { apiKey : token , chatID : chatID, mensaje : $("#buscador").val() },
		type: 'post',
		datatype: "json"
	}).done(function(responseData) {
		console.log(responseData)
	}).fail(function(fail) {
	    notificacion.notificar(
	    	"error", 
	    	"Telegram", 
	    	fail, 
	    	"No se ha podido enviar el mensaje"
	    );
	}).complete(function(data) {
	});
}