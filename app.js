const config = require("./server/config");
const data = require("./server/data")(config);
const app = require("./server/config/application")({ data });
const validator = require("./server/utils/validator");
const songs = require('./server/utils/songsfeed');

require("./server/routers")({ app, data, validator });

// For testing purposes
// ====================
const adminUser = {
    username: "admin",
    email: "admin@async-sound.com",
    password: "pass",
    firstname: "async",
    lastname: "sound",
};

// const playlist = {
//     title: "AsyncSound",
//     creator: "admin",
//     createdOn: Date.now(),
//     isPublic: "false"
// };

// const update = {
//     id : "58612df51266cc195c23e45d",
//     user : "moderator"
// };

data.getUserByUsername("admin")
    .then((user) => {
        console.log(user);
    })
    .catch(() => {
        data.createUser(adminUser);
    });

data.getSongsByCategory("bass")
    .then(song => {
        console.log(song);
    })
    .catch(() => {
        data.createManySongs(songs);
    });
// data.removeUserFromPlaylist(update)
//     .then(res => {
//         console.log(res);
//     });
// ====================

app.listen(config.port, () => {
    console.log(`Application listen on port: ${config.port}`);
});