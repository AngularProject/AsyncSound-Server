/* globals module require */
"use strict";

const express = require("express");

module.exports = function({ app, data }) {
    const controller = require("../controllers/playlist-controller")({ data });
    const router = express.Router();

    router
        .get("/playlists", controller.getAllPlaylists)
        .get("/user-playlists/:id", controller.getPlaylistsOfUser)
        .post("/playlist/add", controller.addNewPlaylist)
        .post("/pin-playlist", controller.pinPlaylist)
        .post("/unpin-playlist", controller.unpinPlaylist);

    app.use("/", router);
};