import { PokeVersionType } from "./PokeVersion";

export interface SearchOptions {
  page?: number;
  limit?: number;

  q?: string;
  tags?: string[];
  versions?: PokeVersionType[];
  sizeMin?: number;
  sizeMax?: number;
  orderBy?: "date" | "title";
  orderDirection?: "asc" | "desc";
  onlyBookmarked?: boolean;
}
