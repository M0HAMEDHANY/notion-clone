import { initializeApp, getApps, getApp, App, cert } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import serviceKey from "@/service_key.json"; // Use import here

let app: App;

if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceKey),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { adminDb, app as adminApp };
