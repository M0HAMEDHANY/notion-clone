'use client'

import { useRouter } from "next/navigation";
import { Button } from "./ui/button"
import { useTransition } from "react"
import { creatNewDocument } from "@/actions/actions";

const NewDocumentButton = () => {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();


    const handleCreatNewDocument = () => {
        startTransition( async () => {
            const {docId}= await creatNewDocument();
            router.push(`/document/${docId}`);
        });
    }

    return (
        <Button onClick={handleCreatNewDocument} disabled= {isPending}>
            {isPending ? 'Creating...' : 'New Document'}
        </Button>
    )
}

export default NewDocumentButton
