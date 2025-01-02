"use server";

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export const creatNewDocument = async () => {
  auth.protect();
  const { sessionClaims } = await auth();

  if (!sessionClaims?.email) {
    throw new Error("No user email found in session");
  }

  const docRef = await adminDb.collection("documents").add({
    title: "Untitled",
    createdAt: new Date().toISOString(),
    userId: sessionClaims.email!,
    lastUpdated: new Date().toISOString(),
  });

  // Create the room directly in the document's subcollection
  await adminDb
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email!,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
};
