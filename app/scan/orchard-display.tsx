"use client";

import { SearchResult } from "../types/search";

export default function OrchardDisplay({ data }: { data: SearchResult[] }) {
  return (
    <div className="w-full max-w-4xl">
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
