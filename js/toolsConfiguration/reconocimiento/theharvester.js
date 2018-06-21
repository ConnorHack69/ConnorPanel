var theharvester = {};

theharvester.email_harvest = function(dominio) {
	/*$.ajax ({ 
		url: CONF.interfaz.panel.toolsType.reconocimiento.tools.theharvester.urlAjax,
		data: {dominio : dominio},
		type: 'post',
		datatype: "json",
        success: function(output) {
            console.log(output);
        }
	});*/
	$.ajax({
	  type: "POST",
	  url: "/ConnorPanel/services.py",
	  data: { param: dominio }
	}).done(function( o ) {
	   // do something
	});
}