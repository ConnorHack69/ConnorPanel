<?php
	function insertarDominio($conn, $data) {
		$sql = "INSERT INTO dominio (dominio, ip, location, lon, lat)
				VALUES ('".$data["dominio"]."', '".$data["ip"]."', '".$data["location"]."', ".$data["lon"].", ".$data["lat"].")";
		if($conn){
			if ($conn->query($sql) === TRUE) {
			    echo "insertok";
			} else {
			    echo -3;
			}
		} else {
			echo -2;
		}
	}
?>