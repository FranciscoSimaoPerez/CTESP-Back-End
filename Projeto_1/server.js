var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var uuidv1 = require('uuid/v1');

app.get('/', (request, response) => response.send('Página Inicial'));

app.use(bodyParser.json());

var server = app.listen(3000, () => console.log('Listening on port 3000!'));

//Função que lê ficheiros
function readFile(fileName){
    var file = fs.readFileSync(fileName, 'utf-8');
    return file;
}

//Pedido GET que pede para listar todos os videos do ficheiro
app.get('/listVideos', function(request, response, next){
    var file = readFile('./videos.json');
    response.send(file);
});

app.post('/addVideo', function(request, response){
    var file = readFile('./videos.json');

    //Converte JSON String para um objecto em Javascript
    var jsonData = JSON.parse(file);
    
    var size = Object.keys(jsonData).length;
    var num = ++size;
    var video = request.body;
    console.log(video);
    video.Id=uuidv1();
    jsonData["video"+num] = video;
    var jsonStringify = JSON.stringify(video, null, 2);
    fs.appendFile('./videos.json', jsonStringify, finished);

    function finished(err){
        console.log('very nice');
    }

    response.send(file);
});

app.delete('/deleteVideo', function(request, response){
    response.send("Delete Video");
});




