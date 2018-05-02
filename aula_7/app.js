// import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
//create express instance
const app = express();
app.use(bodyParser.json());

var mysql = require('mysql');
var connection = mysql.createConnection({
    host:"localhost",
    user:"root", 
    password:"",
    database:"aula7"
});

console.log("MySql conection created at %s with database: %s", connection);

connection.connect();

connection.query('Select 1 + 1 as solution', function(err){
    if (err) throw err;
    console.log("Connected!");
});

app.get('/', function(request, response){
    response.send("Pagina Inicial");
});


//Função que lê ficheiros
function readFile(fileName){
    var file = fs.readFileSync(fileName, 'utf-8');
    return file;
}

//GET request to list all the users from the file
app.get('/listUsers', function(request, response){
    connection.query('SELECT * FROM aula7.pessoa;', function(err, rows, fields){
        if(err) throw err;
        response.send(rows);
    });
});

app.post('/addPerson', function(request, response){
    var pessoa = request.body;
    var firstName = pessoa.firstName;
    var lastName = pessoa.lastName;
    var age = pessoa.age;
    var gender = pessoa.gender;
    var profession = pessoa.gender;
    
    var values = [[firstName, lastName, age, gender, profession]];
    var sql = "INSERT INTO aula7.pessoa (firstName, lastName, age, gender, profession) VALUES ?";
    connection.query(sql,[values], function(err, result, fields){
        if(err) throw err;
            response.send(result.affectedRows);
    });
});   

app.delete('/deletePerson', function(request, response){
    var Pessoa = request.body;
    var values = [[Pessoa.id]]; 
    var sql = "DELETE FROM aula7.pessoa WHERE id=?";
    connection.query(sql,[values], function(err, rows, fields){
        if(err) throw err;
            response.send(rows);
    });
});

app.get('/listUsers/:id', function(request, response){
    var file = readFile('./persons.json');
    var jsonData = JSON.parse(file);
    response.send(jsonData["person"+ request.params.id]);
});

app.listen(3000, () => console.log("Port 3000"));