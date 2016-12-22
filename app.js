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

data.getUserByUsername("admin")
    .then((user) => {
        console.log(user);
    })
    .catch(() => {
        data.createUser(adminUser);
    });
// ====================

app.listen(config.port, () => {
    console.log(`Application listen on port: ${config.port}`);
});