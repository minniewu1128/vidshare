// apikey: AIzaSyDn0HzJJS9Rhq9nGu16d52eJjDISw0Rwlo
// OAuth clientID: 925927241615-co4f9t9tgmvr8t84a7m06najfaesb13j.apps.googleusercontent.com"
// client secret: LghV_KQPC505TOJiPxph3-4y

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);

// 3. This function creates and <iframe> and YouTube player after API code downloads
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoID: 'M7lc1UVf-VE',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

//4. The API will call this function when the video player is ready
function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    console.log('player state changed')
}

function stopVideo() {
    player.stopVideo();
}

// 5. The API calls his function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.


