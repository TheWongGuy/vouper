"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const mongoose = require("mongoose");
const api_1 = require("./api");
const PORT = 3000;
mongoose.connect('mongodb://vouper:vouper@localhost:27017/vouper_dev?authSource=admin', { useNewUrlParser: true });
console.log('Launching the ' + chalk_1.default.red('Vouper') + " API");
api_1.default.listen(PORT, () => {
    console.log('Server is listening at --> localhost:' + chalk_1.default.blue(PORT.toString()));
});
