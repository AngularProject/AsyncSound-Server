/* globals module require */
"use strict";

const encrypt = require('../utils/encrypt');

module.exports = function({ data, passport }) {
    return {
        registerUser(req, res) {
            let body = req.body;

            data.isUsernameExist(body.username)
                .then(() => {
                    const salt = encrypt.generateSalt();
                    body.salt = salt,
                    body.passHash = encrypt.hashPassword(salt, req.body.password || encrypt.genenerateRandomPassword());
                    
                    return data.createUser(body);
                })
                .then(regUser => {
                    res.status(200).json(regUser);
                })
                .catch((err) => {
                    res.status(200).json({ message: `User with username "${err}" already exists.` });                    
                });
        },
        loginUser(req, res, next) {
            const auth = passport.authenticate('local', (error, user) => {
                if (error) {
                    return next(error);
                }

                if (!user) {
                    return res.status(400).json({ success: false, msg: 'Invalid username or password!' });
                }

                req.logIn(user, error => {
                    if (error) {
                        return next(error);
                    }

                    return res.status(200).json({ success: true, msg: `Welcome, ${user.username}` });
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
