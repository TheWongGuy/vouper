import * as Router from 'koa-router';
import * as mongoose from 'mongoose';
import * as admin from 'firebase-admin';
import helper from '../HelperLibrary';

import User from '../../../models/user';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

const users = new Router();

users.get('/', async (ctx) => {
    let user = null;
    let session_id = ctx.get('Session-ID');
    let uid = await helper.sessionToUID(session_id);
    user = await User.find({ uid: uid });
    ctx.body = user;
});

users.post('/', async (ctx, next) => {
    let sessionId = ctx.request.body.sessionId;
    let uid = await helper.sessionToUID(sessionId);
    if (uid) {
        console.log("Creating new user: " + uid);
        let dbq = await User.find({ uid: uid });
        if (dbq.length == 0 || dbq === undefined) {
            let user = new User();
            user.uid = uid;
            user.email = ctx.request.body.email; 
            user.rooms = [];
            user.save();
            console.log("User created.");
            ctx.body = "Success";
        } else {
            ctx.body = "User not found"
            console.log("User already exists.");
        }
    } else {
        ctx.body = "Session ID does not map to a user";
    }
});

export default users;