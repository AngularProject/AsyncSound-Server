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

                    return resolve({isExist, userData});
                });
            });
        }
    };
};