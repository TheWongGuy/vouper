import * as admin from 'firebase-admin';

class Helper {
    async sessionToUID(sessionId: string) {
        let uid = null;
        let session_id = sessionId;
        let decodedToken = null;
        try {
            decodedToken = await admin.auth().verifyIdToken(session_id);
            uid = decodedToken.uid;
        } catch (err) {
            console.log("Session ID does not map to user");
        }
        return uid;
    }
}

export default new Helper();
