<?php
	class MyDB extends SQLite3 {
		
	      	function __construct() {
		 	$this->open('../../db/ConnorPanel.db');
	      	}
		
		function buscarDominio($dominio){
			$result = $this->query("SELECT * FROM dominio where dominio='".$dominio."'");
			$arrayRespuesta = array();
			while($row = $result->fetchArray(SQLITE3_ASSOC) ){
				$arrayRespuesta["'".$row."'"] = $row;
			}
			return $arrayRespuesta;
		}
		
		function insertarDominio($dominio){
			$result = $this->exec("INSERT INTO dominio (idDominio,dominio) VALUES (3,'".$dominio."')");
			if (!$result)
				return $db->lastErrorMsg();
			else
				return "OK";
		}
		
	}
?>
