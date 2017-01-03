/* globals module require */
"use strict";

module.exports = function({ data }) {
    return {
        addNewPlaylist(req, res) {
            let playlistInfo = req.body;
            // let id;
            // console.log(playlistInfo.creator.username);
            return data.createPlaylist(playlistInfo)
                .then(playlist => {
                    // id = playlist._id;
                    let query = { username: playlistInfo.creator };
                    let updateObject = { $push: { playlists: playlist._id } };
                    return data.findUserAndUpdate(updateObject, query);
                })
                .then((user) => {
                    res.status(200).json({ succes: true, message: "Add some music now!" });
                });
        },
        getPlaylistsOfUser(req, res) {
            let username = req.params.id;
            // console.log(22);
            // console.log(userId);
            // console.log(req.params);
            // return data.getPlaylistByCreator(usedId)
            //     .then(playlists => {
            //         console.log(playlists);
            //         res.status(200).json(playlists);
            //     });

            return data.getCurrentUserPlaylists(username)
                .then((playlistIds) => {
                    return data.getUserPlaylists(playlistIds[0].playlists);

                })
                .then((playlists) => {
                    res.status(200).json(playlists);

                });
        },
        getAllPlaylists(req, res) {
            return data.getAllPlaylists()
                .then(playlists => {
                    res.status(200).json(playlists);
                });
        },
        pinPlaylist(req, res) {
            let user = req.body.user;
            let id = req.body.playlist._id;
            // let info = {
            //     user,
            //     id
            // };
            let query = { username: user };
            let updateObject = { $push: { "playlists": id } };

            return data.findUserAndUpdate(updateObject, query)
                .then((user) => {
                    // console.log(user);
                    res.status(200).json({ succes: true, message: "Playlist pinned" });
                })
        },
        unpinPlaylist(req, res) {
            let user = req.body.user;
            let id = req.body.playlist._id;
            // let info = {
            //     user,
            //     id
            // };
            let query = { username: user };
            let updateObject = { $pull: { "playlists": id } };

            return data.findUserAndUpdate(updateObject, query)
                .then((user) => {
                    // console.log(user);
                    res.status(200).json({ succes: true, message: user.name + " Playlist unpinned" });
                })
        }
    };
};