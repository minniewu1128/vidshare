// apikey: AIzaSyDn0HzJJS9Rhq9nGu16d52eJjDISw0Rwlo
// OAuth clientID: 925927241615-co4f9t9tgmvr8t84a7m06najfaesb13j.apps.googleusercontent.com"
// client secret: LghV_KQPC505TOJiPxph3-4y

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    // console.log('Full Name: ' + profile.getName());
    // console.log('Given Name: ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());
    // console.log("Image URL: " + profile.getImageUrl());
    // console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  };

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
console.log(firstScriptTag)
firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);

// 3. This function creates and <iframe> and YouTube player after API code downloads
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoID: 'w0V-LGaqJcs',
        events: {
            'onReady': onPlayerReady,
            // 'onStateChange': onPlayerStateChange
        }
    });
}

//4. The API will call this function when the video player is ready
function onPlayerReady(event) {
    console.log('player ready')
    event.target.playVideo();
}

var done = false;

function onPlayerStateChange(event) {
    console.log('player state changed')
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo,6000);
        done = true
    }
}

function stopVideo() {
    player.stopVideo();
}

// 5. The API calls his function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.


