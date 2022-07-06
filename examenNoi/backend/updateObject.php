<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    include_once 'credentials.php';
    include_once 'getPosition.php';
   


    if ($_SERVER['REQUEST_METHOD'] != 'POST') { 
        http_response_code(403);    
        exit(1);
    }

    $requestBodyAsStr = file_get_contents('php://input');
    $requestBody = json_decode($requestBodyAsStr, TRUE);

    $playerName = $requestBody["playerName"];
    $position = $requestBody["position"];
  

    $conn = new mysqli($server, $user, $password, $db);
   
    $finalPositions=array();
    $finalPositions=getPosition($playerName);
    $finalPositions.=" ";
    $finalPositions.=$position;

   print_r($finalPositions);

    $sql = "UPDATE player P set P.position=? where P.name=?";
    $command = $conn->prepare($sql);
    
    $command->bind_param("ss", $finalPositions,$playerName);

    $command->execute();
    
    $conn->close();

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode('');
    exit(0);

?>