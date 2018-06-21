<?php
	$dominio = $_POST["dominio"];

	//echo exec("theharvester -d " . $dominio . " -l 1000 -b google -f /var/www/html/ConnorPanel/php/funciones/tools/thaharvester/" . $dominio . ".xml");
	echo exec("email_harvest.sh");
?>