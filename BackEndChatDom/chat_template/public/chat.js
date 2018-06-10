$(function () {
    //make connection
    var socket = io.connect('http://localhost:3000')


    //buttons and inputs
    var message = $("#message")
    var username = $("#username")
    var new_username =$("#new_username")
    var send_message = $("#send_message")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")
    var date = new Date()

    send_message.click(function () {
        socket.emit('new_message', { message: message.val() })
    })
    new_username.click(function () {
        socket.emit('new_username', { username: username.val() })
    })
    //Listen on new_message
    socket.on("new_message", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + date.getDate()+"/"+ date.getMonth()+"/"+date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " - " + data.username + ": " + data.message + "</p>")
    })

    socket.on("new_username", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append(date.getDate()+"/"+ date.getMonth()+"/"+date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " - " + data.message)
    })


    socket.on("new_connection", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append(date.getDate()+"/"+ date.getMonth()+"/"+date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " - " +  data.message)
    })

    socket.on("new_disconnect", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append(date.getDate()+"/"+ date.getMonth()+"/"+date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " - " +  data.message)
    })  

});