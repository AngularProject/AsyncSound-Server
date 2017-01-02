"use strict";

module.exports = function(models) {
    const { Song } = models;
    
    return {
        getSongById(songId) {

            return new Promise((resolve, reject) => {

                Song.findOne({ "audioId": songId }, (err, song) => {
                    if (err) {

                        return reject(err);
                    }

                    if (!song) {

                        return reject(song);
                    }

                    return resolve(song);
                });
            });
        },
        getSongByTitle(songTitle) {

            return new Promise((resolve, reject) => {

                Song.find({ "title": songTitle }, (err, song) => {
                    if (err) {

                        return reject(err);
                    }

                    if (song.length === 0) {

                        return reject(false);
                    }

                    return resolve(song);
                });
            });
        },
        getSongsByCategory(category) {
            return new Promise((resolve, reject) => {

                Song.find({ "category": category }, (err, songs) => {
                    if (err) {

                        return reject(err);
                    }

                    if (songs.length == 0) {

                        return reject(category);
                    }

                    return resolve(songs);
                });
            });
        },
        getAllSongs() {
            return new Promise((resolve, reject) => {

                Song.find({}, (err, songs) => {
                    if (err) {

                        return reject(err);
                    }

                    if (songs.length == 0) {

                        return reject("Songs are missing");
                    }

                    return resolve(songs);
                });
            });
        },
        createManySongs(songCollection) {
            let songs = [];

            for (var songId in songCollection) {
                let song = {
                    audioId: songCollection[songId].AudioFileId,
                    title:songCollection[songId].Title,
                    category: songCollection[songId].Category,
                    duration: songCollection[songId].Duration,
                    mp3Url: songCollection[songId].SecureMp3Url,
                    oggUrl: songCollection[songId].SecureOggUrl,
                };

                songs.push(song);
            }

            return new Promise((resolve, reject) => {
                Song.insertMany(songs, (err, song) => {
                    if(err) {
                        return reject(err);
                    }

                    return resolve(song);
                });
            });
        }
    };
};