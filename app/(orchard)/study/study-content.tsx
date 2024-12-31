"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TopicCard from "./topic-card";
import SidePanel from "./side-panel";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { broadTopics, specificTopics } from "./topic-data";

export default function StudyContent() {
  const router = useRouter();
  const [topicType, setTopicType] = useState<"broad" | "specific">("broad");
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const handleTopicSelect = (title: string) => {
    setSelectedTopics((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Research Topics
        </h1>
        <p className="text-muted-foreground text-lg">
          Select topics to explore research areas
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
        <Select
          defaultValue={topicType}
          onValueChange={(value) => setTopicType(value as "broad" | "specific")}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select topic type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="broad">Broad Topics</SelectItem>
            <SelectItem value="specific">Specific Topics</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            const params = new URLSearchParams();
            const broadTopicsSelected: string[] = [];
            const specificTopicsSelected: string[] = [];

            selectedTopics.forEach((topic) => {
              const broadTopic = broadTopics.find((bt) => bt.title === topic);
              if (broadTopic) {
                broadTopicsSelected.push(topic);
              } else {
                specificTopicsSelected.push(topic);
              }
            });

            if (broadTopicsSelected.length > 0) {
              params.set("broad", broadTopicsSelected.join(","));
            }
            if (specificTopicsSelected.length > 0) {
              params.set("specific", specificTopicsSelected.join(","));
            }

            router.push(`/scan?${params.toString()}`);
          }}
          className="bg-[#bc2635] hover:bg-[#a61f2d] text-white"
          disabled={selectedTopics.length === 0}
        >
          Scan selected topics
        </Button>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            Selected Topics
          </h2>
          {selectedTopics.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTopics([])}
              className="text-[#bc2635] hover:text-[#a61f2d] hover:bg-[#bc2635]/10"
            >
              Clear all
            </Button>
          )}
        </div>
        <div className="bg-white border rounded-lg min-h-[60px] p-4">
          {selectedTopics.length > 0 ? (
            <ul className="list-none space-y-3">
              {selectedTopics.map((topic, index) => {
                const broadTopic = broadTopics.find((bt) => bt.title === topic);
                return (
                  <li key={index}>
                    <div className="group flex items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#bc2635]"></div>
                        <span className="text-sm font-medium">{topic}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleTopicSelect(topic)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    {broadTopic && (
                      <ul className="mt-1 ml-4 space-y-1">
                        {broadTopic.specificTopics.map((specificTopic, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 px-2 py-0.5 text-sm text-muted-foreground"
                          >
                            <div className="h-1 w-1 rounded-full bg-[#bc2635]/50"></div>
                            {specificTopic}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-muted-foreground italic text-sm">
              No topics selected
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
