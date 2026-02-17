"use client";

import { useLoading } from "@/hooks/useLoading";
import { useURLQuery } from "@/hooks/useURLQuery";
import { getTagList } from "@/service/client/headers";
import { Box, Chip, CircularProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const TagList = () => {
  const { parsedParams, toggleArrayQuery } = useURLQuery();
  const [tags, setTags] = useState<string[]>([]);
  const { isLoading, startLoading } = useLoading();

  // タグを取得する
  useEffect(() => {
    const fetchTags = async () => {
      const res = await getTagList();
      if (!res.ok) return;
      setTags(res.data?.tags || []);
    };
    startLoading(fetchTags);
  }, []);

  const handleSelectTag = (tag: string) => {
    toggleArrayQuery("tags", tag, { page: 0 });
  };

  return (
    <>
      {(isLoading || tags.length > 0) && (
        <Stack direction={"row"} flexWrap={"wrap"} gap={1} mt={2}>
          {isLoading && (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
            >
              <CircularProgress size={16} />
            </Box>
          )}
          {tags.map((tag) => (
            <Chip
              key={tag}
              onClick={() => handleSelectTag(tag)}
              label={tag}
              variant={parsedParams.tags?.includes(tag) ? "filled" : "outlined"}
              color={parsedParams.tags?.includes(tag) ? "primary" : "default"}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export default TagList;
