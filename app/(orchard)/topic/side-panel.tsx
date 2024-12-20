import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    <>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-96 bg-white border-l shadow-lg z-50 animate-in slide-in-from-right duration-300">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-semibold text-foreground">
                {topic.title}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 hover:bg-[#bc2635]/10 hover:text-[#bc2635]"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-[#bc2635] mb-4 tracking-wide">
                  SPECIFIC TOPICS
                </h4>
                <ul className="space-y-3">
                  {topic.specificTopics.map((specificTopic, index) => (
                    <li
                      key={index}
                      className="group flex items-center gap-4 rounded-lg border p-3 hover:bg-[#bc2635]/5 hover:border-[#bc2635]/20 transition-all cursor-pointer"
                    >
                      <div className="h-2 w-2 rounded-full bg-[#bc2635]/70 group-hover:bg-[#bc2635] transition-colors" />
                      <span className="text-sm font-medium group-hover:text-[#bc2635]">
                        {specificTopic}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
