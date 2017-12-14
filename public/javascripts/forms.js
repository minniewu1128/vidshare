var standby; 
var collectiveStandby;
var nextVidId;



var socket = io.connect('/');

socket.on('connect', function(){
    console.log('successfully connected')
})

// sockets are put in the same frontend file because need to access standby list global variable

socket.on('users_connected', function(data){
    $('#numUsers').text(data.number);
});

socket.on('resetStandby', function(data){
    collectiveStandby = data;
    console.log(collectiveStandby)
    console.log('my standby was reset')
    nextVidId = collectiveStandby[0].id;
    var resRender = 
    `<div class = "showStandby container">
        <ol>`;
    for (let i=0; i<collectiveStandby.length; i++) {
    let iterate =  
        `<li id=${collectiveStandby[i].id}> 
            ${collectiveStandby[i].title}
        </li>`
    resRender = resRender.concat(iterate)
    }
    resRender = resRender.concat(`</ol> </div>`)
    $('#collective-standby-tab-list').html(resRender);
    console.log('nextVidID', nextVidId)
})

socket.on('message', function(data){
    console.log('message received')

    $('#chat-stream').append(
        `<p>${data.message}</p>`
    )
});

// document ready
$(function(){

    // load user's current playlists into the dropdown
    function initDropdown(){
        $.ajax({
            url: '/playlists',
            type: 'GET',
            contentType: 'application/json',
            success: function(res) {
                var pDrop = ``;
                for(var i=0; i<res.length; i++){
                    pl = res[i]
                    var addD = `<option id=${pl._id}>${pl.name}</option>`
                    pDrop = pDrop.concat(addD);
                }
                $('select#selectPlaylist').html(pDrop);
            }
        }); //close ajax brack
       
    };
    initDropdown();

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
                     "<ol>"
                 for (let i=0; i<res.length; i++) {
                     let iterate =  
                         `<li id=${res[i].id}> 
                             ${res[i].title}
                         </li>`
                     resRender = resRender.concat(iterate)
                 }
                 resRender = resRender.concat(`</ol>`)
                            
                 $('#standby-tab-list').html(resRender);
                 standby = res;
                }
         }); // close ajax
     });

     $('.addToPlaylistButton').click(function(event){      
        var vId = this.id;
        var vTitle = this.title;
        $('#addToPlaylistButton').click(function(event){     
            // selecting playlist id to add
            console.log('video id', vId, 'video Title:', vTitle)
            var select = $('select#selectPlaylist')
            var selectedIndex = select[0].options.selectedIndex;
            var pId = select[0][selectedIndex].id;
            console.log('selected',select)
            console.log('selected ID', pId)

            $.ajax({
                url: `addVideo/${pId}/${vId}/${vTitle}`,
                type: 'POST',
                contentType: 'application/json',
                success: function(res) {         
                  console.log(`added video to playlist with id ${pId}`)
                  $('#choosePlaylistFormModal').toggleClass('is-active')
                }
            }) 
        })
        $('#choosePlaylistFormModal').toggleClass('is-active')

     })

    function closeChoosePlaylistModal(){
        $('#choosePlaylistFormModal').toggleClass('is-active');
    }    




    $('.send-message').click(function(){
        var msg = $('.chat-input').val();
        $('.chat-input').val('');
        socket.emit('message', { message: msg})
    })

    //on confirming standby list, send standby list to server and recompile
    $('#confirmStandby').click(function(){
        socket.emit('resetStandby', standby)
        //updating my own standby
        console.log('standby successfully reset')
    })

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

    // deleting playlists
    $('#deletePlaylists').click(function(e){
        $.ajax({
            url:'/playlists',
            type: 'DELETE',
            success: function(res) {
                alert('deleted playlists')
            }
        })
        e.preventDefault();
    })

    // Getting playlists
    $('#getPlaylistButton').click(function(event){
        $.ajax({
            url: '/playlists',
            type: 'GET',
            contentType: 'application/json',
            success: function(res) {
                console.log(res)
                // build playlist frontend list
                var pTab = `<table>`;
                // build playlist frontend dropdown in modal
                var pDrop = ``;
                for(var i=0; i<res.length; i++){
                    pl = res[i]
                    var addT = `<tr>
                                <td><a href="/playlists/show/${pl._id}" class="showPlaylistLink" id="${pl._id}">${pl.name} </td>
                                </tr>`
                    pTab = pTab.concat(addT);

                    var addD = `<option id=${pl._id}>${pl.name}</option>`
                    pDrop = pDrop.concat(addD);
                }


                pTab = pTab.concat('</table>')             
                console.log(pTab)
                $('#playlists-tab').html(pTab);

            
                $('select#selectPlaylist').html(pDrop)
                
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
                nextVidId = collectiveStandby[0].id
                console.log(nextVidId);
            }

    });
    
}


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
        if(collectiveStandby){
            collectiveStandby = collectiveStandby.slice(1);
            console.log('onCue',collectiveStandby)
        }
        // re render partial for standby list
        var resRender = 
        `<div class = "showStandby container">
            <ol>`;
        for (let i=0; i<collectiveStandby.length; i++) {
        let iterate =  
            `<li id=${collectiveStandby[i].id}> 
                ${collectiveStandby[i].title}
            </li>`
        resRender = resRender.concat(iterate)
        }
        resRender = resRender.concat(`</ol> </div>`)
        $('#collective-standby-tab').html(resRender);
        
        
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



