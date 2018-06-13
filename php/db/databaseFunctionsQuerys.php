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
/*
	echo "<tr style='background-color:#999999'>";
    while($mysql_query_fields = mysqli_fetch_field($mysql_query)){
        $mysql_fields[] = $mysql_query_fields->name;
        echo "<th align='left'>".ucfirst($mysql_query_fields->name)."</th>";
    }
    echo "</tr>";
    */
	/*function getDominios($conn, $data) {
		$tabla = $data["tabla"];
		$filtros = $data["filtros"];
		$sql = "SELECT * FROM " . $tabla . " WHERE " . $filtros;
		if($conn){
			$html = '<table>';
			if ($result = $conn->query($sql)) {
			    $fieldcount = mysqli_num_fields($result);
			    while ($row = $result->fetch_assoc()) {
					$html += '<tr>';
					for ($i = 0; $i < $fieldcount; $i++) {
					    $html += '<td>'.$row[mysqli_fetch_field($sql)[$i]->name].'</td>';
					}
					$html += '</tr>';
			    }
			}
			$html += '</table>';
			var resp = {};
			resp["getDominios"] = $html; 
			echo $resp;
		} else {
			echo -2;
		}
	}*/
?>