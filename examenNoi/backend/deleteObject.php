<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    include_once 'credentials.php';
    if ($_SERVER['REQUEST_METHOD'] != 'DELETE') { 
        http_response_code(403);    
        exit(1);
    }

    $id = $_GET["id"];
  
    $data = [];
    
    $sql = " delete from player where id=? ";
    $conn = new mysqli($server, $user, $password, $db);
     
    $command = $conn->prepare($sql);
    $command->bind_param("s", $id);
    $command->execute();
    $result=$command->get_result();
    
    if (!$result) {
        http_response_code(500);    
        exit(1);
    }

 
   
   

    $conn->close();

    header('Content-Type: application/json; charset=utf-8');
	echo json_encode("");


?>