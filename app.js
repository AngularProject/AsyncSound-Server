const config = require("./server/config");
const data = require("./server/data")(config);
const app = require("./server/config/application")({ data });

require("./server/routers")({ app, data });

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

// data.removeUserFromPlaylist(update)
//     .then(res => {
//         console.log(res);
//     });
// ====================

app.listen(config.port, () => {
    console.log(`Application listen on port: ${config.port}`);
});