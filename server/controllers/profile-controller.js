/* globals module require */
"use strict";

module.exports = function({ data }) {
    return {
        loadProfilePage(req, res) {
            let id = req.query.id;
            return data.getUserById(id)
                .then(user => {
                    res.status(200).json(user);
                })
        }
    };
};