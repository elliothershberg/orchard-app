export interface SearchResult {
  doi: string;
  title: string;
  authors: string;
  author_corresponding: string;
  author_corresponding_institution: string;
  date: string;
  category: string;
  abstract: string;
  published: string;
  topic_depth_1: string;
  topic_depth_2: string;
  topic_depth_3: string;
  x: number;
  y: number;
  id: number;
}

export interface SearchResponse {
  results: SearchResult[];
  error?: string;
}

export interface OrchardProjection {
  x: number;
  y: number;
  id: number;
}

export interface OrchardProjectionResponse {
  results: OrchardProjection[];
  error?: string;
}
