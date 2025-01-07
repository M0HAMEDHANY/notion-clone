import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    auth.protect();
    const { sessionClaims } = await auth();
    // console.log("Session claims:", sessionClaims);
    if (!sessionClaims?.email) {
      return NextResponse.json(
        { message: "No valid session found" },
        { status: 401 }
      );
    }
    // if you try to inter the room you will get the pass through on the author endpoint
    const { room } = await req.json();

    //  then get the user who logged in and make a session with his e-mail
    const session = liveblocks.prepareSession(sessionClaims?.email!, {
      userInfo: {
        name: sessionClaims?.fullName!,
        email: sessionClaims?.email!,
        avatar: sessionClaims?.image!,
      },
    });

    // check the users db records to see all the rooms that this user has access to
    const usersInRoom = await adminDb
      .collectionGroup("rooms")
      .where("userId", "==", sessionClaims?.email!)
      .get();

    // console.log("Found rooms:", usersInRoom.docs.map(doc => doc.id));
    // console.log("Looking for room:", room);
    if (!room) {
      return NextResponse.json(
        { message: "Room ID is required" },
        { status: 400 }
      );
    }

    //  then ckeck if the room thatr we about the access
    //  in the list of records that stored in the list of records that are stored in the users room collection
    const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

    // if the user is in the room then we can proceed with the request
    if (userInRoom?.exists) {
      session.allow(room, session.FULL_ACCESS);
      const { body, status } = await session.authorize();
      console.log("you are allowed to join this room");
      return new Response(body, { status });
    } else {
      return NextResponse.json(
        { message: "You are not allowed to join this room" },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("Auth endpoint error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
