/* globals module require */
"use strict";

const express = require("express");

module.exports = function({ app, data }) {
    const router = new express.Router();
    const apiController = require("../controllers/api-controller.js")({ data });

    router
        .get("/user/:name", apiController.getUserByUsername)
        .post("/register", apiController.createUser);

    app.use("/api", router);
};