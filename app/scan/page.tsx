import { neon } from "@neondatabase/serverless";
import OrchardDisplay from "./orchard-display";
import {
  SearchResponse,
  SearchResult,
  OrchardProjection,
  OrchardProjectionResponse,
} from "../types/search";

// Create the database connection
const sql = neon(process.env.DATABASE_URL!);

async function getOrchardProjection(): Promise<OrchardProjectionResponse> {
  const projection = (await sql`
    SELECT x, y
    FROM public.orchard
  `) as OrchardProjection[];
  return { results: projection };
}

async function getOrchardRecords(): Promise<SearchResponse> {
  const records = (await sql`
    SELECT *
    FROM public.orchard
    LIMIT 100
  `) as SearchResult[];
  return { results: records };
}

export default async function ScanPage() {
  const records = await getOrchardRecords();
  const projection = await getOrchardProjection();

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-white">
      <div className="w-full">
        <OrchardDisplay
          data={records.results}
          projection={projection.results}
        />
      </div>
    </main>
  );
}
