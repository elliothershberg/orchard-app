import { neon } from "@neondatabase/serverless";
import OrchardDisplay from "./orchard-display";
import { OrchardProjection, OrchardProjectionResponse } from "../types/search";
import { Metadata } from "next";
import { cache } from "react";

export const metadata: Metadata = {
  title: "Scan - oRchard",
  description: "Scan the oRchard",
};

// Create the database connection
const sql = neon(process.env.DATABASE_URL!);

const getOrchardProjection = cache(
  async (
    broad: string,
    specific: string
  ): Promise<OrchardProjectionResponse> => {
    // Handle different filter combinations
    if (broad && specific) {
      const broadTopics = broad.split(",");
      const specificTopics = specific.split(",");
      const projection = (await sql`
        SELECT x, y, id
        FROM public.orchard
        WHERE topic_depth_2 = ANY(${broadTopics})
        OR topic_depth_3 = ANY(${specificTopics})
        ORDER BY id
      `) as OrchardProjection[];
      return { results: projection };
    }

    if (broad) {
      const broadTopics = broad.split(",");
      const projection = (await sql`
        SELECT x, y, id
        FROM public.orchard
        WHERE topic_depth_2 = ANY(${broadTopics})
        ORDER BY id
      `) as OrchardProjection[];
      return { results: projection };
    }

    if (specific) {
      const specificTopics = specific.split(",");
      const projection = (await sql`
        SELECT x, y, id
        FROM public.orchard
        WHERE topic_depth_3 = ANY(${specificTopics})
        ORDER BY id
      `) as OrchardProjection[];
      return { results: projection };
    }

    // No filters
    const projection = (await sql`
      SELECT x, y, id
      FROM public.orchard
      ORDER BY id
      LIMIT 100
    `) as OrchardProjection[]; // Limit to 100 results for development
    return { results: projection };
  }
);

export default async function ScanPage(props: {
  searchParams?: Promise<{
    broad?: string;
    specific?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const broad = searchParams?.broad || "";
  const specific = searchParams?.specific || "";
  console.log("Broad params:", broad);
  console.log("Specific params:", specific);

  const projection = await getOrchardProjection(broad, specific);
  console.log("Number of results:", projection.results.length);

  return (
    <main className="flex flex-col items-center p-8 bg-white h-[calc(100vh-4rem)]">
      <div className="w-full h-full">
        <OrchardDisplay projection={projection.results} />
      </div>
    </main>
  );
}
