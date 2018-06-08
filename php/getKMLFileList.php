<?php
	$img_dir = $_POST["kml"];
	$files = scandir($img_dir);
	echo json_encode($files);
?>