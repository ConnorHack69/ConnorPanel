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
			if(empty($this->buscarDominio($datos["dominio"]))){
				if(isset($datos["dominio"]) && isset($datos["ip"])){
					$dba = new PDO("sqlite:../../db/ConnorPanel.db");
					//if(strrpos($datos["dominio"], '.') == strlen($datos["dominio"]) - 1) --> Para saber si es DNS
					$dba->query('INSERT INTO "dominio" ("dominio","ip","location","lon","lat")
		    					VALUES ("'.$datos["dominio"].'","'.$datos["ip"].'", "'.$datos["location"].'", '.$datos["lon"].', '.$datos["lat"].')') or die("Error insertando dominio");
					$dba->exec('COMMIT');
					return "OK";
				} else {
					return "Falta un parametro (dominio / ip)";
				}
			} else {
				
			}
			return "Ha fallado";
		}
		
	}
?>
