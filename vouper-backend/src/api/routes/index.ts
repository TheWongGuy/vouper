import * as Router from 'koa-router';

import users from './users';

const router = new Router({ prefix: '/api' });

router.get('/', async (ctx) => {
    let response = "Welcome to the Vouper API";
    ctx.body = response;
});

router.get('/version', async (ctx) => {
    let response = { "name": "Vouper", "version": "1.0.0"};
    ctx.body = response;
});

router.use('/users', users.routes());

export default router;