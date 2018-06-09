<?php
	include 'conection.php';
	include 'databaseFunctionsQuerys.php';

	// Nombre del metodo descrito en el CONF.baseDatos.methods
	$method = $_POST["metodo"];

	// Los datos que necesite el metodo que se haya creado en 'databaseFunctionsQuerys.php'
	$data = $_POST["datos"];

	// Tenemos que pasar CONF.baseDatos.methods para recorrer todos los métodos.
	// De esta forma, sino está descrito, no llamamos por si no se ha creado la funcion con el mismo nombre
	$methodsConf = $_POST["bbddMethodsConf"];
	$added = false;

	foreach ($methodsConf as &$methodName) {
	    if($methodName == $method){
	    	$method($conn, $data);
	    	$added = true;
	    }
	}
	// Si no existe, respondemos con -1. 
	// Luego en el success, tenemos que comparar el responseData del ajax con -1 y si lo es,
	// Mostrar un notification.notificar("error", "MENSAJE AQUI")
	if(!$added)
		echo -1;

	$conn->close();
?>