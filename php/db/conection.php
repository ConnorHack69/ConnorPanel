<?php
	$servername = "localhost";
	$username = "root";
	$password = "001FAF7C6677";
	$dbname = "panel";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
?>
