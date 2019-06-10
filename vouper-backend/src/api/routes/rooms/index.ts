import * as Router from 'koa-router';
import * as admin from 'firebase-admin';
import helper from '../HelperLibrary';

import Room from '../../../models/room';

const rooms = new Router();

rooms.get('/:roomid', async (ctx) => {
    let user = null;
    let session_id = ctx.get('Session-ID');
    let uid = await helper.sessionToUID(session_id);

    
});