// get playlist model
var Playlist = require('../models/playlist.js');
var User = require('../models/user.js');

exports.init = function (app, passport) {
    // index for playlists, which returns the user generated playlists


    // getting playlists by user


    // getting form to create new playlist
    app.get('/playlists/new', isLoggedIn, function(req,res){
        res.render('partials/newPlaylist', {message: req.flash('newPlaylistMessage')})
    });

    // route for creating a new playlist
    app.post('/playlists/new', isLoggedIn, function(req,res){
        var npl = new Playlist();
        console.log('req.body', req.body)
        let pName = req.body.playlistName;
        let cBy = req.user;
        npl.name = pName;
        npl.createdBy = cBy;
        npl.pList = []; // initialize new list

        npl.save(function(err){
            if (err){
                req.flash("newPlaylistMessage","Could not save playlist")
                // redirect home
                res.send('/');
            }
        });
        console.log('successfully saved')
        res.redirect('/');
    })

    app.post('/addVideo/:playlist/:videoId', isLoggedIn, function(req,res){

    })
}

// route middleware to check log in
function isLoggedIn (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    response.redirect('/');
}