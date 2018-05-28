<?php
	$busqueda = $_POST['busqueda'];
	echo shell_exec('nslookup ' . $busqueda);
?>
