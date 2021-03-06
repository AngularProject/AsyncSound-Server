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
        .get("/register", (req, res) => res.status(200).send(`            
            <form action="/auth/register" method="POST">
                <input type="text" name="username" placeholder="Username">
                <input type="text" name="password" placeholder="Password">
                <input type="text" name="email" placeholder="Email">
                <input type="text" name="firstname" placeholder="Firstname">
                <input type="text" name="lastname" placeholder="Lastname">
                <input type="submit" value="Sing up">
            </form>`))
        .get("/logout", authController.logoutUser)        
        .post("/edit", authController.updateUserProfile)
        .post("/register", authController.isNotAuthenticated, authController.registerUser)
        .post("/login", authController.loginUser);

    app.use("/auth", router);
};