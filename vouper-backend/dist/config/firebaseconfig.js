"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serviceAccount = require("../../vouper-1b2ce-firebase-adminsdk-3dwff-c57b13e433");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vouper-1b2ce.firebaseio.com"
});
exports.default = admin;
