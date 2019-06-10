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
const users_1 = require("./users");
const router = new Router({ prefix: '/api' });
router.get('/', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let response = "Welcome to the Vouper API";
    ctx.body = response;
}));
router.get('/version', (ctx) => __awaiter(this, void 0, void 0, function* () {
    let response = { "name": "Vouper", "version": "1.0.0" };
    ctx.body = response;
}));
router.use('/users', users_1.default.routes());
exports.default = router;
