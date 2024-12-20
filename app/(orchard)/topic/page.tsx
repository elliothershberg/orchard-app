"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TopicCard from "./topic-card";
import SidePanel from "./side-panel";

const broadTopics = [
  {
    id: 1,
    title: "Alzheimer's Disease",
    specificTopics: ["Amyloid plaques", "Tau proteins", "Neuroinflammation"],
  },
  {
    id: 2,
    title: "Drosophila Biology",
    specificTopics: [
      "Gene expression",
      "Developmental stages",
      "Neurogenetics",
    ],
  },
  {
    id: 3,
    title: "Quantum Computing",
    specificTopics: ["Qubits", "Quantum entanglement", "Quantum algorithms"],
  },
];

const specificTopics = [
  "Amyloid plaques",
  "Tau proteins",
  "Neuroinflammation",
  "Gene expression",
  "Developmental stages",
  "Neurogenetics",
  "Qubits",
  "Quantum entanglement",
  "Quantum algorithms",
];

export default function TopicsPage() {
  const [topicType, setTopicType] = useState<"broad" | "specific">("broad");
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const handleTopicSelect = (title: string) => {
    setSelectedTopics((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-black">Research Topics</h1>
      <div className="flex items-center space-x-4 mb-6">
        <Select
          onValueChange={(value) => setTopicType(value as "broad" | "specific")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select topic type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="broad">Broad Topics</SelectItem>
            <SelectItem value="specific">Specific Topics</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-lg font-semibold text-black">
          Viewing:{" "}
          <span>
            {topicType.charAt(0).toUpperCase() + topicType.slice(1)} Topics
          </span>
        </span>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-black mb-2">
          Selected Topics
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg min-h-[50px]">
          {selectedTopics.length > 0 ? (
            <ul className="list-disc list-inside">
              {selectedTopics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Select topic(s)</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topicType === "broad"
          ? broadTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                title={topic.title}
                onClick={() => handleTopicSelect(topic.title)}
                isSelected={selectedTopics.includes(topic.title)}
                showSpecificTopics={() => setSelectedTopic(topic.id)}
                isSpecificTopicsShown={selectedTopic === topic.id}
              />
            ))
          : specificTopics.map((topic, index) => (
              <TopicCard
                key={index}
                title={topic}
                onClick={() => handleTopicSelect(topic)}
                isSelected={selectedTopics.includes(topic)}
              />
            ))}
      </div>
      {selectedTopic !== null && (
        <SidePanel
          topic={broadTopics.find((t) => t.id === selectedTopic)!}
          onClose={() => setSelectedTopic(null)}
        />
      )}
    </div>
  );
}
