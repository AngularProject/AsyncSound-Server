/* globals module require */
"use strict";

module.exports = function({ data }) {
    return {
        loadProfilePage(req, res) {
            let username = req.params.username;
            return data.getUserByUsername(username)
                .then(user => {
                    res.status(200).json(user);
                })
        }
    };
};