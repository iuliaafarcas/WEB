<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    include_once 'credentials.php';
    include_once 'getIdForStringFile.php';

    if ($_SERVER['REQUEST_METHOD'] != 'GET') { 
        http_response_code(403);    
        exit(1);
    }

    $requestBodyAsStr = file_get_contents('php://input');
    $requestBody = json_decode($requestBodyAsStr, TRUE);

    $optionToCheck = $_GET["option"];
    
 

echo getIdForString($optionToCheck);
?>