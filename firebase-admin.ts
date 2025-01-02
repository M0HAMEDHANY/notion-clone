import { initializeApp, getApps, getApp, App, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const serviceKey = require("./service_key.json");
let app: App;

if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceKey),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);
const adminAuth = getAuth(app);

export { adminDb, adminAuth, app as adminApp };
