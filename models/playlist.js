var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var playlistSchema = new mongoose.Schema({
    name: String,
    createdBy: {
        type: ObjectId,
        ref: 'User'
    },
    plist : []
});

// Methods

playlistSchema.statics.byUser = function(userId, callback) {
    return this.find({createdBy: userId}, 'name videos')
};

playlistSchema.statics.byId = function(id, callback) {
    return this.find({_id: id}, 'name videos');
};

// create model for playlists and expose to app
module.exports = mongoose.model('Playlist', playlistSchema)