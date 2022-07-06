<?php

function getIdForString($option){
    include 'credentials.php';

    $data = [];
    
    $sql = "SELECT P.id FROM player P WHERE P.name=?;";



    $conn = new mysqli($server, $user, $password, $db);
     
    $command = $conn->prepare($sql);
    $command->bind_param("s", $option);
    $command->execute();
    $result=$command->get_result();
    
    if (!$result) {
        http_response_code(500);    
        exit(1);
    }

    $id = mysqli_fetch_array($result);

    $conn->close();

    header('Content-Type: application/json; charset=utf-8');
    if ($id== null) return -1;
    else
	return $id['id'];
    }
?>