<?php
	$dominio = $_POST["dominio"];

	$myfile = fopen("email_harvest.rc", "w") or die("Unable to open file!");

	$txt = "use auxiliary/gather/search_email_collector\n";
	fwrite($myfile, $txt);

	$txt = "set DOMAIN ".$dominio."\n";
	fwrite($myfile, $txt);

	$txt = "set OUTFILE /var/www/html/ConnorPanel/php/funciones/tools/metasploit/".$dominio."_email.txt\n";
	fwrite($myfile, $txt);

	$txt = "run\n";
	fwrite($myfile, $txt);

	$txt = "exit\n";
	fwrite($myfile, $txt);
	fclose($myfile);

	$myfile = fopen("email_harvest.sh", "w") or die("Unable to open file!");

	$txt = "/usr/share/metasploit-framework/./msfconsole -r /var/www/html/ConnorPanel/php/funciones/tools/metasploit/email_harvest.rc &\n";
	fwrite($myfile, $txt);
	fclose($myfile);

	exec("/var/www/html/ConnorPanel/php/funciones/tools/metasploit/./email_harvest.sh"); // Probar esto sin guardar en variable

?>