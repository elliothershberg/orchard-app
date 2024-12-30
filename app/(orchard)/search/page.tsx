import SearchContent from "./search-content";
import { Metadata } from "next";
import { performSearch } from "../actions/search";
import { SearchResponse } from "../types/search";

export const metadata: Metadata = {
  title: "Search - oRchard",
  description: "Search the oRchard",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }> | { query?: string };
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.query || "";
  let initialResults: SearchResponse | null = null;

  if (query) {
    initialResults = await performSearch(query);
  }

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4 min-h-full">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Search the o<span className="text-[#bc2635]">R</span>chard
      </h1>

      <SearchContent initialQuery={query} initialResults={initialResults} />
    </div>
  );
}
