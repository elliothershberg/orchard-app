"use server";

import { neon } from "@neondatabase/serverless";
import { SearchResponse, SearchResult } from "../types/search";

// Create the database connection
const sql = neon(process.env.DATABASE_URL!);

export async function getOrchardRecords(
  selectedPoints: number[]
): Promise<SearchResponse> {
  console.log("selectedPoints: ", selectedPoints);
  const records = (await sql`
    SELECT *
    FROM public.orchard
    WHERE id = ANY(${selectedPoints})
    ORDER BY id
    LIMIT 100
  `) as SearchResult[];
  return { results: records };
}