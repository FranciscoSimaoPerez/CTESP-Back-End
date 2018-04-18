// import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
//create express instance
const app = express();
app.use(bodyParser.json());

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
    var file = readFile('./persons.json');
    response.send(file);
});

app.post('/addPerson', function(request, response){
    var file = readFile('./persons.json');
    var jsonData = JSON.parse(file);
    var size = Object.keys(jsonData).length;
    var id = ++size;
    var p = request.body;
    p.id=id;
    jsonData["person"+id] = p;
    response.send(jsonData);
});   

app.delete('/deletePerson', function(request, response){
    var file = readFile('./persons.json');
    var jsonData = JSON.parse(file);
    delete jsonData['person'+request.body.id];
    response.send(jsonData);
});

app.get('/listUsers/:id', function(request, response){
    var file = readFile('./persons.json');
    var jsonData = JSON.parse(file);
    response.send(jsonData["person"+ request.params.id]);
});

app.listen(3000, () => console.log("Port 3000"));