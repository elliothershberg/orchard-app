import SearchContent from "./search-content";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query || "";

  return (
    <main className="flex min-h-screen flex-col items-center bg-white p-4 text-black">
      <div className="w-full max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Search the oRchard
        </h1>

        <SearchContent initialQuery={query} />
      </div>
    </main>
  );
}
