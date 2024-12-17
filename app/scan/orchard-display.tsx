"use client";

import { SearchResult } from "../types/search";
import CosmographMap from "@/components/ui/cosmograph-map";

export default function OrchardDisplay({ data }: { data: SearchResult[] }) {
  // Sample network data
  const sampleNodes = [
    { id: "1", color: "#ff6b6b" },
    { id: "2", color: "#4ecdc4" },
    { id: "3", color: "#45b7d1" },
    { id: "4", color: "#96ceb4" },
    { id: "5", color: "#ffeead" },
  ];

  const sampleLinks = [
    { source: "1", target: "2" },
    { source: "2", target: "3" },
    { source: "3", target: "4" },
    { source: "4", target: "5" },
    { source: "1", target: "5" },
    { source: "2", target: "4" },
  ];

  return (
    <div className="w-full max-w-4xl">
      {/* Graph visualization */}
      <div
        className="mt-4 bg-white rounded-lg shadow-lg p-4"
        style={{ height: "600px" }}
      >
        <CosmographMap nodes={sampleNodes} links={sampleLinks} />
      </div>

      {/* Original data display */}
      <div className="mt-4">
        {data.map((node) => (
          <div key={node.doi} className="p-4 mb-4 bg-gray-100 rounded shadow">
            <pre>{JSON.stringify(node, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
