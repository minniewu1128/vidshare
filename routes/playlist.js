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
        console.log("req.user in newplaylist",req.user)
        res.render('partials/newPlaylist', {message: req.flash('newPlaylistMessage')})
    });

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
    app.put('/addVideo/:playlistId/:videoId', isLoggedIn, function(req,res){
        console.log("playlist id", req.params.playlistLid, "video id", req.params.videoId)
        Playlist.findByIdAndUpdate(req.params.playlistId,{pList: pList.append(req.params.videoId)})
    })
}

// route middleware to check log in
function isLoggedIn (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    response.redirect('/');
}