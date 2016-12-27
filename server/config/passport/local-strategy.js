/* globals module require */
"use strict";

const LocalStrategy = require("passport-local");
const encrypt = require("../../utils/encrypt");

function authenticate(user, pswd) {
    return encrypt.hashPassword(user.salt, pswd) === user.passHash;
}

module.exports = function(passport, data) {
    const authStrategy = new LocalStrategy((username, password, done) => {
        data.getUserByUsername(username)
            .then(user => {
                if (user && authenticate(user, password)) {
                // if(user && (user.password === password)) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(err => done(err, false));
    });

    passport.use(authStrategy);
};