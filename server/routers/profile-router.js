/* globals module require */
"use strict";

const express = require("express");

module.exports = function({ app, data }) {
    const profileController = require("../controllers/profile-controller")({ data });
    const router = express.Router();

    router
        .get("/profile/:id", profileController.loadProfilePage);

    app.use("/", router);
};