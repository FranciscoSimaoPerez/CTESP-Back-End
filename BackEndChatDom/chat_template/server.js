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

var onlineUsers = [];
var io = require('socket.io')(server);
const uuidv1 = require('uuid/v1');
var date = new Date();

io.on('connection', function (socket) {
    socket.username = "User";
    socket.id = uuidv1();
    console.log(" New User Connected : " + socket.username + socket.id)
    fs.appendFile('log.txt', date.getDate()+"/"+ date.getMonth()+"/"+date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + socket.username + " " + socket.id + " has connected" + "\r" + "\n", (err) => {
        if (err) throw err;
        // console.log('The file has been saved!');
      });


    //default username
        io.sockets.emit('new_connection', { message: socket.username +" "+ socket.id + " has joined the room " + "<br>"});
        var user = { id:socket.id, username: socket.username};
        onlineUsers.push(user);
        io.sockets.emit('online_users', onlineUsers);
        console.log(onlineUsers);
        socket.on('new_username', (data) => {
            //broadcast the new message
            io.sockets.emit('new_username', { message: socket.username +" "+ socket.id + " has changed his username to " + data.username });
            socket.username = data.username + " ";
            for(i = 0; i < onlineUsers.length; i++) {
                if (socket.id == onlineUsers[i].id){
                    onlineUsers[i].username = socket.username;
                    console.log(onlineUsers);
                }    
            }
            io.sockets.emit('online_users', onlineUsers);
        })
         
 
    //listen on new_message  
    socket.on('new_message', (data) => {
        fs.appendFile(date.getDate() + '_' + date.getMonth() + '_' + date.getFullYear() + '.txt', date.getDate()+"/"+ date.getMonth()+"/"+date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + socket.username + socket.id +" : "  + data.message + "\r" + "\n", (err) => {
            if (err) throw err;
            // console.log('The file has been saved!');
          });
        //broadcast the new message
        io.sockets.emit('new_message', { message: data.message, username: socket.username });
    })   

    socket.on('disconnect', function() { 
        fs.appendFile('log.txt', date.getDate()+"/"+ date.getMonth()+"/"+date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + socket.username + socket.id + " has disconnected" + "\r" + "\n", (err) => {
            if (err) throw err;
            // console.log('The file has been saved!');
          });
        console.log(socket.id + ' disconnected')
        io.sockets.emit('new_disconnect', { message: socket.username + socket.id + " has left the room" + "<br>" });
        for(i = 0; i < onlineUsers.length; i++) {
            if (socket.id == onlineUsers[i].id){
                onlineUsers.splice(i,1);
                io.sockets.emit('online_users', onlineUsers);
                console.log(onlineUsers);
            }    
        }
    })  

});