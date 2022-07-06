<?php
function getPosition($option){
include 'credentials.php';
    $conn = new mysqli($server, $user, $password, $db);
    $sql = "SELECT P.position FROM player P  WHERE P.name=?;";

    $command = $conn->prepare($sql);
    $command->bind_param("s", $option);
    $command->execute();
    $result=$command->get_result();
    
    if (!$result) {
        http_response_code(500);    
        exit(1);
    }

 
    $position = mysqli_fetch_array($result);

    $conn->close();

    header('Content-Type: application/json; charset=utf-8');
	return $position["position"];

}
?>