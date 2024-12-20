import SearchContent from "./search-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search - oRchard",
  description: "Search the oRchard",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query || "";

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4 min-h-full">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Search the o<span className="text-[#bc2635]">R</span>chard
      </h1>

      <SearchContent initialQuery={query} />
    </div>
  );
}
