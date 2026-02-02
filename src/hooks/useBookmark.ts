import { isBookmarkedAtom, toggleBookmarkAtom } from "@/atoms/bookmark";
import { CodeData } from "@/lib/types/CodeDataModel";
import { useAtomValue, useSetAtom } from "jotai";

export const useBookmark = (id: CodeData["id"]) => {
  const isBookmarked = useAtomValue(isBookmarkedAtom)(id);
  const _toggleBookmark = useSetAtom(toggleBookmarkAtom);

  const toggleBookmark = () => {
    _toggleBookmark(id);
  };

  return { isBookmarked, toggleBookmark };
};
