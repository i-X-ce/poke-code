"use client";
import { useBookmark } from "@/hooks/useBookmark";
import { CodeData } from "@/lib/types/CodeDataModel";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

type BookmarkButtonProps = {
  id: CodeData["id"];
};

function BookmarkButton({ id }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmark(id);

  return (
    <IconButton
      onClick={toggleBookmark}
      color={isBookmarked ? "primary" : "default"}>
      {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
    </IconButton>
  );
}

export default BookmarkButton;
