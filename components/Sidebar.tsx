'use client'

import { MenuSquareIcon } from "lucide-react"
import NewDocumentButton from "./NewDocumentButton"
import { useCollection } from "react-firebase-hooks/firestore"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useUser } from "@clerk/nextjs"
import { collection, query, where, DocumentData } from "firebase/firestore";
import { db } from "@/firebase"
import { useEffect, useState } from "react"
import SlidebarOptions from "./SlidebarOptions"

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
          where("userId", "==", user?.primaryEmailAddress?.emailAddress)
        )
    );

    useEffect(() => {
        if (!data) return;

        // Group the documents by ownership
        const grouped = data.docs.reduce<{
            owner: RoomDocument[];
            editor: RoomDocument[];
        }>(
            (acc, doc) => {
                const docData = doc.data() as RoomDocument;
                
                // For now, all documents created by the user are owned by them
                acc.owner.push({
                    id: doc.id,
                    ...docData,
                    role: "owner" // Since we're querying by userId, these are all owned documents
                });
                
                return acc;
            },
            { owner: [], editor: [] }
        );
            
        setGroupedData(grouped);        
    }, [data]);

    const menuOptions = (
        <>
            <NewDocumentButton />
            <div className="flex py-4 flex-col md:max-w-36">
                {groupedData.owner.length === 0 ? (
                    <h2 className="text-gray-500 font-semibold text-sm">
                        You have no documents
                    </h2>
                ) : (
                    <>
                        <h2 className="text-gray-500 font-semibold text-sm">My Documents</h2>
                        {groupedData.owner.map((doc) => (
                            <SlidebarOptions 
                                key={doc.id} 
                                id={doc.id} 
                                href={`/doc/${doc.id}`}
                            />
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

            <div className="hidden md:inline">
                {menuOptions}
            </div>
        </div>
    );
}

export default Sidebar;