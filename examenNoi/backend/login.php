<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    include_once 'credentials.php';

    if ($_SERVER['REQUEST_METHOD'] != 'GET') { 
        http_response_code(403);    
        exit(1);
    }
    $username = $_GET["username"];
    $sql = "SELECT * FROM player A where A.name=?;";
    $conn = new mysqli($server, $user, $password, $db);
    $command = $conn->prepare($sql);
    $command->bind_param("s", $username);
    $command->execute();

    $result=$command->get_result();
    if (mysqli_num_rows($result) == 0) {
        http_response_code(401);    
        exit(1);
    }
    $conn->close();

    header('Content-Type: application/json; charset=utf-8');
	echo mysqli_num_rows($result);

?>