import { atom } from "jotai";
import { bookmarkBaseAtom } from "./base";
import { CodeData } from "@/lib/types/CodeDataModel";

export const isBookmarkedAtom = atom((get) => {
  const bookmarkedCodes = get(bookmarkBaseAtom);
  return (id: CodeData["id"]) => bookmarkedCodes.includes(id);
});

export const toggleBookmarkAtom = atom(null, (get, set, id: CodeData["id"]) => {
  const bookmarkedCodes = get(bookmarkBaseAtom);
  if (bookmarkedCodes.includes(id)) {
    const updatedCodes = bookmarkedCodes.filter((codeId) => codeId !== id);
    set(bookmarkBaseAtom, updatedCodes);
  } else {
    set(bookmarkBaseAtom, [...bookmarkedCodes, id]);
  }
});
