var socket = io.connect('/');
console.log('connected')

socket.on('users_connected', function(data){
    $('#numUsers').text(data.number);
});

socket.on('chat_message', function(data){
    console.log('message received')
});

