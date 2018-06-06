var metasploit = {};

metasploit.email_harvest = function(dominio) {
	$.ajax ({ 
		url: "php/funciones/tools/metasploit/email_harvest.php",
		data: {dominio : dominio},
		type: 'post',
		datatype: "json"
	}).done(function(responseData) {
		console.log(responseData)
	}).fail(function(fail) {
	    notificacion.notificar("error", fail);
	}).complete(function(data) {
	});
}