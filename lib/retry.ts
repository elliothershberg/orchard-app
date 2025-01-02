export const MAX_RETRIES = 3;
export const INITIAL_DELAY = 1000; // 1 second

export async function executeQueryWithRetry<T>(
  query: Promise<T>,
  retryCount = 0
): Promise<T> {
  try {
    return await query;
  } catch (error) {
    if (retryCount >= MAX_RETRIES) {
      console.error("Max retries reached. Query failed:", error);
      throw new Error(
        "Failed to fetch data after multiple retries. Please try again later."
      );
    }

    const delay = INITIAL_DELAY * Math.pow(2, retryCount);
    console.warn(`Query failed, retrying in ${delay}ms...`, error);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return executeQueryWithRetry(query, retryCount + 1);
  }
}
