/* globals module require */
"use strict";

module.exports = function({ data }) {
    return {
        addNewPlaylist(req, res) {
            let playlistInfo = req.body;
            return data.createPlaylist(playlistInfo)
                .then(playlist => {
                    res.status(200).json({ succes: true, message: "Add some music now!" });
                });
        },
        getUserPlaylists(req, res) {
            let usedId = req.params.id;
            return data.getUserPlaylists(usedId)
                .then(playlists => {
                    res.status(200).json(playlists);
                });
        }
    };
};