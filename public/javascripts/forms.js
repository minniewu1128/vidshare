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
                console.log('sucessfully added to standby')
                $('#standby-tab').html(res);
            }
        })
    })

    $('.addToPlaylistButton').click(function(event){
        $('#search-tab').on('click','button', function(){
            console.log('new button clicked')
            $.ajax({
                url: `addVideo/5a2e4eb7ccd285ec734a57a4/${this.id}/${this.title}`,
                type: 'POST',
                contentType: 'application/json',
                success: function(res) {
                    console.log("successfully added to playlist")
                    // show message that video was added to playlist
                }
            })
        })
        console.log("video id", this.id, "video title", this.title)
        $.ajax({
            url: `addVideo/5a2e4eb7ccd285ec734a57a4/${this.id}/${this.title}`,
            type: 'POST',
            contentType: 'application/json',
            success: function(res) {
                console.log("successfully added to playlist")
                // show message that video was added to playlist
            }
        })
    })
    

    // Adding video to playlist
})

function closeNewPlaylistModal(){
    $('#newPlaylistFormModal').toggleClass("is-active")
}

