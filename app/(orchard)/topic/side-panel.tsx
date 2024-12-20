import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SidePanelProps {
  topic: {
    title: string;
    specificTopics: string[];
  };
  onClose: () => void;
}

export default function SidePanel({ topic, onClose }: SidePanelProps) {
  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg p-6 transform transition-transform duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-black">{topic.title}</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      <h4 className="text-lg font-medium text-red-600 mb-4">
        Specific Topics:
      </h4>
      <ul className="space-y-3">
        {topic.specificTopics.map((specificTopic, index) => (
          <li key={index} className="text-black flex items-center">
            <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
            {specificTopic}
          </li>
        ))}
      </ul>
    </div>
  );
}
