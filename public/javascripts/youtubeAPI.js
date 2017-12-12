
// // 'loadVideoById' is queued until the player is ready to receive API calls. 
// // player.loadVideoById('M7lc1UVf-VE');

// // player.playVideo();
// var nextVidId;

// function getNextVideoIdFromSession(){
//     var result;
//     $.ajax({
//         url: '/standby',
//         type: 'GET',
//         contentType: 'application/json',
//             success: function(res) {
//                 console.log('got standby from session', res)
//                 nextVidId = res.id;
//                 console.log(nextVidId);
//             }

//     });
    
// }




// var tag = document.createElement('script');
// console.log('script')
// tag.src = "http://www.youtube.com/iframe_api";

// var firstScriptTag = document.getElementsByTagName('script')[0];

// firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);

// // // 3. This function creates and <iframe> and YouTube player after API code downloads
// var player;
// function onYouTubeIframeAPIReady() {
// console.log('youtube iframe ready')
// player = new YT.Player('player', { 
//     events: {
//         'onReady': onPlayerReady,
//         'onStateChange': onPlayerStateChange
//     }
// });
// }

// // //4. The API will call this function when the video player is ready
// function onPlayerReady(event) {
//     console.log('status code of video unplayed is ' + YT.PlayerState.UNSTARTED);
//     console.log('status code of video ended is ' + YT.PlayerState.ENDED);
//     console.log('status code of video playing is ' + YT.PlayerState.PLAYING);
//     console.log('status code of video paused is ' + YT.PlayerState.PAUSED);
//     console.log('status code of video buffering is ' + YT.PlayerState.BUFFERING);
//     console.log('status code of video cued is ' + YT.PlayerState.CUED);
//     event.target.playVideo();
// }

// var done = false;

// function onPlayerStateChange(e) {
//     console.log('player state changed')
//     // on state change e.data holds state status
//     if(e.data === YT.PlayerState.PLAYING){
//         console.log('video is playing')
//     }
//     if(e.data === YT.PlayerState.PAUSED) {
//         console.log('video is paused')
        
//     }
//     if(e.data === YT.PlayerState.ENDED) {
//         console.log('video has ended');
//         // find id for next video  
//         console.log('nextVidId', nextVidId);
//         playNextVideo(player,nextVidId)
        
        

//     }
// };

// function stopVideo() {
//     player.stopVideo();
// }
// // play next video in standby
// function playNextVideo(player, vidId){
//     player.cueVideoById({
//         videoId: vidId
//     })
//     player.playVideo();
//     getNextVideoIdFromSession()
// }
// $.ajax({
//     url: `/playlists/show/${this.id}`,
//     type: 'GET',
//     contentType: 'application/json',
//     success: function(res) {
//         console.log('response received', res)
//         $('#playlists-tab').append(res)
//     }
// })


// // // apikey: AIzaSyDn0HzJJS9Rhq9nGu16d52eJjDISw0Rwlo
// // // OAuth clientID: 925927241615-co4f9t9tgmvr8t84a7m06najfaesb13j.apps.googleusercontent.com"
// // // client secret: LghV_KQPC505TOJiPxph3-4y




// // // 5. The API calls his function when the player's state changes.
// // //    The function indicates that when playing a video (state=1),
// // //    the player should play for six seconds and then stop.


