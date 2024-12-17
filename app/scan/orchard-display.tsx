"use client";

import { SearchResult } from "../types/search";
import Scatterplot from "@/components/ui/scatterplot";

export default function OrchardDisplay({ data }: { data: SearchResult[] }) {
  return (
    <div className="w-full flex gap-4">
      <div className="w-1/3">
        {data.map((node) => (
          <div key={node.doi} className="p-4 mb-4 bg-gray-100 rounded shadow">
            <pre>{JSON.stringify(node, null, 2)}</pre>
          </div>
        ))}
      </div>
      <div className="w-2/3">
        <Scatterplot />
      </div>
    </div>
  );
}
