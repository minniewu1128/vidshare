var socket = io.connect('/');
console.log('connected')

socket.on('users_connected', function(data){
    console.log('data',data);
    $('#numUsers').text(data.number);

});