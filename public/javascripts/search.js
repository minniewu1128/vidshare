$(function(){
    $('#video-search').click(function(event){
        // get query from button
        var q = $('#video-search-bar').val();
        console.log("Query", q)
        $.ajax({
            url: "/searchQuery/" + q,
            type: 'GET',
            success: function(result) {
                $('#video-search-bar').empty();
                console.log("result", result)
            }
        })
    })
})