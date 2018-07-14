$(document).ready(function() {

	$('form').on('submit', function(event) {
		$('#successAlert').text("");
		$('#successAlert').hide();
		$('#errorAlert').hide();
		domi=$('#domainInput').val()
		meth=$('input[name=metodo]:checked', '#formInfoGath').val()
		$('#infoAlert').text("Cargando: " + meth).show();
		if(meth == 'all'){
			metodos = ["getWhoIs","getNsLookUp","getNmap","getHarvest","getSublist3r","getWafW00f","getWhatWeb","getSpaghetti","getWpscan","getWpscanner"];
			for(m in metodos)
				callPython(domi, metodos[m])
		} else {
			callPython(domi, meth)
		}
		event.preventDefault();

	});

	function callPython(dominio, metodo){
		$.ajax({
			data : {
				domain : dominio,
				metodo : metodo
			},
			type : 'POST',
			url : 'http://localhost:5000/process',
			dataType: 'json'
		})
		.done(function(data) {
			if (data.error) {
				$('#errorAlert').text(data.error).show();
				$('#successAlert').hide();
				$('#infoAlert').hide();
			} else {
				$('#successAlert').text($('#successAlert').text() + data.domain).show();
				datos = JSON.parse(data.domain.split("\n")[0]);
				
				// Subdominios?
				if(datos["subdomains_"+dominio])
					for(subDom in datos["subdomains_"+dominio])
						if(datos["subdomains_"+dominio][subDom]["domain"] != "")
							callPython(datos["subdomains_"+dominio][subDom]["domain"], metodo)

				$('#errorAlert').hide();
				$('#infoAlert').hide();
			}
		});
	}
});