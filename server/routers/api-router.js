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
        .get('/user/:username/avatar', apiController.getAvatar)
		.post('/user/avatar', uploadAvatar.any(), (req, res) => {
            apiController.uploadAvatar(req, res, img);
        })

        .get('/songs/:id', apiController.getSongById)
        .get('/songs/category/:name', apiController.getSongByCategory)
        .get('/songs/', apiController.getAllSongs);

    app.use("/api", router);
};