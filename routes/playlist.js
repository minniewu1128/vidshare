// get playlist model
var Playlist = require('../models/playlist.js');
var User = require('../models/user.js');

exports.init = function (app, passport) {
    // getting playlists by user
    app.get('/playlists', isLoggedIn, function(req,res){
        Playlist.find({'createdBy': req.user._id}, function(err, list){
            if(err){
                console.log("error", err)
            }
            res.render('partials/playlistsIndex', {lists: list, user: req.user})
        })
    })

    // getting form to create new playlist
    app.get('/playlists/new', isLoggedIn, function(req,res){
        res.render('partials/newPlaylist', {message: req.flash('newPlaylistMessage')})
    });

    // show the videos in a specific playlist
    app.get('/playlists/show/:id', isLoggedIn, function(req,res){
        Playlist.findById(req.params.id, function(err, list){
            if(err){
                console.log('error', err)
            }
            console.log('playlist', list)
            res.render('partials/showPlaylist', {list: list, user: req.user})
        })
    })

    // route for creating a new playlist
    app.post('/playlists/new', isLoggedIn, function(req,res){
        var npl = new Playlist();
        console.log('req.body', req.body)
        console.log('posting')
        let pName = req.body.playlistName;
        let cBy = req.user;
        npl.name = pName;
        npl.createdBy = cBy;
        npl.pList = []; // initialize new list

        npl.save(function(err){
            if (err){
                console.log('error')
                req.flash("newPlaylistMessage","Could not save playlist")
                // redirect home
                
            }
            res.redirect('/');
        });
        console.log('successfully saved')
   
    })

    
    // adding new video to a specific playlist
    app.get('/addVideo/:playlistId/:videoId/:videoTitle?', isLoggedIn, function(req,res){
        console.log('route')
        var video;
        console.log("playlist id", req.params.playlistId, "video id", req.params.videoId)
        if(req.params.videoTitle){
            video = {title: req.params.videoTitle, _id: req.params.videoId}
        }
        else {
            video = {title: "Title Unavailable", _id: req.params.videoId}
        }
        Playlist.findByIdAndUpdate(req.params.playlistId, {$push: {'plist': video}}, function(err,video){
            if(err) return err;
            console.log('video',video)
            res.send(video)
        })

    })

    // adding new video to standby
    app.post('/standby/add/:videoId', isLoggedIn, function(req,res){
        
        req.session.standby = [req.params.videoId]
        console.log("session", req.session)
        res.render('partials/standbyList', {session: req.session})
    })
}

// route middleware to check log in
function isLoggedIn (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    response.redirect('/');
}