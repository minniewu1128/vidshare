// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
    console.log('search button enabled')
    }


    // Search for a specified string.
    function search() {
        var q = $('#query').val();
        // var request = gapi.client.youtube.search.list({
        //     q: q,
        //     part: 'snippet'
        // });
        console.log(q)
        // request.execute(function(response) {
        //     console.log('request',request)
        //     var str = JSON.stringify(response.result);
        //     $('#search-container').html('<pre>' + str + '</pre>');
        // });
    }
