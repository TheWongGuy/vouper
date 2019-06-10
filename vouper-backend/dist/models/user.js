"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    uid: { type: String, required: true },
    email: { type: String, required: true },
    rooms: [{ type: String }]
});
exports.default = mongoose.model('User', userSchema);
