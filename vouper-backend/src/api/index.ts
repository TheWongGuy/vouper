import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as bodyParse from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as admin from 'firebase-admin';
import router from './routes';

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
api.use(router.routes());
api.use(router.allowedMethods());


export default api;