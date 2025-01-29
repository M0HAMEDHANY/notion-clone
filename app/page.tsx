"use client"
import {
  FileText,
  Users,
} from "lucide-react";
import NewDocumentButton from "@/components/NewDocumentButton";
import { useTheme } from "@/components/ThemeProvider";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className={`max-w-5xl px-4 mx-auto sm:px-6 lg:px-8 py-12 flex flex-col justify-center items-center ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white"}`}>
      <main className="flex flex-col items-center justify-center">
        <h1 className="lg:text-8xl text-4xl font-semibold text-center mb-6 ">
          Welcome to Your Digital Workspace
        </h1>
        <p className={`text-xl text-center ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-8`}>
          Organize, collaborate, and create with ease.
        </p>
        <div className="flex justify-center mb-12">
          <NewDocumentButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-blue-500" />}
            title="Rich Document Editing"
            description="Create and edit documents with a powerful Collaborative editor."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-green-500" />}
            title="Real-time Collaboration"
            description="Work together with your team in real-time on shared documents."
          />
        </div>
      </main>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const { theme } = useTheme();

  return (
    <div className={`p-6 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-3">{title}</h3>
      </div>
      <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{description}</p>
    </div>
  );
}