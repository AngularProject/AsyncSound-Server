/* globals module require */
"use strict";

module.exports = function({ data }) {
    return {
        getUserByUsername(req, res) {
            data.getUserByUsername(req.params.name)
                .then(user => {
                    res.status(200)
                        .json(user);
                })
                .catch(err => {
                    const message = `Username: ${err} doesn't exist `;
                    
                    res.status(404)
                        .json({error: true, message : message });
                });
        },
        getSongById(req, res) {
            data.getSongById(req.params.id)
                .then(song => {
                    res.status(200)
                        .json(song);
                })
                .catch(err => {
                    const message = `Category: ${err} doesn't exist `;
                    
                    res.status(404)
                        .json({error: true, message : message });
                });
        },
        getSongByCategory(req,res) {
            const string = req.params.name;
            const category = new RegExp(["^", string, "$"].join(""), "i");
            
            data.getSongsByCategory(category)
                .then(songs => {
                    res.status(200)
                        .json(songs);
                })
                .catch((err) => {
                    const message = `Song: ${err} doesn't exist `;

                    res.status(404)
                        .json({error: true, message : message });
                });
        },
        uploadAvatar(req, res, img) {
            let username = req.body.username;

            data.uploadAvatar(username, img);
        },

        getAvatar(req, res) {
            let username = req.body.username;

            data.getAvatar(username)
                .then(result => {
                    res.status(200).send(result);
                });
        }
    };
};
