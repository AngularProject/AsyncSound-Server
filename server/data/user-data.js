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
        isUsernameExist(userData) {
            return new Promise((resolve, reject) => {

                User.findOne({ username: userData.username }, (err, user) => {
                    if (err) {

                        return reject(err);
                    }

                    let isExist = false;

                    if (user) {
                        isExist = true;
                    }

                    return resolve({ isExist, userData });
                });
            });
        },
        uploadAvatar(username, img) {
            this.getUserByUsername(username)
                .then(user => {
                    user.avatar = img;
                    user.save();
                })
                .catch(err => {
                    return err;
                });
        },
        getAvatar(username) {
            console.log("Called get avatar service");
            return new Promise((resolve, reject) => {
                this.getUserByUsername(username)
                    .then(user => {
                        resolve(user.avatar);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        findUserAndUpdate(options, userToUpdate) {
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate(userToUpdate, options, (err, foundUser) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(foundUser);
                });
            });
        },
        getAllAdmins() {
            return new Promise((resolve, reject) => {
                User.find({ "roles": "admin" }, (err, found) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(found);
                });
            });
        },
        getUserById(id) {
            return new Promise((resolve, reject) => {

                User.findOne({ _id: id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!user) {
                        return reject(id);
                    }

                    return resolve(user);
                });
            });
        },
        getCurrentUserPlaylists(username) {
            return new Promise((resolve, reject) => {
                User.find({ username: username })
                    .select('playlists')
                    .exec((err, playlists) => {
                        if (err) {
                            return reject(err);
                        }
                        // console.log(playlists);
                        return resolve(playlists);
                    });
            });
        }
    };
};