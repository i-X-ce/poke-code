import { CodeData } from "@/lib/types/CodeDataModel";
import {
  getBookmarkedCodes,
  setBookmarkedCodes,
} from "@/lib/util/localStorage";
import { useState } from "react";

export const useBookmark = (id: CodeData["id"]) => {
  const [isBookmarked, setIsBookmarked] = useState(
    getBookmarkedCodes().includes(id) || false,
  );

  const toggleBookmark = () => {
    const bookmarkedIds = getBookmarkedCodes();

    if (isBookmarked) {
      const updatedIds = bookmarkedIds.filter(
        (bookmarkedId) => bookmarkedId !== id,
      );
      setBookmarkedCodes(updatedIds);
      setIsBookmarked(false);
    } else {
      bookmarkedIds.push(id);
      setBookmarkedCodes(bookmarkedIds);
      setIsBookmarked(true);
    }
  };

  return { isBookmarked, toggleBookmark };
};
