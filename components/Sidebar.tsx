"use client";

import { MenuSquareIcon } from "lucide-react";
import NewDocumentButton from "./NewDocumentButton";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@clerk/nextjs";
import { collection, query, where, DocumentData } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import SlidebarOptions from "./SlidebarOptions";

interface RoomDocument extends DocumentData {
    createdAt: string;
    role: "owner" | "editor";
    userId: string;
    roomId: string;
}

const Sidebar = () => {
    const [groupedData, setGroupedData] = useState<{
        owner: RoomDocument[];
        editor: RoomDocument[];
    }>({
        owner: [],
        editor: [],
    });

    

    const { user } = useUser();
    const [data, loading, error] = useCollection(
        user &&
        query(
            collection(db, "documents"),
            where("userId", "==", user?.emailAddresses[0].toString())
        )
    );
    

useEffect(() => {
    if (loading) return; // Don't process data if it's still loading
    if (error) {
        console.error("Error fetching documents:", error);
        return;
    }

    if (data) {
        // Group the documents by ownership
        const grouped = data.docs.reduce<{
        owner: RoomDocument[];
        editor: RoomDocument[];
        }>(
        (acc, doc) => {
            const docData = doc.data() as RoomDocument;
            console.log("doc data rendered", docData);

            if (docData.role === "owner") {
            acc.owner.push({
                id: doc.id,
                ...docData,
            });
            } else if (docData.role === "editor") {
            acc.editor.push({
                id: doc.id,
                ...docData,
            });
            }

            return acc;
        },
        { owner: [], editor: [] }
        );

        setGroupedData(grouped);
        data.docs.forEach((doc) => console.log("Document Data:", doc.data()));

        console.log("Data from Firestore:", data);
        console.log("Grouped Data:", groupedData);
    }
    
}, [data, loading, error]);



    const menuOptions = (
        <>
            <NewDocumentButton />

            {/* My Documents */}
            <div className="flex py-4 flex-col space-y-4 md:max-w-36">
                {groupedData.owner.length === 0 ? (
                <h2 className="text-gray-500 font-semibold text-sm">
                    No documents found.
                </h2>
                ) : (
                <>
                    <h2 className="text-gray-500 font-semibold text-sm">
                    My Documents
                    </h2>

                    {groupedData.owner.map((doc) => (
                    <SlidebarOptions key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
                    ))}
                </>
                )}

                {/* Shared With Me */}

                {groupedData.editor.length > 0 && (
                <>
                    <h2 className="text-gray-500 font-semibold text-sm">
                    Shared with me
                    </h2>

                    {groupedData.editor.map((doc) => (
                    <SlidebarOptions key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
                    ))}
                </>
                )}
            </div>
        </>
    );

    return (
        <div className="p-2 md:p-5 bg-gray-200 relative">
        <div className="md:hidden">
            <Sheet>
            <SheetTrigger>
                <MenuSquareIcon size={24} />
            </SheetTrigger>
            <SheetContent side={"left"}>
                <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <div>{menuOptions}</div>
                </SheetHeader>
            </SheetContent>
            </Sheet>
        </div>
        <div className="hidden md:inline">{menuOptions}</div>
        </div>
    );
};

export default Sidebar;
