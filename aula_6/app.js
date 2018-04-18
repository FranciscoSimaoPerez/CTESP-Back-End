var express = require('express');
var fs = require('fs');
var app = express();

fs.writeFileSync('./log.txt', function(err){
    if(err) throw err;
    console.log('Ficheiro criado!');
});

app.get('/', function (req, res){
    res.send('root');
});

app.get('/hello', function(req,res){
    var body = 'hello world';
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type':'text/plain',
    });
    res.end(body);
});


app.get('/bye', function(req,res){
    var dat = fs.readFileSync('./index.html','utf-8');
    var body = dat;
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type':'text/html', //diferença entre texto e html
    });
    res.end(body);
});

app.get('/data', function(req,res){
    var html = fs.readFileSync('./index.html','utf-8');
    var data = new Date();
    var dat = html.replace('{Template}',data)
    var body = dat;
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type':'text/html', //diferença entre texto e html
    });
    res.end(body);
});

app.get('/user/:name', function(req, res){
    var html = fs.readFileSync('./users.html', 'utf-8');
    var lol = req.params.name;
    var dat = html.replace('{name}', lol);
    res.writeHead(200, {
        'Content-Lenght': Buffer.byteLength(dat),
        'Content-Type': 'text/html',
    });
    res.end(dat);
})
 
app.listen(3000, () => console.log("Port 3000"));