<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    include_once 'credentials.php';
    include_once 'getTime.php';
   


    if ($_SERVER['REQUEST_METHOD'] != 'POST') { 
        http_response_code(403);    
        exit(1);
    }

    $requestBodyAsStr = file_get_contents('php://input');
    $requestBody = json_decode($requestBodyAsStr, TRUE);

    $scheduleId = $requestBody["scheduleId"];
    $date=$requestBody["date"];
    $username = $requestBody["username"];
  

    $conn = new mysqli($server, $user, $password, $db);
   
    $finalTime=array();
    $finalTime=getTime($scheduleId);
    $finalTime.=" ";
    $finalTime.=$username;
    $finalTime.=" ";
    $finalTime.=$date;


 

    $sql = "UPDATE schedule S set S.timee=? where S.id=?";
    $command = $conn->prepare($sql);
    
    $command->bind_param("si", $finalTime,$scheduleId);

    $command->execute();
    
    $conn->close();

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode('');
    exit(0);

?>