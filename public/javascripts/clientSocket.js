var socket = io.connect('/');
console.log('connected')

$(document).ready(function (){
    $('.send-message').click(function(){
        var msg = $('.chat-input').val();
        $('.chat-input').val('');
        socket.emit('message', { message: msg})
    })

})

socket.on('users_connected', function(data){
    $('#numUsers').text(data.number);
});

socket.on('message', function(data){
    console.log('message received')

    $('#chat-stream').append(
        `<p>${data.message}</p>`
    )
});




