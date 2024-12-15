import { SearchResponse } from "../types/search";
import { ResearchCard } from "@/components/ui/research-card";

export default async function SearchResults({
  searchAction,
  query,
}: {
  searchAction: (query: string) => Promise<SearchResponse>;
  query: string;
}) {
  const { results, error } = await searchAction(query);

  if (error) {
    return <p className="text-[#bc2635] text-center">{error}</p>;
  }

  if (!results || results.length === 0) {
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
        {results.map((result, index) => (
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
