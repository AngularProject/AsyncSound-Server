/* globals module require */
"use strict";

const passport = require("passport");

module.exports = function ({ app, data }) {

    require("./local-strategy") (passport, data);
    
    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user.username);
        }
    });

    passport.deserializeUser((username, done) => {
        data.getUserByUsername(username)
            .then( user => {
                if(user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            })
            .catch( err => done(err, false));
    });

    app.use(passport.initialize());
    app.use(passport.session());
};