<?php

    
    function getObjectNumber(){
        include 'credentials.php';

   
    $conn = new mysqli($server, $user, $password, $db);

    $sql = "SELECT COUNT(*) FROM teamMember T";

    $command = $conn->prepare($sql);
    
    $command->execute();
   
    $result=$command->get_result();
    
    if (!$result) {
        http_response_code(500);    
        exit(1);
    }

 
    $number = mysqli_fetch_array($result);

    $conn->close();

    header('Content-Type: application/json; charset=utf-8');
	return json_encode($number["0"]);}
    
?>