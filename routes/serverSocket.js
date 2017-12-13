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
    collectiveStandby = [];
   

    // When a new connection is initiated
        io.sockets.on('connection', function(socket){
            ++ currentUsers;
            
            // Send ('emit a 'user_connected' event back to the socket that just connected.)
            socket.emit('users_connected', {number: currentUsers});

            /* Emit user_connected events also to all (i.e. broadcast) other connected sockets.
             * Broadcast is not emitted back to the current (i.e. "this" connection)
            */
            socket.broadcast.emit('users_connected', {number: currentUsers});

            socket.on('resetStandby', function(data){
                if(collectiveStandby.length===0){
                    collectiveStandby = data
                }
                else{
                    for(let i=0; i< data.length; i++){
                        collectiveStandby.push(data[i]);
                    }
                }
                console.log('collectiveStandby reset', collectiveStandby);
                socket.emit('resetStandby', collectiveStandby);
                socket.broadcast.emit('resetStandby', collectiveStandby);

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