"use client";

import { useEffect, useState } from "react";
import { OrchardProjection, SearchResult } from "../types/search";
import Scatterplot from "@/components/ui/scatterplot";
import { ResearchCard } from "@/components/ui/research-card";
import { getOrchardRecords } from "../actions/scan";
export default function OrchardDisplay({
  projection,
}: {
  projection: OrchardProjection[];
}) {
  const [selectedPoints, setSelectedPoints] = useState<number[]>([]);
  const [data, setData] = useState<SearchResult[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const records = await getOrchardRecords(selectedPoints);
      setData(records.results);
    };
    fetchData();
  }, [selectedPoints]);

  return (
    <div className="w-full flex gap-4 h-[calc(100vh-2rem)]">
      <div className="w-1/3 overflow-y-auto space-y-4 p-4">
        {data.slice(0, 10).map((paper) => (
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
        <Scatterplot
          plotData={projection}
          setSelectedPoints={setSelectedPoints}
        />
      </div>
    </div>
  );
}
