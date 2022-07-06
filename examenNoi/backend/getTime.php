<?php
function getTime($option){
include 'credentials.php';
    $conn = new mysqli($server, $user, $password, $db);
    $sql = "SELECT S.timee FROM schedule S  WHERE S.id=?;";

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
	return $position["timee"];

}
?>