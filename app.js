// Normal Express requires

var express = require('express'),
http = require('http')
morgan = require('morgan')

fs = require('fs')
var readline = require('readline');
path = require('path')
bodyParser = require('body-parser')
superagent = require('superagent')
var google = require('googleapis');
var googleAuth = require('google-auth-library');




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


// var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly']
// var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
// var TOKEN_PATH = TOKEN_DIR + 'google-apis-nodejs-quickstart.json'
// console.log('token path', TOKEN_PATH)

// // Load client secrets from a local file.
// fs.readFile('client_secret.json', function processClientSecrets(err, content) {
//     if (err) {
//       console.log('Error loading client secret file: ' + err);
//       return;
//     }
//     // Authorize a client with the loaded credentials, then call the YouTube API.
//     //See full code sample for authorize() function code.
//   authorize(JSON.parse(content), {'params': {'maxResults': '25',
//                    'part': 'snippet',
//                    'q': 'surfing',
//                    'type': ''}}, searchListByKeyword);
  
//   });

//  /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  *
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */

// function authorize(credentials, requestData, callback) {
//     console.log('credentials', credentials)
//     var clientSecret = credentials.web.client_secret;
//     console.log('client secret',clientSecret)
//     var clientId = credentials.web.client_id;
    
//     var redirectUrl = credentials.web.redirect_uris[1];
//     var auth = new googleAuth();
//     var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  
//     // Check if we have previously stored a token.
//     fs.readFile(TOKEN_PATH, function(err, token) {
//       if (err) {
//         getNewToken(oauth2Client, requestData, callback);
//       } else {
//         oauth2Client.credentials = JSON.parse(token);
//         callback(oauth2Client, requestData);
//       }
//     });
//   }
  
//   /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  *
//  * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback to call with the authorized
//  *     client.
//  */
// function getNewToken(oauth2Client, requestData, callback) {
//     var authUrl = oauth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: SCOPES
//     });
//     console.log('Authorize this app by visiting this url: ', authUrl);
//     var rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout
//     });
//     rl.question('Enter the code from that page here: ', function(code) {
//       rl.close();
//       oauth2Client.getToken(code, function(err, token) {
//         if (err) {
//           console.log('Error while trying to retrieve access token', err);
//           return;
//         }
//         oauth2Client.credentials = token;
//         storeToken(token);
//         callback(oauth2Client, requestData);
//       });
//     });
//   }
  
//   /**
//    * Store token to disk be used in later program executions.
//    *
//    * @param {Object} token The token to store to disk.
//    */
//   function storeToken(token) {
//     try {
//       fs.mkdirSync(TOKEN_DIR);
//     } catch (err) {
//       if (err.code != 'EEXIST') {
//         throw err;
//       }
//     }
//     fs.writeFile(TOKEN_PATH, JSON.stringify(token));
//     console.log('Token stored to ' + TOKEN_PATH);
//   }
  
//   /**
//    * Remove parameters that do not have values.
//    *
//    * @param {Object} params A list of key-value pairs representing request
//    *                        parameters and their values.
//    * @return {Object} The params object minus parameters with no values set.
//    */
//   function removeEmptyParameters(params) {
//     for (var p in params) {
//       if (!params[p] || params[p] == 'undefined') {
//         delete params[p];
//       }
//     }
//     return params;
//   }
  
//   /**
//    * Create a JSON object, representing an API resource, from a list of
//    * properties and their values.
//    *
//    * @param {Object} properties A list of key-value pairs representing resource
//    *                            properties and their values.
//    * @return {Object} A JSON object. The function nests properties based on
//    *                  periods (.) in property names.
//    */
//   function createResource(properties) {
//     var resource = {};
//     var normalizedProps = properties;
//     for (var p in properties) {
//       var value = properties[p];
//       if (p && p.substr(-2, 2) == '[]') {
//         var adjustedName = p.replace('[]', '');
//         if (value) {
//           normalizedProps[adjustedName] = value.split(',');
//         }
//         delete normalizedProps[p];
//       }
//     }
//     for (var p in normalizedProps) {
//       // Leave properties that don't have values out of inserted resource.
//       if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
//         var propArray = p.split('.');
//         var ref = resource;
//         for (var pa = 0; pa < propArray.length; pa++) {
//           var key = propArray[pa];
//           if (pa == propArray.length - 1) {
//             ref[key] = normalizedProps[p];
//           } else {
//             ref = ref[key] = ref[key] || {};
//           }
//         }
//       };
//     }
//     return resource;
//   }
  
  
//   function searchListByKeyword(auth, requestData) {
//     var service = google.youtube('v3');
//     var parameters = removeEmptyParameters(requestData['params']);
//     parameters['auth'] = auth;
//     service.search.list(parameters, function(err, response) {
//       if (err) {
//         console.log('The API returned an error: ' + err);
//         return;
//       }
//       console.log(response);
//     });
//   }
  

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
