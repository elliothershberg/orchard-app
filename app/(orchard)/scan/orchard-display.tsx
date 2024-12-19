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
    <div className="w-full flex gap-4 h-full">
      <div className="w-1/3 overflow-y-auto space-y-4 p-4">
        {selectedPoints.length === 0 ? (
          <div className="h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
            <p className="max-w-xs text-center">
              Select a point to view a preprint. To select multiple points, hold{" "}
              <kbd className="px-2 py-1 text-sm bg-gray-200 rounded">shift</kbd>{" "}
              to initiate a lasso selection.
            </p>
          </div>
        ) : (
          data
            .slice(0, 10)
            .map((paper) => <ResearchCard key={paper.doi} {...paper} />)
        )}
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
