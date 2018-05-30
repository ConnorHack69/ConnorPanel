<?php
	$ipLocal = shell_exec("ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1'");
	$ipArray = explode('.', $ipLocal);
	$ipRed = $ipArray[0] . "." . $ipArray[1] . "." . $ipArray[2] . ".0";
	$nmapCompleto =  shell_exec("nmap -sP " . $ipRed . "/24 --exclude " . $ipLocal);
	echo $_POST["queboton"] . "\n" . $nmapCompleto;
?>
