// var google = require('googleapis');
// var Oauth2 = google.auth.Oauth2;




// The client ID is obtained from the {{ Google Cloud Console }}
// at {{ https://cloud.google.com/console }}.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.

//scope to manage Youtube account: https://www.googleapis.com/auth/youtube


/*
  1. Your application identifies the permissions it needs.
  2. Your application redirects the user to Google along with the list of requested permissions.
  3. The user decides whether to grant the permissions to your application.
  4. Your application finds out what the user decided.
  5. If the user granted the requested permissions, your application retrieves tokens needed to make API requests on the user's behalf.
*/

var OAUTH2_CLIENT_ID = '925927241615-co4f9t9tgmvr8t84a7m06najfaesb13j.apps.googleusercontent.com';

// scope to view Youtube account
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];


// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function() {
  gapi.auth.init(
    function() {
    window.setTimeout(checkAuth, 1);
  });
}

// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() {
  console.log('starting to checkauth')
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
  
}

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
  console.log('beginning to handleAuthResult')
  if (authResult && !authResult.error) {
    console.log('auth result not error')
    // Authorization was successful. Hide authorization prompts and show
    // content that should be visible after authorization succeeds.
    $('.pre-auth').hide();
    $('.post-auth').show();
    loadAPIClientInterfaces();
  } else {
    console.log(authResult)
    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
    // client flow. The current function is called when that flow completes.
    $('#login-link').click(function() {
      console.log('login-link')
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: false
        }, handleAuthResult);
    });
  }
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api
function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function() {
    console.log('starting handle API Loaded')
    handleAPILoaded();
    
  });
}
