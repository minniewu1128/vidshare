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

    // show specific playlist
    $('.showPlaylistLink').click(function(event){
        
        console.log("href", this.href)
        
        
    })

    $('.addToStandbyButton').click(function(event){
        console.log("video id:", this.id)
        $.ajax({
            url: `/standby/add/${this.id}`,
            type: 'POST',
            contentType: 'application/json',
            success: function(res) {
                // add to session
                $('#standby-tab').append(res);
            }
        })
    })
    

    // Adding video to playlist
})

function closeNewPlaylistModal(){
    $('#newPlaylistFormModal').toggleClass("is-active")
}

// show specific playlist
$('.showPlaylistLink').click(function(event){
    
    console.log("clicked")
    
    
})