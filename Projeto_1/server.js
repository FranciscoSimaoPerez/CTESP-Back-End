var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var uuidv1 = require('uuid/v1');
var rawFileData = fs.readFileSync('./videos.json', 'utf-8');
var FileData = JSON.parse(rawFileData);

app.get('/', (request, response) => response.send('Página Inicial'));

app.use(bodyParser.json());

var server = app.listen(3000, () => console.log('Listening on port 3000!'));

//Função que lê ficheiros
function readFile(fileName){
    var data = fs.readFileSync(fileName, 'utf-8');
    var file = JSON.parse(data, null, 2);
    return file;
}

//Pedido GET que pede para listar todos os videos do ficheiro
app.get('/listVideos', function(request, response, next){
    var file = readFile('./videos.json');
    response.send(file);
});

app.get('/addVideo', function(request, response){
     
});

/*
app.get('/addVideo', function(request, response){
    let novoVideo =
    {
        id: uuidv1(),
        Uploader:"Josefina",
        Title:"lul",
        Description:"Meme review",
        Length:"11:00",
        URL:"https://www.youtube.com/watch?v=Xgm_QaQqJvI&t=2650s",
        Views:"1000000",
        Comments:"['lul ur mom', 'nice']",
        Tags:"['Fun', 'OMG']"
    };
    var file = readFile('./videos.json');
    data = JSON.stringify(novoVideo, null, 2);
    file = file + data;  
    fs.writeFile('videos.json', file, (err) => {  
        if (err) throw err;
        response.send('Video Adicionado com sucesso');
    });
});
*/

app.delete('/deleteVideo', function(request, response){
    response.send("Delete Video");
});




