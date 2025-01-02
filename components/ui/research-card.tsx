"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HelpCircle } from "lucide-react";

interface ResearchCardProps {
  doi: string;
  title: string;
  authors: string;
  author_corresponding: string;
  author_corresponding_institution: string;
  date: string;
  category: string;
  abstract: string;
  published: string;
  topic_depth_1: string;
  topic_depth_2: string;
  topic_depth_3: string;
}

export function ResearchCard({
  doi,
  title,
  authors,
  author_corresponding,
  author_corresponding_institution,
  date,
  category,
  abstract,
  published,
  topic_depth_2,
  topic_depth_3,
}: ResearchCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <Card className="w-full max-w-2xl bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-black">{title}</CardTitle>
        <p className="text-sm text-gray-600">{authors}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs font-semibold bg-black text-white rounded-full">
            {category}
          </span>
          <span className="px-2 py-1 text-xs font-semibold bg-[#bc2635] text-white rounded-full">
            {topic_depth_2}
          </span>
          <span className="px-2 py-1 text-xs font-semibold bg-white text-black border border-black rounded-full">
            {topic_depth_3}
          </span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-6 h-6 p-0"
              >
                <HelpCircle className="h-4 w-4" />
                <span className="sr-only">Help</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <p>
                The first topic is the category of bioRxiv where the paper was
                submitted. The second topic is the broad topic from the Nomic
                topic model. The third topic is the specific topic from the
                topic model. The topic model can make categerization mistakes.
              </p>
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-semibold">Corresponding Author:</span>{" "}
            {author_corresponding}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Institution:</span>{" "}
            {author_corresponding_institution}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Date:</span>{" "}
            {new Date(date).toLocaleDateString()}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Published:</span> {published}
          </p>
          <p className="text-sm">
            <span className="font-semibold">DOI:</span>{" "}
            <a
              href={`https://doi.org/${doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#bc2635] hover:underline"
            >
              {doi}
            </a>
          </p>
        </div>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full mt-2 text-black border-black hover:bg-gray-100"
              onClick={toggleOpen}
            >
              {isOpen ? (
                <ChevronDown className="w-4 h-4 mr-2" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-2" />
              )}
              <span>Abstract</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 overflow-hidden transition-all data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <p className="text-sm text-gray-700">{abstract}</p>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
