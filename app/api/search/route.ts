import { neon } from "@neondatabase/serverless";

// Create the database connection
const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  const body = await request.json();
  const { query } = body;

  if (!query?.trim()) {
    return Response.json({ results: [], error: "Query is required" });
  }

  try {
    if (!process.env.NOMIC_API_KEY) {
      throw new Error("NOMIC_API_KEY is not set");
    }

    const response = await fetch("https://api-atlas.nomic.ai/v1/query/topk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NOMIC_API_KEY}`,
      },
      body: JSON.stringify({
        query: query,
        k: 100,
        projection_id: "15180584-caef-4b16-9889-a7458f23e680",
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API Error (Status ${response.status}):`, errorBody);
      throw new Error(
        `API responded with status ${response.status}. Error: ${errorBody}`
      );
    }

    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Unexpected API response structure");
    }

    // Extract DOIs from the Nomic API response
    const dois = data.data.map((item: { doi: string }) => item.doi);

    // Fetch matching records from PostgreSQL
    const dbResults = await sql`
      SELECT *
      FROM public.orchard
      WHERE doi = ANY(${dois});
    `;

    // Reorder dbResults to have the same order of DOIs as in the 'dois' array
    const orderedDbResults = dois.map((doi: string) =>
      dbResults.find((result) => result.doi === doi)
    );

    return Response.json({ results: orderedDbResults });
  } catch (error) {
    console.error("Search error:", error);
    return Response.json(
      {
        results: [],
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred during the search",
      },
      { status: 500 }
    );
  }
}
