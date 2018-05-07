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

//Pedido Post para adicionar video ao ficheiro videos.Json
app.post('/addVideo', function(request, response){
    var file = readFile('./videos.json');
    //Converte JSON String para um objecto em Javascript
    var jsonData = JSON.parse(file);
    var video = request.body;
    console.log(video);
    video.Views=0;
    video.Comments=[];
    video.Id=uuidv1();
    jsonData["video"+video.Id] = video;
    var jsonStringify = JSON.stringify(jsonData, null, 2);
    fs.writeFile('./videos.json', jsonStringify, finished);
    function finished(err){
        response.end("O Video '"+ video.Title + "' de '"+ video.Uploader +" foi adicionado!");
    }
    
});

//pedido delete para eliminar video do ficheiro videos.json
app.delete('/deleteVideo', function(request, response){
    var file = readFile('./videos.json');
    var jsonData = JSON.parse(file); 
    var idVideo = request.body.Id; 
    var eliminado = false; // variável que guarda se o objeto foi apagado
    if (!idVideo){ // Caso não seja colocado o Id é apresentada uma mensagem
        response.send("É necessário o Id do video a eliminar!");
    }
    else{
        if (jsonData["video"+idVideo]){
            delete jsonData["video"+idVideo];
            var jsonStringify = JSON.stringify(jsonData, null, 2);
            fs.writeFileSync('./videos.json', jsonStringify); 
            eliminado = true;
            //response.send(jsonStringify);
        }
    }
    if (eliminado == true){
        response.send("O Video com o Id '"+ idVideo +"' foi eliminado!");
    }
    else {
        response.send("Não existe o video com esse Id");
    }  
    
});

//Pedido Get para ver o video com certo id
app.get('/video/:id', function(request, response){
    var file = readFile('./videos.json');
    var jsonData = JSON.parse(file); 
    var idVideo = request.params.id; 
    var selectedVideo = jsonData["video"+idVideo];
    response.send(selectedVideo);
});

//mostra a lista dos videos de certo uploader
app.get('/listUploader/:Uploader', function(request, response){
    var file = readFile('./videos.json');
    var jsonData = JSON.parse(file); 
    var uploader = request.params.Uploader; 
    var videos = [];
    for (var video in jsonData){
        if (jsonData[video].Uploader == uploader){
            videos = videos + JSON.stringify(jsonData[video],null,4);
        }
    }
    console.log("Videos de "+ uploader +"!");
    response.send(videos);
});

//Adiciona comentário
app.post('/postComment', function(request, response){
    var file = readFile('./videos.json');
    var jsonData = JSON.parse(file); 
    var idVideo = request.body.Id; 
    var commentVideo = request.body.Comment;
    var commented = false;
    if (!idVideo){ // Caso não seja colocado o Id é apresentada uma mensagem
        response.send("É necessário o Id do video a comentar!");
    }
    else{
        for (var video in jsonData){ //percorre o jsonData
            if (jsonData[video].Id == idVideo){
                console.log(jsonData[video]);
                jsonData[video].Comments.push(commentVideo);
                var commentedVideo =  jsonData[video]
                commented = true;
            }
        }
        var jsonStringify = JSON.stringify(jsonData, null, 2);
        fs.writeFile('./videos.json', jsonStringify, finished); 
        function finished(err){
            if (commented == true){
                response.send(commentedVideo);    
            }
            else{
                response.send("O video não existe");
            }
        }
    }
});

//Adiciona Views
app.get('/AddView/:id', function(request, response){
    var file = readFile('./videos.json');
    var jsonData = JSON.parse(file); 
    var idVideo = request.params.id; 
    var addedView = false;
    if (jsonData["video"+idVideo].Id == idVideo){
        jsonData["video"+idVideo].Views++; //Incrementa view
        addedView = true;
    }
    jsonStringify = JSON.stringify(jsonData, null, 2);
    fs.writeFile('./videos.json', jsonStringify, finished);
    function finished(err){
        if (addedView == true){
            console.log("O video "+ jsonData["video"+idVideo].Title +" agora tem " + jsonData["video"+idVideo].Views + " views!");
            response.send("O video "+ jsonData["video"+idVideo].Title +" agora tem " + jsonData["video"+idVideo].Views + " views!");
        }
        else {
            console.log("O video não existe");
            response.send("O video não existe");
        }
    }
});

// pedidos de ordenação de videos por views
app.get('/listAscVideos', function(request, response){
    var file = readFile('./videos.json');
    var jsonData = JSON.parse(file);
    var arrayVideos = [];
    //Armazena os nomes de todos os objetos
    for (var video in jsonData){
        arrayVideos.push(jsonData[video]);
    }
    //Ordena o array por ordem crescente de views
    arrayVideos.sort(function(a, b) {
        return a.Views - b.Views;
      });
    response.send(arrayVideos);
});

app.get('/listDescVideos', function(request, response){
    var file = readFile('./videos.json');
    var jsonData = JSON.parse(file);
    var arrayVideos = [];
    //Armazena os nomes de todos os objetos
    for (var video in jsonData){
        arrayVideos.push(jsonData[video]);
    }
    //ordena o array por ordem decrescente de views
    arrayVideos.sort(function(a, b) {
        return a.Views + b.Views;
      });
    response.send(arrayVideos);
});
