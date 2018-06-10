<?php
class Person
{
    // database connection and table name
    private $conn;
    private $table_name = "pessoa";

    // object properties
    public $id;
    public $firstName;
    public $lastName;
    public $age;
    public $profession;
    public $gender;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // read persons
    public function read()
    {
        // select all query
        $query = "SELECT * FROM {$this->table_name}";
        // prepare query statement
        $statement = $this->conn->prepare($query);
        // execute query
        $statement->execute();
        return $statement;
    } 
    
    // delete person
    public function delete()
    {
    $query = "DELETE FROM {$this->table_name} WHERE id = {$this->id}";
        // prepare query statement
        $statement = $this->conn->prepare($query);
        // execute query
        $state = $statement->execute();
        $affected_rows = $statement->rowCount();

        if($affected_rows == false){
            echo "Não existe o id";
        }
        else {
            echo "foi eliminado";
            return $state;
        }
        
    }

    // delete person
    public function create()
    {
    $query = "INSERT INTO {$this->table_name} (firstName, lastName, gender, age, profession) VALUES ('{$this->firstName}', '{$this->lastName}', '{$this->gender}', '{$this->age}', '{$this->profession}');";
        // prepare query statement
        $statement = $this->conn->prepare($query);
        // execute query
        $state = $statement->execute();
        return $state;
    }

    // update person

    public function update()
    {
    $query = "UPDATE {$this->table_name} SET firstName = '{$this->firstName}', lastName = '{$this->lastName}', gender = '{$this->gender}', age = '{$this->age}', profession = '{$this->profession}' WHERE id = {$this->id};";
        // prepare query statement
        $statement = $this->conn->prepare($query);
        // execute query
        $state = $statement->execute();
        return $state;
    }
}
