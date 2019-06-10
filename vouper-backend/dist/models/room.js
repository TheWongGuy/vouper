"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var roomSchema = new Schema({
    roomid: { type: String, required: true },
    question: { type: String, required: true },
    answers: [{ type: String }],
    owner: { type: String, required: true },
    users: [{ type: String }]
});
exports.default = mongoose.model('Room', roomSchema);
