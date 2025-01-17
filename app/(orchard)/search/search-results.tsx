import { SearchResponse } from "../types/search";
import { ResearchCard } from "@/components/ui/research-card";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 20;

export default function SearchResults({
  results,
  isLoading,
}: {
  results: SearchResponse | null;
  isLoading: boolean;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [results]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    requestAnimationFrame(() => {
      const mainContent = document.querySelector("main");
      if (mainContent) {
        mainContent.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  const handleDownload = () => {
    const jsonString = JSON.stringify(results?.results || [], null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "search_results.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const router = useRouter();

  const handleScan = () => {
    if (!results?.results) return;
    setIsScanning(true);

    // Get unique topic_depth_3 values
    const uniqueTopics = [
      ...new Set(results.results.map((r) => r.topic_depth_3).filter(Boolean)),
    ];

    // Get all IDs
    const ids = results.results.map((r) => r.id).filter(Boolean);

    // Construct URL with parameters
    const params = new URLSearchParams();
    params.set("specific", uniqueTopics.join(","));
    params.set("id", ids.join(","));

    router.push(`/scan?${params.toString()}`);
  };

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

  const totalPages = Math.ceil(results.results.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResults = results.results.slice(startIndex, endIndex);

  return (
    <div className="space-y-4 min-h-full pb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <p className="text-sm text-gray-600 mt-1">
          Showing {startIndex + 1}-{Math.min(endIndex, results.results.length)}{" "}
          of {results.results.length} results
        </p>
        <div className="flex gap-2 mt-2">
          <Button
            onClick={handleDownload}
            disabled={!results?.results?.length}
            className="bg-[#bc2635] text-white hover:bg-[#a61f2d] disabled:bg-gray-300"
          >
            Download Preprints
          </Button>
          <Button
            onClick={handleScan}
            disabled={!results?.results?.length || isScanning}
            className="bg-[#bc2635] text-white hover:bg-[#a61f2d] disabled:bg-gray-300"
          >
            {isScanning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scanning...
              </>
            ) : (
              "Scan Topics"
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {currentResults.map((result, index) => (
          <ResearchCard
            key={`${result.doi}-${index}`}
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

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="flex items-center px-4 bg-white rounded-md border">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
