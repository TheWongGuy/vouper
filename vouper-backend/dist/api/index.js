"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const logger = require("koa-logger");
const json = require("koa-json");
const bodyParse = require("koa-bodyparser");
const cors = require("@koa/cors");
const admin = require("firebase-admin");
const routes_1 = require("./routes");
const api = new Koa();
var serviceAccount = require("../../vouper-1b2ce-firebase-adminsdk-3dwff-c57b13e433");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vouper-1b2ce.firebaseio.com"
});
api.use(cors());
api.use(logger());
api.use(json());
api.use(bodyParse());
api.use(routes_1.default.routes());
api.use(routes_1.default.allowedMethods());
exports.default = api;
