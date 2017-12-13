var standby; 
var nextVidId;

$(function(){
    // Adding a new playlist
    $('#addPlaylistButton').click(function(event){
        var inputName = $('#playlist-name').val();
        console.log('Name', inputName)
        var data = {};
        data.playlistName = inputName;
        $.ajax({
            url: "/playlists/new",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(res) {
                $('#newPlaylistFormModal').toggleClass("is-active")
            }
        })
        
    })

    // Getting playlists
    $('#getPlaylistButton').click(function(event){
        $.ajax({
            url: '/playlists',
            type: 'GET',
            contentType: 'application/json',
            success: function(res) {
                console.log("playlist html", res)
                $('#playlists-tab').html(res);
                
            }
        })
    })

    // Adding a new playlist
    $('#newPlaylistButton').click(function(event){
        console.log('new clicked')
        $.ajax({
            url: '/playlists/new',
            type: 'GET',
            contentType: 'application/json',
            success: function(res) {
                $('#newPlaylistFormModal').addClass('is-active');

            }
        })
    })

    // show specific playlist asynchronously
    $('.showPlaylistLink').click(function(event){
        
        console.log("id", this.id)
        $.ajax({
            url: `/playlists/show/${this.id}`,
            type: 'GET',
            contentType: 'application/json',
            success: function(res) {
                console.log('response received', res)
                $('#playlists-tab').append(res)
            }
        })
        
    })

    $('.addToStandbyButton').click(function(event){
        console.log("video id:", this.id, "video title:", this.title)
        $.ajax({
            url: `/standby/add/${this.id}/${this.title}`,
            type: 'POST',
            contentType: 'application/json',
            success: function(res) {
                // add to session
                // res is array of {id: id, title: title} pairs
                console.log('sucessfully added to standby', res)
                var resRender = 
                    `<div class = "showStandby container">
                        <ol>`;
                for (let i=0; i<res.length; i++) {
                    let iterate =  
                        `<li id=${res[i].id}> 
                            ${res[i].title}
                        </li>`
                    resRender = resRender.concat(iterate)
                }
                resRender = resRender.concat(`</ol> </div>`)
                    
                // put partial stuff here
                $('#standby-tab').html(resRender);
                standby = res;
                nextVidId = res[0].id;
                console.log('nextVidID', nextVidId)
            }
        })
        
    

        // code to show what playlists there are
        $.ajax({
                url: `addVideo/5a303bde48e5713b1095ccb5/${this.id}/${this.title}`,
                type: 'POST',
                contentType: 'application/json',
                success: function(res) {
                    console.log("successfully added to playlist")
                    // show message that video was added to playlist
                }
                });
    });

function closeNewPlaylistModal(){
    $('#newPlaylistFormModal').toggleClass("is-active")
}

// 'loadVideoById' is queued until the player is ready to receive API calls. 
// player.loadVideoById('M7lc1UVf-VE');

function getNextVideoIdFromSession(){
    var result;
    $.ajax({
        url: '/standby',
        type: 'GET',
        contentType: 'application/json',
            success: function(res) {
                console.log('got standby from session', res)
                standby = res;
                nextVidId = standby[0].id
                console.log(nextVidId);
            }

    });
    
}
});

var tag = document.createElement('script');
console.log('script')
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];

firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);

// // 3. This function creates and <iframe> and YouTube player after API code downloads
var player;
function onYouTubeIframeAPIReady() {
console.log('youtube iframe ready')
player = new YT.Player('player', { 
    events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
    }
});
}

// //4. The API will call this function when the video player is ready
function onPlayerReady(event) {
    console.log('status code of video unplayed is ' + YT.PlayerState.UNSTARTED);
    console.log('status code of video ended is ' + YT.PlayerState.ENDED);
    console.log('status code of video playing is ' + YT.PlayerState.PLAYING);
    console.log('status code of video paused is ' + YT.PlayerState.PAUSED);
    console.log('status code of video buffering is ' + YT.PlayerState.BUFFERING);
    console.log('status code of video cued is ' + YT.PlayerState.CUED);
    event.target.playVideo();
}

var done = false;

function onPlayerStateChange(e) {

    // on state change e.data holds state status
    if(e.data === YT.PlayerState.PLAYING){
        console.log('video is playing')
    }
    if(e.data === YT.PlayerState.PAUSED) {
        console.log('video is paused')
        
    }
    if(e.data === YT.PlayerState.ENDED) {
        console.log('video has ended');
        // find id for next video  
        console.log('nextVidId', nextVidId);
        playNextVideo(e.target,nextVidId)
    
    }
    if(e.data === YT.PlayerState.CUED) {
        console.log('next video is now on cue')
        // remove current id from standby
        standby = standby.slice(1);
        console.log(standby)
        // re render partial for standby list
        var resRender = 
        `<div class = "showStandby container">
            <ol>`;
        for (let i=0; i<standby.length; i++) {
        let iterate =  
            `<li id=${standby[i].id}> 
                ${standby[i].title}
            </li>`
        resRender = resRender.concat(iterate)
        }
        resRender = resRender.concat(`</ol> </div>`)
        $('#standby-tab').html(resRender);
        
        
        e.target.playVideo();
        // getNextVideoIdFromSession()
        
        // take current video out of standby list

    }
};

function stopVideo() {
    player.stopVideo();
}
// play next video in standby
function playNextVideo(player, vidId){
    player.cueVideoById({
        videoId: vidId
    })
  
}



