"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState("40px");

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchQuery(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setTextareaHeight(`${e.target.scrollHeight}px`);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulating a search delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Here you would typically fetch search results
    setIsSearching(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-white p-4 text-black">
      <div className="w-full max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Search the oRchard
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex items-start space-x-2 mb-8"
        >
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
            disabled={isSearching || !searchQuery.trim()}
            className="bg-[#bc2635] text-white hover:bg-[#a61f2d] disabled:bg-gray-300"
          >
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </form>

        <div className="space-y-4">
          {/* Search results will be displayed here */}
          <p className="text-center text-gray-600">
            Enter a search query and click &apos;Search&apos; to see results.
          </p>
        </div>
      </div>
    </main>
  );
}
