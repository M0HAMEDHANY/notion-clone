"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import LoadingSpinner from "./LoadingSpinner";

function Document({ id }: { id: string }) {
    // console.log("Document component rendering with id:", id)

    const docRef = doc(db, "documents", id);
    const [data, loading, error] = useDocumentData(docRef);
    const [input, setInput] = useState("");
    const [isUpdating, startTransition] = useTransition();

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
        return (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
            <h3 className="font-semibold">Error loading document</h3>
            <p>{error.message}</p>
        </div>
        );
    }

    if (!data) {
        return (
        <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg">
            <h3 className="font-semibold">Document Not Found</h3>
            <p>No document found for ID: {id}</p>
        </div>
        );
    }

        return (
          <div className="p-4">
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
              </form>
            </div>

            <div className="max-w-6xl mx-auto">
              {/* Content placeholder for future implementation */}
              <hr className="pb-10" />
                {/* Collaborative editor will go here */}
              
            </div>
          </div>
        );
}

export default Document;
