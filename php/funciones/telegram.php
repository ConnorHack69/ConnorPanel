<?php
	$apiToken = $_POST["apiKey"];

	$data = [
	    'chat_id' => $_POST["chatID"],
	    'text' => $_POST["mensaje"]
	];

	$response = file_get_contents("https://api.telegram.org/bot$apiToken/sendMessage?" . http_build_query($data) );

	echo $response;
?>