// Normal Express requires
var express = require('express')
var app = express();
http = require('http')
morgan = require('morgan')

var fs = require('fs')
var readline = require('readline');
var path = require('path');
var bodyParser = require('body-parser');
// var superagent = require('superagent');
// var google = require('googleapis');
// var googleAuth = require('google-auth-library');
var mongoose = require('mongoose')
var passport = require('passport')
var request = require('request');


var flash = require('connect-flash');
var cookieParser = require('cookie-parser');


var connection_string = 'mongodb://minniew:Yu35016188!@ds111496.mlab.com:11496/usersdb'

mongoose.connect(connection_string);


// configuration ===============================================================
// mongoose.connect(configDB.url); // connect to our database

// require('config/passport')(passport); // pass passport for configuration



var session = require('express-session');
var passportSocketIo = require('passport.socketio');
var RedisStore = require('connect-redis')(session);



// Set up socket.io
var httpServer = http.Server(app);
var sio = require('socket.io');
var io = sio(httpServer);




require('./config/passport').init(passport);



// read cookies (needed for auth)
app.use(cookieParser());

// get information from html forms
app.use(bodyParser());

app.use(session({
    key: 'express.sid',
    store: sessionStore,
    secret:'mysecret'
}))

var sessionStore = new RedisStore({
    host: 'localhost',
    port: 50000,
});

// io.use(passportSocketIo.authorize({
//     cookieParser: cookieParser,
//     key: 'express.sid',                                                                                                                                    
//     secret: 'mysecret',
//     store: sessionStore,
//     passport: passport,
//     success: onAuthorizeSuccess, // optional callback on success
//     fail: onAuthorizeFail,
// }));
// required for passport


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // for flash or flash messages stored in session

db = require('./models/db')

fs.readdirSync('./models').forEach(function(file){
    if(path.extname(file) == '.js') {
        require('./models/' + file);
    }
});

// Handle static files
app.use(express.static(__dirname + '/public'));

// Set the views directory
app.set('views', __dirname + '/views');
// Define the view (templating) engine
app.set('view engine', 'ejs');

app.use(morgan('tiny'));



// parse application/x-www-form-urlencoded, with extended qs library
app.use(bodyParser.urlencoded({extended: true}));

// Load all routes in the routes directory
fs.readdirSync('./routes').forEach(function (file){
    // There might be non-js files in the directory that should not be loaded
    if (path.extname(file) == ".js" && file != 'serverSocket.js'){
        console.log('Adding routes in ' + file);
            require('./routes/'+ file).init(app, passport);
    }
})

// Catch  any routes not already handled with an error message
app.use(function(req,res){
    var message = 'Error, did not understand path ' + req.path;
    // Set the status to 404 not found, and render a message to the user.
    res.status(404).render('error', {'message': message});
});


// This is where normal app.get, app.put, etc middlewarew ould go

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



httpServer.listen(50000, function() {
console.log('Listening on 50000');
})

var roomSockets = require('./routes/serverSocket.js');
roomSockets.init(io);


