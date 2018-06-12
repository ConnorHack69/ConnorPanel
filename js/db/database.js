var ddbb = {};

ddbb.conectar = function(parametros) {
	$.ajax ({ 
		url: CONF.baseDatos.urlAjax,
		data: parametros,
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

ddbb.getTabla = function(parametros){
	$.ajax ({ 
		url: CONF.baseDatos.urlAjax,
		data: parametros,
		type: 'post',
		datatype: "json"
	}).done(function(responseData) {
		switch(responseData){
			case "insertok":
				//notificacion.notificar("info", "BBDD", CONF.baseDatos.msgInsertOK);
				break;
			case responseData["getDominios"]:
				console.log(responseData["getDominios"]);
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