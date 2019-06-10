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
const admin = require("firebase-admin");
class Helper {
    sessionToUID(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            let uid = null;
            let session_id = sessionId;
            let decodedToken = null;
            try {
                decodedToken = yield admin.auth().verifyIdToken(session_id);
                uid = decodedToken.uid;
            }
            catch (err) {
                console.log("Session ID does not map to user");
            }
            return uid;
        });
    }
}
exports.default = new Helper();
