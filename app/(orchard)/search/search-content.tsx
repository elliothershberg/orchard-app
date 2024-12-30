"use client";

import { useState } from "react";
import SearchForm from "./search-form";
import SearchResults from "./search-results";
import { SearchResponse } from "../types/search";
import useSWR from "swr";

const fetcher = async (_: string, query: string) => {
  const response = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

export default function SearchContent() {
  const [query, setQuery] = useState("");

  const { data, error, isLoading } = useSWR<SearchResponse>(
    query ? ["search", query] : null,
    (args) => fetcher(...(args as [string, string]))
  );

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return (
    <>
      <SearchForm
        initialQuery={query}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {query && (
        <SearchResults
          results={error ? { results: [], error: error.message } : data || null}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
