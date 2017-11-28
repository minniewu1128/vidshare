var YouTube = require('youtube-node');

var youTube = new YouTube();

youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU')

exports.init = function(app){
    // renders the search page
    app.get('/search', function(req,res){
        response.render('search/search')
    })

}

youTube.search('masterchef', 10, function(error, result) {
    if (error) {
      console.log(error);
    }
    else {
      console.log(JSON.stringify(result, null, 2));
    }
  });