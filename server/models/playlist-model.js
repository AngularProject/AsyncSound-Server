/* global require module*/
"use strict";

const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    title: { type: String, validate: /[a-zA-Z0-9]+/, required: true },
    creator: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    songs: [String],
    users: [String],
    voteUp: [String],
    voteDown: [String],
    comments: [{
        content: String,
        author: String,
        postDate: { type: Date, default: Date.now },
        likedBy: [String],
        dislikedBy: [String]
    }],
    isPublic: { type: Boolean },
    isDeleted: { type: Boolean }
});


playlistSchema.virtual("getUsersCount").get(function() {
    let usersCount = this.users.length;

    return usersCount;
});

playlistSchema.virtual("getSongsCount").get(function() {
    let getSongsCount = this.users.length;

    return getSongsCount;
});

playlistSchema.methods.isUserAddedPlaylist = function(username) {
    let isUserExist = this.users.includes(username);

    return isUserExist;
};

playlistSchema.methods.isUserVoteUpPlaylist = function(username) {
    let isUserVote = this.voteUp.includes(username);

    return isUserVote;
};

playlistSchema.methods.isUserVoteDownPlaylist = function(username) {
    let isUserVote = this.voteDown.includes(username);

    return isUserVote;
};

// // WRONG CHECK
playlistSchema.methods.isUserLikedComment = function(username) {
    // let isUserExist = this.comments.map((x)=> x.likedBy.includes(username));

    let isUserExist = false;

    for (var comment in this.comments) {
        if (this.comments[comment].likedBy.some((x) => x === username)) {
            isUserExist = true;
            break;
        }
    }

    return isUserExist;
};

// WRONG CHECK
playlistSchema.methods.isUserDislikedComment = function(username) {
    let isUserExist = false;

    for (var comment in this.comments) {
        if (this.comments[comment].likedBy.some((x) => x === username)) {
            isUserExist = true;
            break;
        }
    }

    return isUserExist;
};

mongoose.model("playlist", playlistSchema);

module.exports = mongoose.model("playlist");