<?php
	$ip = $_POST['ip'];
	echo shell_exec('curl http://freegeoip.net/json/' . $ip);
?>
