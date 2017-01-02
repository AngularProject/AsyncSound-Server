/* globals module require */
"use strict";

module.exports = function({ data }) {
    return {
        addNewPlaylist(req, res) {
            let playlistInfo = req.body;
            console.log(playlistInfo.creator.username);
            return data.createPlaylist(playlistInfo)
                .then(playlist => {
                    res.status(200).json({ succes: true, message: "Add some music now!" });
                });
        },
        getPlaylistsOfUser(req, res) {
            let usedId = req.params.id;
            // console.log(usedId);
            return data.getPlaylistByCreator(usedId)
                .then(playlists => {
                    console.log(playlists);
                    res.status(200).json(playlists);
                });
        },
        getAllPlaylists(req, res) {
            return data.getAllPlaylists()
                .then(playlists => {
                    res.status(200).json(playlists);
                });
        }
    };
};