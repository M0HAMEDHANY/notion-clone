"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { creatNewDocument } from "@/actions/actions";
import { useUser } from "@clerk/nextjs";

const NewDocumentButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleCreatNewDocument = () => {
    if (!isSignedIn) {
      router.push(
        "https://chief-lion-94.accounts.dev/sign-up?redirect_url=https://notion-clone-m0hamedhanys-projects.vercel.app/"
        //"https://chief-lion-94.accounts.dev/sign-in?redirect_url=https%3A%2F%2Fnotion-clone-o7h1o2imn-m0hamedhanys-projects.vercel.app%2F"
      );
      return;
    }

    startTransition(async () => {
      const { docId } = await creatNewDocument();
      router.push(`/doc/${docId}`);
    });
  };

  return (
    <Button onClick={handleCreatNewDocument} disabled={isPending}>
      {isPending ? "Creating..." : "Create New Document"}
    </Button>
  );
};

export default NewDocumentButton;
