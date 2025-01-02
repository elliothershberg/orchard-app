import { neon } from "@neondatabase/serverless";
import OrchardDisplay from "./orchard-display";
import { OrchardProjection, OrchardProjectionResponse } from "../types/search";
import { Metadata } from "next";
import { cache } from "react";
import { headers } from "next/headers";
import { executeQueryWithRetry } from "@/lib/retry";

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
    try {
      // Handle different filter combinations
      if (broad && specific) {
        const broadTopics = broad.split(",");
        const specificTopics = specific.split(",");
        const projection = (await executeQueryWithRetry(sql`
          SELECT x, y, id
          FROM public.orchard
          WHERE topic_depth_2 = ANY(${broadTopics})
          OR topic_depth_3 = ANY(${specificTopics})
          ORDER BY id
        `)) as OrchardProjection[];
        return { results: projection };
      }

      if (broad) {
        const broadTopics = broad.split(",");
        const projection = (await executeQueryWithRetry(sql`
          SELECT x, y, id
          FROM public.orchard
          WHERE topic_depth_2 = ANY(${broadTopics})
          ORDER BY id
        `)) as OrchardProjection[];
        return { results: projection };
      }

      if (specific) {
        const specificTopics = specific.split(",");
        const projection = (await executeQueryWithRetry(sql`
          SELECT x, y, id
          FROM public.orchard
          WHERE topic_depth_3 = ANY(${specificTopics})
          ORDER BY id
        `)) as OrchardProjection[];
        return { results: projection };
      }

      // No filters
      const projection = (await executeQueryWithRetry(sql`
        SELECT x, y, id
        FROM public.orchard
        ORDER BY id
      `)) as OrchardProjection[];
      return { results: projection };
    } catch (error) {
      console.error("Error fetching orchard projection:", error);
      return {
        results: [],
        error: "Failed to fetch data. Please try again later.",
      };
    }
  }
);

export default async function ScanPage(props: {
  searchParams?: Promise<{
    broad?: string;
    specific?: string;
  }>;
}) {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white h-[calc(100vh-4rem)]">
        <div className="text-center text-lg">
          The Scan page is currently not optimized for mobile use.
        </div>
      </div>
    );
  }

  const searchParams = await props.searchParams;
  const broad = searchParams?.broad || "";
  const specific = searchParams?.specific || "";

  const projection = await getOrchardProjection(broad, specific);
  console.log("Number of results:", projection.results.length);

  return (
    <div className="flex flex-col items-center p-8 bg-white h-[calc(100vh-4rem)]">
      <div className="w-full h-full">
        <OrchardDisplay projection={projection.results} />
      </div>
    </div>
  );
}
