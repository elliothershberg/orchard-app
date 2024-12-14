"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

export default function SearchForm({
  initialQuery = "",
}: {
  initialQuery: string;
}) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [textareaHeight, setTextareaHeight] = useState("40px");
  const router = useRouter();

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchQuery(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setTextareaHeight(`${e.target.scrollHeight}px`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-start space-x-2 mb-8">
      <div className="relative flex-grow">
        <Textarea
          placeholder="Enter your search query"
          value={searchQuery}
          onChange={handleTextareaChange}
          className="pr-10 border-black min-h-[40px] max-h-[200px] overflow-hidden"
          style={{ height: textareaHeight }}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="absolute right-2 top-2 h-8 w-8 p-0"
            >
              <QuestionMarkCircledIcon className="h-5 w-5 text-gray-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <p>
              Search the oRchard for topics, ideas, or specific content. Use
              keywords for better results.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <Button
        type="submit"
        disabled={!searchQuery.trim()}
        className="bg-[#bc2635] text-white hover:bg-[#a61f2d] disabled:bg-gray-300"
      >
        Search
      </Button>
    </form>
  );
}
