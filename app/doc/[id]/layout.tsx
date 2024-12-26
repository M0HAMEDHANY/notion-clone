import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

async function DocLayout({
  children,
  params, // Destructure later after awaiting
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  // Ensure params are awaited
  const { id } = await Promise.resolve(params);

  // Protect the route
  auth.protect();

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

export default DocLayout;
