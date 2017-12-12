var YouTube = require('youtube-node');

var youTube = new YouTube();

youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU')

exports.init = function(app){
    // renders the search page
    app.get('/search', function(req,res){
        response.render('search', {sRes: null})
        console.log(sRes)
    })

    app.get('/searchQuery/:query', function(req,res){
      var query = req.params.query;
      youTube.search(req.params.query, 10, function (err, yRes){
        if (err){
          console.log("ERROR",err);
        }
        else {
          // res.render('partials/search', {sRes: yRes})
          console.log(yRes)
          res.render('partials/searchResults',{sRes: yRes})
          
        }

      })
    })

}

