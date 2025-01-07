"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import LoadingSpinner from "./LoadingSpinner";
import Editor from "./Editor";
import useOwner from "../hooks/useOwner"
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import Avatars from "./Avatars";

function Document({ id }: { id: string }) {
  
  const docRef = doc(db, "documents", id);
  const [data, loading, error] = useDocumentData(docRef);
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const isOwner = useOwner()


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
      });
    } catch (err) {
      console.error("Error updating title:", err);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error("Error details:", error.message); 
  }

  if (!data) {
    console.warn("No data found for document ID:", id); 
  }

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
        <Avatars />
      </div>

      <hr className="pb-10" />

      <Editor />
    </div>
  );
}

export default Document;
