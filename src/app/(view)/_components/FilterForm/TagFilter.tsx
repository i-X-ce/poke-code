import { SearchOptions } from "@/lib/types/SearchOptions";
import { useController, useFormContext } from "react-hook-form";
import FilterItem from "./FilterItem";
import { Box, Chip, CircularProgress, Stack } from "@mui/material";
import { useLoading } from "@/hooks/useLoading";
import { useEffect, useState } from "react";
import { getTagList } from "@/service/client/headers";
import { useSnackbar } from "notistack";

function TagFilter() {
  const { control } = useFormContext<SearchOptions>();
  const { isLoading, startLoading } = useLoading();
  const [allTags, setAllTags] = useState<SearchOptions["tags"]>([]);
  const {
    field: { value, onChange },
  } = useController({ control, name: "tags" });
  const { enqueueSnackbar } = useSnackbar();

  // 全てのタグを取得する
  useEffect(() => {
    const fetchTags = async () => {
      const { ok, data, message } = await getTagList();
      if (ok) {
        setAllTags(data?.tags || []);
      } else {
        enqueueSnackbar(message, { variant: "error" });
      }
    };
    startLoading(fetchTags);
  }, []);

  const handleToggleTag = (tag: string) => {
    if (value?.includes(tag)) {
      onChange(value.filter((t) => t !== tag));
    } else {
      onChange([...(value || []), tag]);
    }
  };

  return (
    <FilterItem label="タグ">
      {isLoading ? (
        <Box
          flex={1}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}>
          <CircularProgress size={20} />
        </Box>
      ) : (
        <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
          {allTags?.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => handleToggleTag(tag)}
              variant={value?.includes(tag) ? "filled" : "outlined"}
              color={value?.includes(tag) ? "primary" : "default"}
            />
          ))}
        </Stack>
      )}
    </FilterItem>
  );
}

export default TagFilter;
