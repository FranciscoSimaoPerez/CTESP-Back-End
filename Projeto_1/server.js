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
app.get('/listVideos', function(request, response){
    var file = readFile('./videos.json');
    var jsonFile = JSON.parse(file);
    response.send(jsonFile);
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
    var jsonStringify = JSON.stringify(jsonData, null, 2);
    fs.writeFile('./videos.json', jsonStringify, finished);
    function finished(err){
        console.log("O Video "+ video.Title + " de "+ video.Uploader +" foi adicionado!");
    }
    response.end(jsonStringify);
});

app.delete('/deleteVideo', function(request, response){
    var file = readFile('./videos.json');
    var jsonData = JSON.parse(file); 
    var idVideo = request.body.Id; 
    var size = Object.keys(jsonData).length;
    var eliminado = false; // variável que guarda se o objeto foi apagado
    //console.log(idVideo); 
    if (!idVideo){ // Caso não seja colocado o Id é apresentada uma mensagem
        console.log("É necessário o Id do video a eliminar!");
    }
    else{
        for (var i = 1; i <= size; i++){
            if (jsonData["video"+i].Id == idVideo){
                delete jsonData["video"+i];
                var jsonStringify = JSON.stringify(jsonData, null, 2);
                fs.writeFileSync('./videos.json', jsonStringify); 
                eliminado = true;
                response.send(jsonStringify);
            }
        }
        if (eliminado == true){
            console.log("O Video com o Id '"+ idVideo +"' foi eliminado!");
        }
        else {
            console.log("Não existe o video com esse Id");
        }  
    }
    
});

app.get('/listVideos/:id', function(request, response){
    var file = readFile('./videos.json');
    var jsonData = JSON.parse(file); 
    var idVideo = request.params.id; 
    var size = Object.keys(jsonData).length;
    for (var i = 1; i <= size; i++){
        if (jsonData["video"+i].Id == idVideo){
            var selectedVideo = jsonData["video"+i];
        }
    }
    response.send(selectedVideo);
});

app.get('/listUploader/:Uploader', function(request, response){
    var file = readFile('./videos.json');
    var jsonData = JSON.parse(file); 
    var uploader = request.params.Uploader; 
    var size = Object.keys(jsonData).length;
    var videos = [];
    for (var i = 1; i <= size; i++){
        if (jsonData["video"+i].Uploader == uploader){
            videos = videos + JSON.stringify(jsonData["video"+i],null,4);
        }
    }
    console.log("Videos de "+ uploader +"!");
    response.send(videos);
});

app.get('/AddView/:id', function(request, response){
    var file = readFile('./videos.json');
    var jsonData = JSON.parse(file); 
    var idVideo = request.params.id; 
    var size = Object.keys(jsonData).length;
    for (var i = 1; i <= size; i++){
        if (jsonData["video"+i].Id == idVideo){
            console.log(jsonData["video"+i].Views);
            jsonData["video"+i].Views++;
            jsonStringify = JSON.stringify(jsonData["video"+i].Views, null, 2);
            console.log(jsonData["video"+i].Views);
            fs.appendFile('./videos.json', jsonStringify, finished);
            function finished(err){
                console.log(jsonData["video"+i].Views);
            }
        }
    }
    response.send(jsonStringify);
});