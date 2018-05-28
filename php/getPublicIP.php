<?php
	$scriptName = "curl -s http://whatismyip.akamai.com/";

	exec($scriptName,$out);
	foreach($out as $key => $value){
		echo $value;
	}

?>
