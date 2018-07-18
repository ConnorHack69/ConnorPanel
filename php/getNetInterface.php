<?php
	$interfaces = shell_exec("iwconfig | grep ESSID");
	$miIP = shell_exec("ifconfig| grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1'");
	$arrayInt = explode("\n", $interfaces);
	$existe = false;
	foreach($arrayInt as $linea){
		if(strpos($linea, "ESSID") !== false){
			$arrayLinea = explode(" ", $linea);
			$arrayLineaNombre = explode("ESSID:", $linea);
			$ip = trim(preg_replace('/\s+/', '', $miIP));
			$nombreRed = str_replace(' ', '', str_replace('"', '', $arrayLineaNombre[1]));
			$array = ["interfaz" => $arrayLinea[0], "miIP" => $ip, "nombreRed" => $nombreRed];
			$existe = true;
			echo json_encode($array);
		}
		if(strpos($linea, "no wireless")){
			$noHayWifi = true;
		}
	}
	if(!$existe)
		echo "nada"
?>
