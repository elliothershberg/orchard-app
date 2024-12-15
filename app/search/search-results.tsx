import { SearchResponse } from "../types/search";
import { ResearchCard } from "@/components/ui/research-card";
import { Loader2 } from "lucide-react";

export default function SearchResults({
  results,
  isLoading,
}: {
  results: SearchResponse | null;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-[#bc2635]" />
      </div>
    );
  }

  if (!results) {
    return null;
  }

  if (results.error) {
    return <p className="text-[#bc2635] text-center">{results.error}</p>;
  }

  if (!results.results || results.results.length === 0) {
    return (
      <p className="text-center text-gray-600">
        No results found for your query.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      <div className="space-y-4">
        {results.results.map((result, index) => (
          <ResearchCard
            key={index}
            doi={result.doi}
            title={result.title}
            authors={result.authors}
            author_corresponding={result.author_corresponding}
            author_corresponding_institution={
              result.author_corresponding_institution
            }
            date={result.date}
            category={result.category}
            abstract={result.abstract}
            published={result.published}
            topic_depth_1={result.topic_depth_1}
            topic_depth_2={result.topic_depth_2}
            topic_depth_3={result.topic_depth_3}
          />
        ))}
      </div>
    </div>
  );
}
