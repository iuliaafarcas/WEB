<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    include_once 'credentials.php';
    include_once 'getIdForString.php';
    include_once 'getIdForString2.php';
    include_once 'getObjectNumber.php';
 


    if ($_SERVER['REQUEST_METHOD'] != 'POST') { 
        http_response_code(403);    
        exit(1);
    }

    $requestBodyAsStr = file_get_contents('php://input');
    $requestBody = json_decode($requestBodyAsStr, TRUE);

    $player1 = $requestBody["player1"];
    $player2 = $requestBody["player2"];
    $teamName = $requestBody["teamName"];
   

    $conn = new mysqli($server, $user, $password, $db);
   
    // $subscribers=getSubscribers($channelId);
    // $finalSubscribers=do1( $username,$date,$subscribers);
    
    // $finalSubscribers = join(" ", $finalSubscribers);

    $IdPlayer1=getIdForString($player1);
    $IdPlayer2=getIdForString($player2);
    $IdTeam=getIdForString2($teamName);
    $teamMemberNumber=getObjectNumber();
    $teamMemberNumber++;

    $sql = "Insert into teamMember(id, idPlayer1, idPlayer2, idTeam) values (?,?,?,?)";
    $command = $conn->prepare($sql);
    
    $command->bind_param("iiii",$teamMemberNumber, $IdPlayer1,$IdPlayer2,$IdTeam);

    $command->execute();
    
    $conn->close();

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode('');
    exit(0);

?>