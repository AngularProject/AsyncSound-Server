/* globals module require */
"use strict";

module.exports = function() {
    return {
        redirectHomePage(req, res) {
            res.redirect("/home");
        },
        loadHomePage(req, res) {
            const user = {
                isLogged : !!req.isAuthenticated()
            };

            res.status(200).send(user);
        }
    };
};