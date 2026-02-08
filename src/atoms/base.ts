import { atomWithStorage } from "jotai/utils";

export const bookmarkBaseAtom = atomWithStorage<string[]>(
  "bookmarkedCodes",
  [],
);
