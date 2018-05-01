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

app.delete('/deleteVideo', function(request, response){
    var file = readFile('./videos.json');
    var jsonData = JSON.parse(file); 
    var idVideo = request.body.Id; 
    var eliminado = false; // variável que guarda se o objeto foi apagado
    //console.log(idVideo); 
    if (!idVideo){ // Caso não seja colocado o Id é apresentada uma mensagem
        console.log("É necessário o Id do video a eliminar!");
    }
    else{
        if (jsonData["video"+idVideo].Id == idVideo){
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
    
});

app.get('/video/:id', function(request, response){
    var file = readFile('./videos.json');
    var jsonData = JSON.parse(file); 
    var idVideo = request.params.id; 
    var selectedVideo = jsonData["video"+idVideo];
    response.send(selectedVideo);
});

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

app.post('/postComment', function(request, response){
    var file = readFile('./videos.json');
    var jsonData = JSON.parse(file); 
    var idVideo = request.body.Id; 
    var commentVideo = request.body.Comment;
    var commented = false;
    if (!idVideo){ // Caso não seja colocado o Id é apresentada uma mensagem
        console.log("É necessário o Id do video a eliminar!");
    }
    else{
        for (var video in jsonData){
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
                console.log("Comentário adicionado!");
                response.send(commentedVideo);    
            }
            else{
                console.log("O video não existe");
                response.send("O video não existe");
            }
        }
    }
});

app.get('/AddView/:id', function(request, response){
    var file = readFile('./videos.json');
    var jsonData = JSON.parse(file); 
    var idVideo = request.params.id; 
    var addedView = false;
    if (jsonData["video"+idVideo].Id == idVideo){
        //console.log(jsonData["video"+i].Views);
        jsonData["video"+idVideo].Views++;
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

app.get('/listAscVideos', function(request, response){
    var file = readFile('./videos.json');
    var jsonData = JSON.parse(file);
    var minIdx, temp;
    var arrayVideos = [];
    //Armazena os nomes de todos os objetos
    for (var video in jsonData){
        arrayVideos.push(video);
    }
    //Algoritmo Selection Sort usado para ordenar os videos por views em ordem crescente
    for(var i = 0; i < arrayVideos.length; i++){
        minIdx = i;
        for(var j = i+1; j< arrayVideos.length; j++){
            if(jsonData[arrayVideos[j]].Views < jsonData[arrayVideos[minIdx]].Views){
                minIdx = j;
            }
        }
        temp = jsonData[arrayVideos[i]];
        jsonData[arrayVideos[i]] = jsonData[arrayVideos[minIdx]];
        jsonData[arrayVideos[minIdx]] = temp;
    }
    
    response.send(jsonData);
});

app.get('/listDescVideos', function(request, response){
    var file = readFile('./videos.json');
    var jsonData = JSON.parse(file);
    var maxIdx, temp;
    var arrayVideos = [];
    //Armazena os nomes de todos os objetos
    for (var video in jsonData){
        arrayVideos.push(video);
    }
    //Algoritmo Selection Sort usado para ordenar os videos por views em ordem decrescente
    for(var i = 0; i < arrayVideos.length; i++){
        maxIdx = i;
        for(var j = i+1; j< arrayVideos.length; j++){
            if(jsonData[arrayVideos[j]].Views > jsonData[arrayVideos[maxIdx]].Views){
                maxIdx = j;
            }
        }
        temp = jsonData[arrayVideos[i]];
        jsonData[arrayVideos[i]] = jsonData[arrayVideos[maxIdx]];
        jsonData[arrayVideos[maxIdx]] = temp;
    }
    response.send(jsonData);
});