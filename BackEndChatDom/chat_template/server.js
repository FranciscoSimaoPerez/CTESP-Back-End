// require and instantiate express
var express = require('express');
var app = express();
var fs = require('fs');

app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));

// express server
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port);
});

// route
app.get('/', function (req, res) {
    res.render('index.ejs');
});

var utilizadores = {};
var onlineUsers = [];
var io = require('socket.io')(server);
const uuidv1 = require('uuid/v1');
var date = new Date();

io.on('connection', function (socket) {
    socket.username = "User" + uuidv1();
    utilizadores[socket.username] = socket.id;
    console.log(" New User Connected : " + socket.username + socket.id)
    fs.appendFile('log.txt', date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + socket.username + " " + socket.id + " has connected" + "\r" + "\n", (err) => {
        if (err) throw err;
        // console.log('The file has been saved!');
    });


    //default username
    io.sockets.emit('new_connection', { message: socket.username + " " + socket.id + " has joined the room " + "<br>" });
    var user = { id: socket.id, username: socket.username };
    onlineUsers.push(user);
    io.sockets.emit('online_users', onlineUsers);
    console.log(onlineUsers);
    socket.on('new_username', (data) => {
        //broadcast the new message
        
        delete utilizadores[socket.username];
        var exist = false;
        for (var x = 0; x < onlineUsers.length; x++){
            if(onlineUsers[x].username == data.username){
                exist = true;
            }
        }
        if (exist == true){
            io.sockets.connected[socket.id].emit('new_message', { message: "Username já existe", username: socket.username });
        }
        else {
            oldUsername = socket.username
            socket.username = data.username;
            for (i = 0; i < onlineUsers.length; i++) {
                if (socket.id == onlineUsers[i].id) {
                    onlineUsers[i].username = socket.username;
                    console.log(onlineUsers);
                    utilizadores[socket.username] = socket.id;
                }
            }
            io.sockets.emit('new_username', { message: oldUsername + " " + socket.id + " has changed his username to " + data.username });
            io.sockets.emit('online_users', onlineUsers);
        }
        
    })


    //listen on new_message  
    socket.on('new_message', (data) => {
        fs.appendFile(date.getDate() + '_' + date.getMonth() + '_' + date.getFullYear() + '.txt', date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + socket.username + socket.id + " : " + data.message + "\r" + "\n", (err) => {
        if (err) throw err;
            // console.log('The file has been saved!');
        });
        if(data.message==""){
            io.sockets.connected[socket.id].emit('new_message', { message: "Não é possível mandar mensagen vazias!", username: socket.username });
        }
        else {
            if (data.message[0] == "/" && data.message[1] == "w") {
                var idsend = 0;
                var texto = data.message.split(" ", 2);
                for (var i in utilizadores) {
                    if (i == texto[1]) {
                        idsend = utilizadores[i];
                    }
                }
                
                var userWhisper = texto[1];
                var textof = data.message.replace("/w " + texto[1], "");
                if (userWhisper == socket.username){
                    io.sockets.connected[socket.id].emit('new_message', { message: "Não é possível mandar mensagem a si próprio!", username: socket.username });
                } 
                else {
                    if (idsend == 0) {
                        io.sockets.connected[socket.id].emit('new_message', { message: "User nao encontrado", username: socket.username });
                    }
                    else {
                        io.sockets.connected[idsend].emit('new_message', { message: textof, username: socket.username });
                    }
                }
            }
            else
                io.sockets.emit('new_message', { message: data.message, username: socket.username });
        }
    })

    socket.on('disconnect', function () {
        fs.appendFile('log.txt', date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + socket.username + socket.id + " has disconnected" + "\r" + "\n", (err) => {
            if (err) throw err;
            // console.log('The file has been saved!');
        });
        console.log(socket.id + ' disconnected')
        io.sockets.emit('new_disconnect', { message: socket.username + socket.id + " has left the room" + "<br>" });
        delete utilizadores[socket.username];
        for (i = 0; i < onlineUsers.length; i++) {
            if (socket.id == onlineUsers[i].id) {
                onlineUsers.splice(i, 1);
                io.sockets.emit('online_users', onlineUsers);
                console.log(onlineUsers);
            }
        }
    })


});