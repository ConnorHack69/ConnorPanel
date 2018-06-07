var shell = {};

shell.actualDir = '';

shell.mostrarShell = function () {
	var html = '';
	html += '<p class="shell-top-bar">/ConnorPanel/Shell/</p>';
  	html += '<ul id="shellLista" class="shell-body">';
  	html += '<li>' + shell.actualDir + '</li>';
  	html += '</ul>';
  	html += '<input type="text" name="shell" id="shell" onenter="shell.buscar()"/>';
  	$("#divShell").innerHTML = html;
  	// 	 shell.addListenerEnterKeyPress(document.getElementById("shell"));
}

shell.ocultarShell = function () {
	$("#divShell").innerHTML = '';
}

shell.buscar = function(){
	var valorCampo = $("#shell").value();

	var node = document.createElement("li");                 // Create a <li> node
	var textnode = document.createTextNode(valorCampo);         // Create a text node
	node.appendChild(textnode);                              // Append the text to <li>
	$("#shellLista").appendChild(node);
}
shell.addListenerEnterKeyPress = function(element) {
	element.addEventListener("keyup", function(event) {
		event.preventDefault();
	  	// Numero 13 es la tecla "Enter"
	  	if (event.keyCode === 13)
	    	shell.buscar();
	});
}