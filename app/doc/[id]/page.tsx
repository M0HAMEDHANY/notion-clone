"use client";
import Document from "@/components/Document";
import { useEffect, useState } from "react";

function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    // Unwrapping the `params` promise
    params
      .then((resolvedParams) => {
        setId(resolvedParams.id);
      })
      .catch((err) => {
        console.error("Error resolving params:", err);
        setId(null);
      });
  }, [params]);

  if (id === null) {
    return <div className="p-4">Loading document...</div>;
  }

  if (!id || typeof id !== "string") {
    return <div className="p-4">Invalid or missing document ID</div>;
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
}

export default DocumentPage;
