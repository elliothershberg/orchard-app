import { neon } from "@neondatabase/serverless";
import OrchardDisplay from "./orchard-display";
import { SearchResponse, SearchResult } from "../types/search";

// Create the database connection
const sql = neon(process.env.DATABASE_URL!);

async function getOrchardRecords(): Promise<SearchResponse> {
  const records = (await sql`
    SELECT *
    FROM public.orchard
    LIMIT 10
  `) as SearchResult[];
  return { results: records };
}

export default async function ScanPage() {
  const records = await getOrchardRecords();

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-white">
      <OrchardDisplay data={records.results} />
    </main>
  );
}
