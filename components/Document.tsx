"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import { collectionGroup, doc, getDoc, updateDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "@clerk/nextjs";
import Editor from "./Editor";
import useOwner from "../hooks/useOwner"
import DeleteDocument from "./DeleteDocument";
import { useRoom } from "@liveblocks/react";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";

function Document({ id }: { id: string }) {
  
  const docRef = doc(db, "documents", id);
  const [data, loading, error] = useDocumentData(docRef);
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const { getToken } = useAuth();
  const isOwner = useOwner()
  const room = useRoom();

  
  // const {user} = useUser();
  // const [test] = useCollection(
  //   user &&
  //     query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  // );

  // console.log("",test);
  // const isStringg = typeof room?.id === 'string';
  // console.log("room id is string: ",isStringg);
  
  // console.log("Room ID:", room?.id);


      

  
  // console.log("Document component rendering with id:", id);
  // console.log("Fetched document data:", data);
  // console.log("Loading state:", loading);
  // console.log("Error state:", error);
  // console.log("Document Reference Path:", docRef.path);

  // useEffect(() => {
  //   const fetchDocument = async () => {
  //     try {
  //       const docRef = doc(db, "documents", id);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         console.log("Document Data:", docSnap.data());
  //       } else {
  //         console.log("No such document!");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching document:", error);
  //     }
  //   };
  //   fetchDocument();
  // }, [id]);

  // useEffect(() => {
  //   const validateSession = async () => {
  //     try {
  //       const token = await getToken();
  //       // console.log("Decoded Token:", token);
  //     } catch (error) {
  //       console.error("Token error:", error);
  //     }
  //   };
  //   validateSession();
  // }, [getToken]);

  useEffect(() => {
    if (data?.title) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      startTransition(async () => {
        await updateDoc(docRef, {
          title: input,
          lastUpdated: new Date().toISOString(),
        });
        // console.log("Title updated successfully");
      });
    } catch (err) {
      console.error("Error updating title:", err);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error("Error details:", error.message); // Log error
  }

  if (!data) {
    console.warn("No data found for document ID:", id); // Log missing data
  }
  // if (!data?.title) {
  //   return (
  //     <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg">
  //       <h3 className="font-semibold">Document Title Missing</h3>
  //       <p>Please update the document title.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="flex-1 h-full bg-white p-5">
      {/* Header */}
      <div className="flex max-w-6xl mx-auto justify-between pb-5">
        <form onSubmit={updateTitle} className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Document title"
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={isUpdating || !input.trim()}
            className="min-w-[100px]"
          >
            {isUpdating ? "Updating..." : "Update"}
          </Button>

          {isOwner && (
            <>
              <InviteUser />
              <DeleteDocument />
            </>
          )}
        </form>
      </div>

      <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
        <ManageUsers />
        {/* <Avatars /> */}
      </div>

      <hr className="pb-10" />

      <Editor />
    </div>
  );
}

export default Document;
