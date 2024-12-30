"use client";

import { useState } from "react";
import SearchForm from "./search-form";
import SearchResults from "./search-results";
import { performSearch } from "../actions/search";
import { SearchResponse } from "../types/search";

export default function SearchContent({
  initialQuery = "",
  initialResults = null,
}: {
  initialQuery: string;
  initialResults: SearchResponse | null;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(
    initialResults
  );

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);
    try {
      const results = await performSearch(searchQuery);
      setSearchResults(results);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchForm
        initialQuery={initialQuery}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {query && <SearchResults results={searchResults} isLoading={isLoading} />}
    </>
  );
}
