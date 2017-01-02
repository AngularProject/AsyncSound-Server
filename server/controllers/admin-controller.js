/* globals module require */
"use strict";

module.exports = function({ data }) {
    return {
        setUserAsAdmin(req, res) {

            let query = { username: req.body.username };
            let updateObject = { $push: { roles: "admin" } };

            return data.findUserAndUpdate(updateObject, query)
                .then((user) => {
                    res.status(200).json({ succes: true, message: `Added role to ${user.username} successfully!` });
                });
        },
        getAllAdmins(req, res) {
            return data.getAllAdmins()
                .then((admins) => {
                    res.status(200).json(admins);
                })
        },
        removeAdmin(req, res) {
            let query = { username: req.body.username };
            let updateObject = { $pull: { roles: "admin" } };

            return data.findUserAndUpdate(updateObject, query)
                .then((user) => {
                    res.status(200).json({ succes: true, message: `Removed role to ${user.username} successfully!` });
                });
        }
    }
};