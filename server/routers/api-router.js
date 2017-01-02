/* globals module require */
"use strict";

const express = require("express");
const multer = require('multer');
const path = require('path');

module.exports = function({ app, data }) {
    const router = new express.Router();
    const apiController = require("../controllers/api-controller.js")({ data });
    let img = '';
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            
            cb(null, path.join(__dirname, '../../public/images/'));
        },
        filename: function (req, file, cb) {

            img = Date.now() + file.originalname;
            cb(null, img);
        }
    });
    const uploadAvatar = multer({
        storage: storage
    });

    router
        .get("/user/:name", apiController.getUserByUsername)
        .get('/avatar/:username', apiController.getAvatar)
		.post('/avatar', uploadAvatar.any(), (req, res) => {
            apiController.uploadAvatar(req, res, img);
        })

        .get('/songs/:id', apiController.getSongById)
        .get('/songs/search/:title', apiController.getSongByTitle)        
        .get('/songs/category/:name', apiController.getSongByCategory)
        .get('/songs/', apiController.getAllSongs)

        .get('/playlists/:creator', apiController.getPlaylistByUsername)
        .post('/playlists', apiController.addSongToPlaylist);

    app.use("/api", router);
};