import { neon } from "@neondatabase/serverless";
import OrchardDisplay from "./orchard-display";
import { OrchardProjection, OrchardProjectionResponse } from "../types/search";

// Create the database connection
const sql = neon(process.env.DATABASE_URL!);

async function getOrchardProjection(): Promise<OrchardProjectionResponse> {
  const projection = (await sql`
    SELECT x, y
    FROM public.orchard
    ORDER BY doi
    LIMIT 100
  `) as OrchardProjection[]; // Limit to 100 points for development
  return { results: projection };
}

export default async function ScanPage() {
  const projection = await getOrchardProjection();

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-white">
      <div className="w-full">
        <OrchardDisplay projection={projection.results} />
      </div>
    </main>
  );
}
