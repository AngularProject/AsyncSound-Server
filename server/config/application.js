/* globals module require */
"use strict";

const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

module.exports = function({ data }) {
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', './server/views');

    app.use('/libraries', express.static(path.resolve(__dirname + '/../../node_modules')));
    app.use('/static', express.static(path.resolve(__dirname + '/../../public')));

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        secret: "evastuposfail",
        resave: true,
        saveUninitialized: true
    }));

    require("./passport")({app, data});

    return app;
};