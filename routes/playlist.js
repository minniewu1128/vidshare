// get playlist model
var Playlist = require('../models/playlist.js');
var User = require('../models/user.js');

exports.init = function (app, passport) {
    // index for playlists, which returns the user generated playlists


    // getting playlists by user
    // app.get('/playlists', isLoggedIn, function(req,res){
    //     console.log('checked login, now finding by user ', console.log(req.user))
    //     /* to find playlist by user: */ 
    //     Playlist.byUser(req.user._id, function(err, list) {
    //         res.render('playlistsIndex', {lists: list, user: req.user})
    //     })
      
    // });


    // getting playlists by user
    app.get('/playlists', isLoggedIn, function(req,res){
        Playlist.find({'createdBy': req.user._id}, function(err, list){
            if(err){
                console.log("error", err)
            }
            console.log('playlists', list)
        })
        res.render('playlistsIndex', {lists: [{name: 'a', _id: '123'},{name: 'b', _id: '234' }], user: req.user})
        // Playlist.byUser(req.user._id, function(err,lists){
        //     res.render('playlistsIndex', {list: lists, user: req.user})
        // })
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