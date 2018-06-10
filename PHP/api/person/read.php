<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/person.php';

// instantiate database and person object
$database = new Database();
$db = $database->getConnection();

// initialize object
$person = new Person($db);

// query persons
$stmt = $person->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if ($num > 0) {

    // persons array
    $persons_arr = array();

    // get results from DB
    $result = $stmt->fetchAll();

    // count results
    $result_length = count($result);

    for ($i = 0; $i < $result_length; $i++) {
        // Import variables from the array to a symbol table
        extract($result[$i]);
        $person_item = array(
            "id" => $id,
            "firstName" => $firstName,
            "lastName" => $lastName,
            "age" => $age,
            "profession" => $profession,
            "gender" => $gender,
        );
        array_push($persons_arr, $person_item);
    }
    echo json_encode($persons_arr);
} else {
    echo json_encode(
        array("message" => "No persons found.")
    );
}