"use client";

import { SearchResult } from "../types/search";
import Scatterplot from "@/components/ui/scatterplot";
import { ResearchCard } from "@/components/ui/research-card";

export default function OrchardDisplay({ data }: { data: SearchResult[] }) {
  return (
    <div className="w-full flex gap-4 h-[calc(100vh-2rem)]">
      <div className="w-1/3 overflow-y-auto space-y-4 p-4">
        {data.map((paper) => (
          <ResearchCard
            key={paper.doi}
            doi={paper.doi}
            title={paper.title}
            authors={paper.authors}
            author_corresponding={paper.author_corresponding}
            author_corresponding_institution={
              paper.author_corresponding_institution
            }
            date={paper.date}
            category={paper.category}
            abstract={paper.abstract}
            published={paper.published}
            topic_depth_1={paper.topic_depth_1}
            topic_depth_2={paper.topic_depth_2}
            topic_depth_3={paper.topic_depth_3}
          />
        ))}
      </div>
      <div className="w-2/3 h-full">
        <Scatterplot />
      </div>
    </div>
  );
}
