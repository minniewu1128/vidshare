exports.init = function(io) {

    // configure socket.io
    // io.use(passportSocketIo.authorize({
    //     cookieParser: cookieParser,
    //     key: 'express.sid',                                                                                                                                    
    //     secret: 'mysecret',
    //     store: sessionStore,
    //     success: onAuthorizeSuccess, // optional callback on success
    //     fail: onAuthorizeFail,
    // }));
    var socket = io.of('/')
    var currentUsers = 0; // keeps track of number of users in the room
    var eventSocket = io.of('/new');
   
    eventSocket.on('connection', function(socket){
        console.log('eventSocket', eventSocket)
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

            socket.on('resetStandby', function(data){
                console.log('standby reset', data);
                socket.emit('resetStandby', data);
                socket.broadcast.emit('resetStandby', data);

            })
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


}