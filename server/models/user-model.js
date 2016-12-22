/* global require module*/
"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, validate: /[a-zA-Z0-9]+/, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    firstname: { type: String, validate: /[a-zA-Z]+/, required: true },
    lastname: { type: String, validate: /[a-zA-Z]+/, required: true },
});

mongoose.model("user", userSchema);

module.exports = mongoose.model("user");