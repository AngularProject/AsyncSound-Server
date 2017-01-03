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
                        .json({ error: true, message: message });
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
                        .json({ error: true, message: message });
                });
        },
        getSongByCategory(req, res) {
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
                        .json({ error: true, message: message });
                });
        },
        getAllSongs(req, res) {
            data.getAllSongs()
                .then(songs => {
                    res.status(200)
                        .json(songs);
                })
                .catch((err) => {

                    res.status(404)
                        .json({ error: true, message: err });
                });
        },
        getPlaylistByUsername(req, res) {
            const username = req.params.creator;
            console.log(username);
            data.getPlaylistByCreator(username)
                .then(playlists => {
                    res.status(200)
                        .json(playlists);
                })
                .catch(err => {
                    res.status(404)
                        .json({ error: true, message: err });
                });
        },
        addSongToPlaylist(req, res) {
            const body = req.body;

            data.addSongToPlaylist(body)
                .then(playlist => {
                    res.status(200)
                        .json(playlist);
                })
                .catch(err => {
                    res.status(404)
                        .json({ error: true, message: err });
                });
        },
        uploadAvatar(req, res, img) {
            let username = req.params.username;

            data.uploadAvatar(username, img);
        },

        getAvatar(req, res) {
            let username = req.params.username;

            data.getAvatar(username)
                .then(result => {
                    res.status(200).send(result);
                });
        }
    };
};