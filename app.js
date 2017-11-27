// Normal Express requires

var express = require('express'),
http = require('http')
morgan = require('morgan')
fs = require('fs')
path = require('path')
bodyParser = require('body-parser')
app = express();

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
            require('./routes/'+ file).init(app);
    }
})

// Catch  any routes not already handled with an error message
app.use(function(req,res){
    var message = 'Error, did not understand path ' + req.path;
    // Set the status to 404 not found, and render a message to the user.
    res.status(404).render('error', {'message': message});
});



// This is where normal app.get, app.put, etc middlewarew ould go


// Set up socket.io
var httpServer = http.Server(app);
var sio = require('socket.io');
var io = sio(httpServer);
httpServer.listen(50000, function() {
console.log('Listening on 50000');
})

var roomSockets = require('./routes/serverSocket.js');
roomSockets.init(io);
