import { Suspense } from "react";
import SearchForm from "./search-form";
import SearchResults from "./search-results";
import { performSearch } from "../actions/search";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query || "";

  return (
    <main className="flex min-h-screen flex-col items-center bg-white p-4 text-black">
      <div className="w-full max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Search the oRchard
        </h1>

        <SearchForm initialQuery={query} />

        <Suspense fallback={<div className="mt-8 text-center">Loading...</div>}>
          {query && (
            <SearchResults searchAction={performSearch} query={query} />
          )}
        </Suspense>
      </div>
    </main>
  );
}
