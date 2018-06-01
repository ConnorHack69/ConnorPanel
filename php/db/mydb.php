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
		
		function insertarDominio($datos){
			$dba = new PDO("sqlite:../../db/ConnorPanel.db");
			$esDNS = 0;
			if(strrpos($datos["dominio"], '.') == strlen($datos["dominio"]) - 1)
				$esDNS = 1;
			$dba->query('INSERT INTO "dominio" ("dominio","ip","location","lon","lat","dns","idDominioPadre")
    					VALUES ("'.$datos["dominio"].'","'.$datos["ip"].'", null, null, null, '.$esDNS.', null)') or die("Error insertando dominio");
			$dba->exec('COMMIT');
			return "OK";
		}
		
	}
?>
