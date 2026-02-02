"use client";
import { useURLQuery } from "@/hooks/useURLQuery";
import { SearchOptions } from "@/lib/types/SearchOptions";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import VersionFilter from "./VersionFilter";
import TagFilter from "./TagFilter";
import SizeFilter from "./SizeFilter";
import BookmarkedFilter from "./BookmarkedFilter";
import OrderSelector from "./OrderSelector";
import { useDialog } from "@/hooks/useDialog";

function FilterDialog() {
  const { parsedParams, updateQuery } = useURLQuery();
  const { handleSubmit, register, control } = useForm<SearchOptions>({
    defaultValues: {
      ...parsedParams,
    },
  });
  const { closeDialog } = useDialog();

  const onSubmit = (data: SearchOptions) => {
    updateQuery({ ...data, page: 0 });
    closeDialog();
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>検索フィルタ</DialogTitle>
      <DialogContent>
        <Stack gap={3} mt={2}>
          <OrderSelector control={control} />
          <VersionFilter control={control} />
          <TagFilter control={control} />
          <SizeFilter register={register} />
          <BookmarkedFilter control={control} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} >
          閉じる
        </Button>
        <Button type="submit" variant="contained">
          絞り込む
        </Button>
      </DialogActions>
    </Box>
  );
}

export default FilterDialog;
