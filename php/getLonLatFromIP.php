<?php
	$ip = $_POST['ip'];
	$api = $_POST['api'];
	//echo shell_exec('curl http://freegeoip.net/json/' . $ip);
	echo shell_exec('curl http://api.ipstack.com/' . $ip . '?access_key=' . $api . '&output=json&legacy=1');
?>
