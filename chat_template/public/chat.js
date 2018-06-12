$(function () {
    //make connection
    var socket = io.connect('http://localhost:3000')

    //buttons and inputs
    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")
    var send_username = $("#send_username")

    //Emit message
    send_message.click(function () {
        socket.emit('new_message', { message: message.val() })
    })

    //Listen on new_message
    socket.on("new_message", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    }) 

    send_username.click(function () {
        socket.emit('new_username', { username: username.val() })
    })

    socket.on("new_username", (data) => {
        username.val(data.username);
    }) 
});