/* global require module*/
"use strict";

const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    audioId: {type: String},
    title: { type: String },
    category: { type: String },
    duration: {type: Number},
    mp3Url: {type: String},
    oggUrl: {type: String},
});

mongoose.model("song", songSchema);

module.exports = mongoose.model("song");