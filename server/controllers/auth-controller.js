/* globals module require */
"use strict";


module.exports = function({ data, passport }) {
    return {
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
        }
    };
};
