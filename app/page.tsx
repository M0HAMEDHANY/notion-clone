import {
  FileText,
  Users,
} from "lucide-react";
import NewDocumentButton from "@/components/NewDocumentButton";

export default function Home() {
  return (
    <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8 py-12 flex flex-col justify-center items-center">
      <main className="flex flex-col items-center justify-center">
        <h1 className="lg:text-8xl text-4xl font-semibold text-center mb-6 ">
          Welcome to Your Digital Workspace
        </h1>
        <p className="text-xl text-center text-gray-600 mb-8">
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
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-3">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
