const config = require("./server/config");
const data = require("./server/data")(config);
const app = require("./server/config/application")({ data });
const validator = require("./server/utils/validator");
const songs = require('./server/utils/songsfeed');

require("./server/routers")({ app, data, validator });


data.getSongsByCategory("bass")
    .then(song => {
        console.log(song);
    })
    .catch(() => {
        data.createManySongs(songs);
    });

app.listen(config.port, () => {
    console.log(`Application listen on port: ${config.port}`);
});