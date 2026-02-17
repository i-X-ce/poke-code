"use client";
import { CodeData } from "@/lib/types/CodeDataModel";
import { Chip, Stack } from "@mui/material";
import DevelopmentComponent from "./DevelopmentComponent";
import { useState } from "react";

const MAX_VISIBLE_TAGS = 3;

interface CodeTagsProps {
  tags?: CodeData["tags"];
  isPublic?: CodeData["isPublic"];
  open?: boolean;
}

function CodeTags({ tags, isPublic, open }: CodeTagsProps) {
  const [openTags, setOpenTags] = useState(open);

  const isOpen = tags && tags.length > MAX_VISIBLE_TAGS && !open && !openTags;

  // const handleOpenTags = () => {
  //   setOpenTags(true);
  // };

  return (
    <Stack direction={"row"} gap={1} flexWrap={"wrap"} minWidth={0}>
      <DevelopmentComponent>
        {isPublic ? (
          <Chip label="公開中" variant="outlined" color="success" />
        ) : (
          <Chip label="非公開" variant="outlined" color="error" />
        )}
      </DevelopmentComponent>
      {tags &&
        tags
          .slice(0, openTags ? tags.length : MAX_VISIBLE_TAGS)
          .map((tag) => <Chip key={tag} label={tag} variant="outlined" />)}
      {isOpen && (
        <Chip
          label={`+${tags.length - MAX_VISIBLE_TAGS}`}
          // onClick={handleOpenTags}
        />
      )}
    </Stack>
  );
}

export default CodeTags;
