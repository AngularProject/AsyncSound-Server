/* globals module Promise */
"use strict";

module.exports = function(models) {
    const { User } = models;

    return {
        createUser(userInfo) {

            const user = new User({
                username: userInfo.username,
                email: userInfo.email,
                password: userInfo.password,
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
            });

            return new Promise((resolve, reject) => {

                User.create(user, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },        
        getUserByUsername(username) {
            return new Promise((resolve, reject) => {

                User.findOne({ username: username }, (err, user) => {
                    if (err) {

                        return reject(err);
                    }

                    if (!user) {

                        return reject(username);
                    }

                    return resolve(user);
                });
            });
        }
    };
};