export interface SearchResult {
  doi: string;
}

export interface SearchResponse {
  results: SearchResult[];
  error?: string;
}
