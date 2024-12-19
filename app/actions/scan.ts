"use server";

import { neon } from "@neondatabase/serverless";
import { SearchResponse, SearchResult } from "../types/search";

// Create the database connection
const sql = neon(process.env.DATABASE_URL!);

export async function getOrchardRecords(
  selectedPoints: number[]
): Promise<SearchResponse> {
  console.log("selectedPoints: ", selectedPoints);
  // TODO: filter by selected points
  const records = (await sql`
    SELECT *
    FROM public.orchard
    ORDER BY doi
    LIMIT 100
  `) as SearchResult[];
  return { results: records };
}
