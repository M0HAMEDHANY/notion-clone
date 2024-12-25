"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";




function Document({ id }: { id: string }) {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id));
    const [input, setInput] = useState("");
    const [isUpdating, startTransition] = useTransition();


    useEffect(() => {
        if (data) {
            setInput(data.title);
        }
    }, [data]);

    const updateTitle = (e : FormEvent) => {
        e.preventDefault();
        if (input.trim()){
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {title: input});
            })
        }
    }

    return (
        <div>
            {/* headrer */}
            <div className="flex max-w-6xl mx-auto justify-between pb-5">
                <form onSubmit={updateTitle} className="flex w-full space-x-2">
                    {/* update title */}
                    <Input value={input} onChange={(e) => setInput(e.target.value)} />                    
                    <Button disabled={isUpdating}>{isUpdating ? 'Updating...' : 'Update'}</Button>
                    {/*  */}

                    {/*  */}
                </form>
            </div>
            <div>
                {/* manage users */}
                {/* avatars  */}
            </div>
            {/* collaborative editor */}
        </div>
    );
}

export default Document;
