"use client";

import { useEffect, useState } from "react";
import { OrchardProjection, SearchResult } from "../types/search";
import Scatterplot from "@/components/ui/scatterplot";
import { ResearchCard } from "@/components/ui/research-card";
import { getOrchardRecords } from "../actions/scan";
import { Button } from "@/components/ui/button";

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

  const handleDownload = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "selected_papers.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full flex gap-4 h-full">
      <div className="w-1/3 flex flex-col h-full">
        <div>
          <Button
            onClick={handleDownload}
            disabled={data.length === 0}
            className="w-1/4 bg-[#bc2635] text-white hover:bg-[#bc2635]/90 disabled:bg-gray-200 disabled:text-gray-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500"
          >
            Download preprints
          </Button>
        </div>
        <div className="overflow-y-auto space-y-4 mr-4 mt-4 flex-1">
          {selectedPoints.length === 0 ? (
            <div className="h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
              <p className="max-w-xs text-center">
                Select a point to view a preprint. To select multiple points,
                hold{" "}
                <kbd className="px-2 py-1 text-sm bg-gray-200 rounded">
                  shift
                </kbd>{" "}
                to initiate a lasso selection.
              </p>
            </div>
          ) : (
            data.map((paper) => <ResearchCard key={paper.doi} {...paper} />)
          )}
        </div>
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
