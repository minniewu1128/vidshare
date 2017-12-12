exports.init = function(io, passportSocketIo, cookieParser, sessionStore, passport) {

    // configure socket.io
    io.use(passportSocketIo.authorize({
        passport: passport,
        cookieParser: cookieParser,
        secret: 'mysecret',
        store: sessionStore,
        success: onAuthorizeSuccess, // optional callback on success
        fail: onAuthorizeFail,
    }));

    var currentUsers = 0; // keeps track of number of users in the room
    var eventSocket = io.of('/');

    eventSocket.on('connection', function(socket){
        console.log('hi')
        socket.on('event1', function(eventData){
            if (socket.request.user && socket.request.user.logged_in){
                console.log("socket.request.user", socket.request.user)
            }
        
        });
    });
    // When a new connection is initiated
        io.sockets.on('connection', function(socket){
            console.log("user",socket.request.user)
            ++ currentUsers;
            
            // Send ('emit a 'user_connected' event back to the socket that just connected.)
            socket.emit('users_connected', {number: currentUsers});

            /* Emit user_connected events also to all (i.e. broadcast) other connected sockets.
             * Broadcast is not emitted back to the current (i.e. "this" connection)
            */
            socket.broadcast.emit('users_connected', {number: currentUsers});


            socket.on('message', function(data){
                console.log('data.message', data.message)
                socket.emit('message', data);
                socket.broadcast.emit('message', data)
            })
            // When this socket is disconnected, decrement numberof users and emit an event to all other sockets.
            socket.on('disconnect', function(){
                -- currentUsers;
                socket.broadcast.emit('users_connected', {number: currentUsers});
            })
        });

        function onAuthorizeSuccess(data,accept){
            console.log('successful connection to socket.io');
            // The accept-callback still allows 
            accept(); // let the user through
        }
        
        function onAuthorizeFail(data, message, error, accept){
            if(error) accept(new Error(message));
            console.log('failed connection to socket.io', message);
            accept(null,false);
        
        }
}