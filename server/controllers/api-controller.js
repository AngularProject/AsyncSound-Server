/* globals module require */
"use strict";

module.exports = function({ data }) {
    return {
        createUser(req, res) {
            const user = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname
            };
                
            data.createUser(user)
                .then(() => {
                    res.redirect(307, "/home");
                })
                .catch(err => {
                    res.status(404)
                        .send(`REGISTER FAIL, TRY AGAIN ===>${err}`);
                });
        },
        getUserByUsername(req, res) {
            data.getUserByUsername(req.params.name)
                .then(user => {
                    res.status(200)
                        .json(user);
                })
                .catch(err => {
                    res.status(404)
                        .send(`USER ${err} DOESN'T EXIST`);
                });
        }
    };
};
