/* globals module require */
"use strict";

const express = require("express");
const passport = require("passport");

module.exports = function({ app, data }) {
    const router = new express.Router();
    const authController = require("../controllers/auth-controller.js")({ data , passport });
    
    router
        .get("/login", (req, res) => res.status(200).send(`
            <form action="/auth/login" method="POST">
                <input type="text" name="username" placeholder="Username">
                <input type="text" name="password" placeholder="Password">
                <input type="submit" value="Login">
            </form>
        `))
        .get("/logout", (req, res) => res.status(200).send(`
            <form action="/auth/logout" method="POST">
                <input type="submit" value="logout">
            </form>
        `))
        .post("/login", authController.loginUser)
        .post("/logout", authController.logoutUser);

    app.use("/auth", router);
};