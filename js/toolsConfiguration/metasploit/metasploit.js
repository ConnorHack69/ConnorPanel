var metasploit = {};

metasploit.email_harvest = function(dominio) {
	$.ajax ({ 
		url: CONF.interfaz.panel.toolsType.metasploit.email_harvest.urlAjax,
		data: {dominio : dominio},
		type: 'post',
		datatype: "json",
        success: function(output) {
            console.log(output);
        }
	});
}