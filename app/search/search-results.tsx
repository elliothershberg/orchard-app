import { SearchResponse, SearchResult } from "../types/search";
import Link from "next/link";

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
      <ul className="space-y-2">
        {results.map((result: SearchResult, index: number) => (
          <li
            key={index}
            className="p-4 border border-gray-200 rounded-lg hover:border-[#bc2635] transition-colors"
          >
            <Link
              href={`https://doi.org/${result.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-[#bc2635] transition-colors"
            >
              {result.doi}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
