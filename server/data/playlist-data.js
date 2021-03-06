/* globals module Promise */
"use strict";

module.exports = function(models) {
    const { Playlist } = models;

    return {
        createPlaylist(playlistInfo) {
            // console.log(playlistInfo.creator.username);

            const playlist = new Playlist({
                title: playlistInfo.title,
                creator: playlistInfo.creator,
                createdOn: playlistInfo.createdOn,
                songs: [],
                users: [],
                comments: [],
                isPublic: playlistInfo.isPublic,
                isDeleted: false
            });

            return new Promise((resolve, reject) => {

                Playlist.create(playlist, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getPlaylistById(playlistId) {
            return new Promise((resolve, reject) => {

                Playlist.findOne({ _id: playlistId }, (err, playlist) => {
                    if (err) {

                        return reject(err);
                    }

                    if (!playlist) {

                        return reject(playlist);
                    }

                    return resolve(playlist);
                });
            });
        },
        getPlaylistByCreator(creator) {
            return new Promise((resolve, reject) => {

                Playlist.find({ "creator": creator }, (err, playlist) => {
                    if (err) {

                        return reject(err);
                    }

                    if (playlist.length === 0) {

                        return reject(playlist);
                    }

                    return resolve(playlist);
                });
            });
        },
        addSongToPlaylist(info) {

            const id = { _id: info.id };

            const update = {
                $push: { "songs": info.song }
            };

            const options = { upsert: false };

            return new Promise((resolve, reject) => {
                Playlist.findOneAndUpdate(id, update, options, (err, updatedPlaylist) => {

                    if (err) {
                        return reject(err);
                    }

                    return resolve(updatedPlaylist);
                });
            });
        },
        removeSongFromPlaylist(info) {

            const id = { _id: info.id };

            const update = {
                $pull: { "songs": info.song }
            };

            const options = { upsert: false };

            return new Promise((resolve, reject) => {
                Playlist.findOneAndUpdate(id, update, options, (err, updatedPlaylist) => {

                    if (err) {
                        return reject(err);
                    }

                    return resolve(updatedPlaylist);
                });
            });
        },
        addUserToPlaylist(info) {

            const id = { _id: info.id };

            const update = {
                $push: { "users": info.user }
            };

            const options = { upsert: false };

            return new Promise((resolve, reject) => {
                Playlist.findOneAndUpdate(id, update, options, (err, updatedPlaylist) => {

                    if (err) {
                        return reject(err);
                    }

                    return resolve(updatedPlaylist);
                });
            });
        },
        removeUserFromPlaylist(info) {

            const id = { _id: info.id };

            const update = {
                $pull: { "users": info.user }
            };

            const options = { upsert: false };

            return new Promise((resolve, reject) => {
                Playlist.findOneAndUpdate(id, update, options, (err, updatedPlaylist) => {

                    if (err) {
                        return reject(err);
                    }

                    return resolve(updatedPlaylist);
                });
            });
        },
        getUserPlaylists(playlistIds) {
            return new Promise((resolve, reject) => {
                // console.log(playlistIds);
                Playlist.find({ _id: { $in: playlistIds } }, (err, playlist) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(playlist);
                });
            });
        },
        getAllPlaylists() {
            return new Promise((resolve, reject) => {
                Playlist.find({}, (err, playlists) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(playlists);
                })
            });
        }
    };
};