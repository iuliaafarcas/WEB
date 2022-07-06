<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    include_once 'credentials.php';

    if ($_SERVER['REQUEST_METHOD'] != 'GET') { 
        http_response_code(403);    
        exit(1);
    }

    $requestBodyAsStr = file_get_contents('php://input');
    $requestBody = json_decode($requestBodyAsStr, TRUE);

    $name = $_GET["name"];
    
    $data = [];
    
    $sql = "SELECT T.* FROM team T inner join teamMember Tm on T.id=Tm.idTeam inner join player P on P.id=Tm.idPlayer1 or Tm.idPlayer2=P.id where P.name=?;";



    $conn = new mysqli($server, $user, $password, $db);
     
    $command = $conn->prepare($sql);
    $command->bind_param("s", $name);
    $command->execute();
    $result=$command->get_result();
    
    if (!$result) {
        http_response_code(500);    
        exit(1);
    }

    // pag
    if (!isset ($_GET['page']) ) {  
        $page = 0;  
    } else {  
        $page = $_GET['page'];  
    }
    $objects=[];
    for($i=0;$i<2*$page; $i++)
        { mysqli_fetch_assoc($result); }
    $i=0;
    while ($i<2 && ($row = mysqli_fetch_assoc($result))) {
        $objects[$i]["id"]=$row["id"];
                $objects[$i]["name"]=$row["name"];
                $objects[$i]["homeCity"]=$row["homeCity"];
        $i=$i+1;
    }
   

    $conn->close();

    header('Content-Type: application/json; charset=utf-8');
	echo json_encode($objects);


?>