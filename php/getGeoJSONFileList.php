<?php
	$img_dir = $_POST["geojson"];
	$files = scandir($img_dir);
	echo json_encode($files);
?>