"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
console.log("Establishing connection to database...");
mongoose.connect('mongodb://vouper:vouper@localhost:27017/vouper_dev?authSource=admin', { useNewUrlParser: true });
exports.default = mongoose;
