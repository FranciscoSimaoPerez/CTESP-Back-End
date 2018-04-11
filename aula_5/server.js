// import express module
const express = require('express');
const bodyParser = require('body-parser');
//create express instance
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

var fs = require('fs');

var fileContent = fs.readFileSync("./persons.json", 'utf-8');

//Função que lê ficheiros
function readFile(fileName){
    var file = fs.readFileSync(fileName, 'utf-8');
    return file;
}

//GET request to list all the users from the file
app.get('/listUsers', function(request, response){
    var file = readFile('./persons.json');
    response.send(file);
});

app.post('/addPerson', function(request, response){
    var file = readFile('./persons.json');
    var jsonData = JSON.parse(file);
    var size = Object.keys(jsonData).length;
    var id = size++;
    var p = request.body;
    p.id=id;
    jsonData["person"+id] = p;
    response.send(jsonData);
});   

//pp.get('/', (req, res) => res.send(fileContent))