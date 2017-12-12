$(function(){
    // Start out at the search tab
    $('a.tab').click(function(){
        var tab_id = $(this).attr('data-tab');
        $('a.tab').removeClass('is-active');
        $('.tab-content').removeClass('is-active');
        $(this).addClass('is-active');
        $("#"+tab_id).addClass('is-active');
        if(tab_id==="search-tab"){
            $('#standby-tab').hide();
            $('#playlists-tab').hide();
            $("#search-tab").show();
        }
        else if(tab_id === "standby-tab"){
            $("#search-tab").hide();
            $("#standby-tab").show();
            $("#playlists-tab").hide();
        }
        else{
            $("#search-tab").hide();
            $("#standby-tab").hide();
            $("#playlists-tab").show();

        }
    })


    $('#video-search').click(function(event){
        // get query from button
        var q = $('#video-search-bar').val();
        console.log("Query", q)
        $.ajax({
            url: "/searchQuery/" + q,
            type: 'GET',
            success: function(res) {
                var r = ``;
                $('#video-search-bar').val('');
                $('#search-tab').html(res);
               
                // for(var i=0; i < res.sRes.items.length; i++){
                //     r = `
                //         <a class="panel-block is-active tab-content" id="search-tab" href="addVideo/5a2e4eb7ccd285ec734a57a4/${res.sRes.items[i].id.videoId}/${res.sRes.items[i].snippet.title}">
                //         <span class="panel-icon">
                //         <i class="fa fa-book"></i>
                //         </span>
                //         ${res.sRes.items[i].snippet.title}                   
                //         </a>
                //         `
                //     $('.panel').append(r);

                // }
                
            }
        })
    })
})