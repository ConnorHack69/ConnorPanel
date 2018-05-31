<?php
	$resp = array();
	if(!isset($_REQUEST["metodo"]) || !isset($_REQUEST["datos"]))
		$resp["error"] = "Falta un parametro";
	else {
		include 'mydb.php';
		try{
			$db = new MyDB();
			$metodo = $_REQUEST["metodo"];
			$datos = $_REQUEST["datos"];
		      	switch($metodo) {
				case 'buscarDominio' : 
					try {
						$resp["respuesta"] = $db->buscarDominio($datos);
					} catch (Exception $e) {
					    	$resp["error"] = $e->getMessage();
					}
					break;
				case 'insertarDominio' : 
					try {
						$resp["respuesta"] = $db->insertarDominio($datos);
					} catch (Exception $e) {
					    	$resp["error"] = $e->getMessage();
					}
					break;
				default :
					$resp["error"] = "No existe el metodo '".$metodo."'";
			}
		} catch (Exception $ex) {
			$resp["error"] = $ex ;
		}
		
		if(!$db) 
			$resp["error"] = "Error conectando con la Base de Datos!";
		else
			$db->close();
	}
	echo json_encode($resp);
?>
