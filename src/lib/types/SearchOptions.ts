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
