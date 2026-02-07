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
import { FormProvider, useForm } from "react-hook-form";
import VersionFilter from "./VersionFilter";
import TagFilter from "./TagFilter";
import SizeFilter from "./SizeFilter";
import BookmarkedFilter from "./BookmarkedFilter";
import OrderSelector from "./OrderSelector";
import { useDialog } from "@/hooks/useDialog";

function FilterDialog() {
  const { parsedParams, updateQuery } = useURLQuery();
  const formProps = useForm<SearchOptions>({
    defaultValues: {
      ...parsedParams,
    },
  });
  const { handleSubmit } = formProps;
  const { closeDialog } = useDialog();

  const onSubmit = (data: SearchOptions) => {
    updateQuery({ ...data, page: 0 });
    closeDialog();
  };

  return (
    <FormProvider {...formProps}>
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>検索フィルタ</DialogTitle>
        <DialogContent>
          <Stack gap={3} mt={2}>
            <OrderSelector />
            <VersionFilter />
            <TagFilter />
            <SizeFilter />
            <BookmarkedFilter />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>閉じる</Button>
          <Button type="submit" variant="contained">
            絞り込む
          </Button>
        </DialogActions>
      </Box>
    </FormProvider>
  );
}

export default FilterDialog;
