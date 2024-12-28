// "use client";
// import Document from "@/components/Document";

// export default function DocumentPage({ params }: { params: { id: string } }) {
//   console.log("DocumentPage rendering"); // Basic render check
//   console.log("Params received:", params); // Check params
//   console.log("DocumentPage rendering with params:", params);

//   if (!params?.id) {
//     return <div>Invalid document ID</div>;
//   }
//   if (!params?.id) {
//     return <div className="p-4">Missing document ID</div>;
//   }
//   // Add visible UI feedback
//   return (
//     <div className="flex flex-col flex-1 min-h-screen">
//       <div>Debug: attempting to render document with ID: {params?.id}</div>
//       <Document id={params.id} />
//     </div>
//   );
// }

"use client";
import Document from "@/components/Document";

function DocumentPage({ params }: { params: { id: string } }) {
  console.log("DocumentPage rendering"); // Basic render check
  console.log("Params received:", params); // Check params

  // Check if the ID is valid
  if (!params?.id || typeof params.id !== 'string') {
    return <div className="p-4">Invalid or missing document ID</div>;
  }

  // Add visible UI feedback
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <div>Debug: attempting to render document with ID: {params.id}</div>
      <Document id={params.id} />
    </div>
  );
}


export default DocumentPage;