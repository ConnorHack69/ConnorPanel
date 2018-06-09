var ddbb = {};

ddbb.conectar = function(parametrosInsertarDominio) {
	$.ajax ({ 
		url: CONF.baseDatos.urlAjax,
		data: parametrosInsertarDominio,
		type: 'post',
		datatype: "json"
	}).done(function(responseData) {
		switch(responseData){
			case "insertok":
				//notificacion.notificar("info", "BBDD", CONF.baseDatos.msgInsertOK);
				break;
			case "-1":
				notificacion.notificar("error", "BBDD", CONF.baseDatos.urlAjaxErrorMsg + " '" + metodo + "'", CONF.baseDatos.urlAjaxDesc);
				break;
			case "-2":
				notificacion.notificar("error", "BBDD", CONF.baseDatos.msgNoConn, "");
				break;
			case "-3":
				notificacion.notificar("error", "BBDD", CONF.baseDatos.msgErrorSql, "");
				break;
			default:
				notificacion.notificar("error", "BBDD", CONF.baseDatos.msgErrorSwitch);
				break;
		}
	}).fail(function(fail) {
	}).complete(function(data) {
	});
}