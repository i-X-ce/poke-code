import { CodeData } from "../model/CodeDataModel";

const STORAGE_KEYS = {
  BOOKMARKED_CODES: "bookmarkedCodes",
};

type BookmarkedStorage = CodeData["id"][];

export const getBookmarkedCodes = (): BookmarkedStorage => {
  const item = localStorage.getItem(STORAGE_KEYS.BOOKMARKED_CODES);
  return item ? item.split(",") : [];
};

export const setBookmarkedCodes = (ids: BookmarkedStorage): void => {
  localStorage.setItem(STORAGE_KEYS.BOOKMARKED_CODES, ids.join(","));
};
