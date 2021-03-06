/* globals require global module*/
"use strict";

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

module.exports = function (config) {
    // Override mongoose Promise, because it is depricated.
    mongoose.Promise = global.Promise;
    mongoose.connect(config.connectionString);
    
    const User = require("../models/user-model.js");
    const Playlist = require("../models/playlist-model.js");
    const Song = require("../models/song-model.js");

    const models = { User, Playlist, Song };
    const data = {};

    let db = mongoose.connection;
    db.once('open', (err) => {
        if (err) {
            console.log(err);
        }

        console.log('Mongo connected!');
    });
    // It finds all properties
    // of the data models and hang them to "data"
    fs.readdirSync("./server/data")
        .filter(x => x.includes("-data"))
        .forEach(file => {
            const dataModule = require(path.join(__dirname, file))(models); //use only models

            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });

    return data;
};