"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const HelperLibrary_1 = require("../HelperLibrary");
const user_1 = require("../../../models/user");
const users = new Router();
users.get('/', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let user = null;
    let session_id = ctx.get('Session-ID');
    let uid = yield HelperLibrary_1.default.sessionToUID(session_id);
    user = yield user_1.default.find({ uid: uid });
    ctx.body = user;
}));
users.post('/', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let sessionId = ctx.request.body.sessionId;
    let uid = yield HelperLibrary_1.default.sessionToUID(sessionId);
    if (uid) {
        console.log("Creating new user: " + uid);
        let dbq = yield user_1.default.find({ uid: uid });
        if (dbq.length == 0 || dbq === undefined) {
            let user = new user_1.default();
            user.uid = uid;
            user.email = ctx.request.body.email;
            user.rooms = [];
            user.save();
            console.log("User created.");
            ctx.body = "Success";
        }
        else {
            ctx.body = "User not found";
            console.log("User already exists.");
        }
    }
    else {
        ctx.body = "Session ID does not map to a user";
    }
}));
exports.default = users;
