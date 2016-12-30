"use strict";

module.exports = ({ app, data, validator }) => {
    const adminController = require("../controllers/admin-controller.js")({ data });

    app.get("/admin-panel",
        (req, res) => res.status(200).send(`            
                    <form action="submit">
                            <div>
                                <input type="text" name="username">
                            </div>
                            <button type="submit" name="action">Submit                
                            </button>
                        </form>`));

    app.post("/user-role", adminController.setUserAsAdmin)
}