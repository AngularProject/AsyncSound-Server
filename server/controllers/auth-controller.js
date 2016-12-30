/* globals module require */
"use strict";

const encrypt = require('../utils/encrypt');

module.exports = function({ data, passport }) {
    return {
        registerUser(req, res) {
            let body = req.body;

            data.isUsernameExist(body)
                .then(result => {
                    let user = result.userData;

                    if (result.isExist) {
                        res.status(200).json({ error: true, message: "Username already exist" });
                    }

                    const salt = encrypt.generateSalt();
                    user.salt = salt,
                        user.passHash = encrypt.hashPassword(salt, user.password || encrypt.genenerateRandomPassword());

                    return data.createUser(user);
                })
                .then(() => {
                    res.status(200).json({ succes: true, message: "Now you are registered" });
                })
                .catch((err) => {
                    res.status(402).json({ error: true, message: err });
                });
        },
        loginUser(req, res, next) {
            const auth = passport.authenticate("local", (error, user) => {
                if (error) {
                    return res.status(200).json({ error: true, message: 'Invalid username or password!' });
                }

                if (!user) {
                    return res.status(200).json({ error: true, message: 'Invalid username or password!' });
                }

                req.logIn(user, error => {
                    if (error) {
                        return next(error);
                    }

                    return res.status(200).json(user);
                });
            });

            auth(req, res, next);
        },
        logoutUser(req, res) {
            req.logout();
            res.status(200).redirect("/home");
        },
        isAuthenticated(req, res, next) {
            if (!req.isAuthenticated()) {
                return res.status(403).send("unauthorized");
            }

            next();
        },
        isNotAuthenticated(req, res, next) {
            if (req.isAuthenticated()) {
                return res.status(403).send("you are logged");
            }

            next();
        }
    };
};