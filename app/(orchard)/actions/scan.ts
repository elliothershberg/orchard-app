"use server";

import { neon } from "@neondatabase/serverless";
import { SearchResponse, SearchResult } from "../types/search";
import { cache } from "react";

// Create the database connection
const sql = neon(process.env.DATABASE_URL!);

export const getOrchardRecords = cache(
  async (selectedPoints: number[]): Promise<SearchResponse> => {
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
);
