import { PokeVersionType } from "./PokeVersion";

export type SearchOptions = (
  | {
      page?: number;
      limit?: number;
    }
  | {
      page?: never;
      limit?: never;
    }
) & {
  q?: string;
  tags?: string[];
  versions?: PokeVersionType[];
  sizeMin?: number;
  sizeMax?: number;
  orderBy?: "date" | "title";
  orderDirection?: "asc" | "desc";
  onlyBookmarked?: boolean;
};

export const DEFAULT_SEARCH_OPTIONS: SearchOptions = {
  orderBy: undefined,
  orderDirection: undefined,
  q: undefined,
  tags: undefined,
  versions: undefined,
  sizeMin: undefined,
  sizeMax: undefined,
  onlyBookmarked: undefined,
};
