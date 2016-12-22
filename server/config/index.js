/* globals module */

module.exports = {
    port: process.env.PORT || 3000,
    connectionString: process.env.CONNECTION_STRING || "mongodb://localhost/async-sound"
};