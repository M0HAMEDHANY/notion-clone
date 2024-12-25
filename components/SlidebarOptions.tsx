import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

function SlidebarOptions({ href, id }: { href: string; id: string }) {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id));
    const pathName = usePathname();
    const isActive = href.includes(pathName) && pathName !== "/";

    if (!data) return null;

    return (
        <Link href={href} className={`relative border p-2 my-1 rounded-md ${isActive ? "bg-gray-30 font-bold border-black text-primary" : "bg-primary text-primary-foreground hover:bg-primary/90border-gray-400"}`}>
            <p className="truncate">{data.title}</p>
        </Link>
    );
}

export default SlidebarOptions;