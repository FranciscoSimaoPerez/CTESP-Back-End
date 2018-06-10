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

// set id to be deleted
$person->id = $data->id;
$person->firstName = $data->firstName;
$person->lastName = $data->lastName;
$person->gender = $data->gender;
$person->age = $data->age;
$person->profession = $data->profession;

// create
if($person->update()){
    echo '{';
        echo '"message":"Person was updated."';
    echo '}';
}
else {
    echo '{';
        echo '"message":"Error updating person."';
    echo '}';
}

?>