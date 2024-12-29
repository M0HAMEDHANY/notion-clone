import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

async function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  // Protect the route
  await auth.protect();

  const { id } = await params; // Ensure we are getting the ID from params
  // console.log("Layout rendering with ID:", id);

  // Check if the ID is valid
  if (!id) {
    return <div className="p-4">Invalid document ID</div>;
  }

  return (
    <div>
      <RoomProvider roomId={id}>{children}</RoomProvider>
    </div>
  );
}

export default DocLayout;