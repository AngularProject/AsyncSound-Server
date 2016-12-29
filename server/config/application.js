/* globals module require */
"use strict";

const express = require("express");
const session = require("express-session");
const path = require("path");
const rootPath = path.normalize(path.join(__dirname, '/../../'));
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

module.exports = function({ data }) {
    const app = express();

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        next();
    });

    app.options("*", cors);
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        secret: "evastuposfail",
        resave: true,
        saveUninitialized: true
    }));

    app.use('/static', express.static(rootPath + '/public'));

    require("./passport")({ app, data });

    return app;
};
