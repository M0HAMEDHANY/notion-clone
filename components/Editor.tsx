import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import stringToColor from "@/lib/stringToColor";
// import { MoonIcon, SunIcon } from "lucide-react";
// import { Button } from "./ui/button";
import { useTheme } from "./ThemeProvider";

type EditorProps = {
  doc: Y.Doc;
  provider: any;
  darkMode: boolean;
};

function BlockNote({ doc, provider, darkMode }: EditorProps) {
  const userInfo = useSelf((me) => me.info);
  const { theme } = useTheme();

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo?.name,
        color: stringToColor(userInfo?.email),
      },
    },
  });

  return (
    <div className={`relative max-w-6xl mx-auto ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <BlockNoteView
        className="min-h-screen"
        editor={editor}
        theme={theme === "dark" ? "dark" : "light"}
      />
    </div>
  );
}

function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();
  // const [darkMode, setDarkMode] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    // if the room changed destroy the old one
    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  // const style = `hover:text-white ${
  //   darkMode
  // //     ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
  //     : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
  // }`;

  return (
    <div className="max-w-6xl mx-auto">
      <BlockNote doc={doc} provider={provider} darkMode={theme === "dark"} />
    </div>
  );
}

export default Editor;
