/* globals module Promise */
"use strict";

module.exports = function(models) {
    const { User } = models;
    return {
        createUser(userInfo) {

            return new Promise((resolve, reject) => {

                User.create(userInfo, (err, user) => {
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
        },
        isUsernameExist(username) {
            return new Promise((resolve, reject) => {

                User.findOne({ username: username }, (err, user) => {
                    if (err) {

                        return reject(err);
                    }

                    if (user) {

                        return reject(username);
                    }

                    return resolve(user);
                });
            });
        },
        uploadAvatar(username, img) {
            this.getUserByUsername(username)
                .then(user => {
                    user.avatar = img;
                    user.save();
                });
        },
        getAvatar(username) {
            return new Promise((resolve, reject) => {
                this.getUserByUsername(username)
                    .then(user => {
                        resolve(user.avatar);
                    })
            });
        }
    };
};
