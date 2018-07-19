// Funcion que se pone a la escucha y cambia el texto del parametro "buscador" segun lo que se haya dicho por microfono
function escuchar(){ 
	var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
	recognition.lang = 'es-ES';
	recognition.continuous = true;
	recognition.interimResults = true;
	//recognition.maxAlternatives = 5;

	recognition.onresult = function(event) {
		document.getElementById("buscador").value = event.results[0][0].transcript;
		busquedaPorVoz = true;
		actualizarTamanioBuscador();
	};

	recognition.start();
}
