<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    include_once 'credentials.php';

    if ($_SERVER['REQUEST_METHOD'] != 'GET') { 
        http_response_code(403);    
        exit(1);
    }

    $name = $_GET["name"];

    $data = [];
    
    $sql = "select Tt.* from team Tt inner join teamMember T on T.idTeam=Tt.id inner join Player P  on P.id= T.idPlayer1 or P.id=T.idPlayer2 where P.name=?;";
    $conn = new mysqli($server, $user, $password, $db);
    

    $command = $conn->prepare($sql);
    $command->bind_param("s", $name);
    $command->execute();

    $result=$command->get_result();

    if (!$result) {
        http_response_code(500);    
        exit(1);
    }

    $i=0;
    $objects = array();
    while ($i<4 && ($row = mysqli_fetch_assoc($result))) {
       
        $objects[$i]["id"]=$row["id"];
        $objects[$i]["name"]=$row["name"];
        $objects[$i]["homeCity"]=$row["homeCity"];
                
             
        $i=$i+1;
    }

    $conn->close();

    header('Content-Type: application/json; charset=utf-8');
	echo json_encode($objects);



?>