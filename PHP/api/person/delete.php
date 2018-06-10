<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Acess-Control-Allow-Methods:POST");
header("Acess-Control-Max-Age:3600");
header("Acess-Control-Allow-Headers: Content-Type,Acess-Control-Allow-Headers,Authonrization,X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../objects/person.php';

// instantiate database and person object
$database = new Database();
$db = $database->getConnection();

// initialize object
$person = new Person($db);

// get id
$data = json_decode(file_get_contents("php://input"));

echo "id".$data->id;

// set id to be deleted
$person->id = $data->id;

// delete
if($person->delete()){
    echo '{';
        echo '"message":"Person was deleted"';
    echo '}';
}
else {
    echo '{';
        echo '"message":"Unable to delete person."';
    echo '}';
}

?>
