"use client";
import { useURLQuery } from "@/hooks/useURLQuery";
import {
  DEFAULT_SEARCH_OPTIONS,
  SearchOptions,
} from "@/lib/types/SearchOptions";
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
import { useState } from "react";

function FilterDialog() {
  const { parsedParams, updateQuery } = useURLQuery();
  const formProps = useForm<SearchOptions>({
    defaultValues: { ...parsedParams },
  });
  const { handleSubmit, reset } = formProps;
  const { closeDialog } = useDialog();
  const [count, setCount] = useState(false); // フォームの更新用ステート(uncontrolled対策)

  const onSubmit = (data: SearchOptions) => {
    updateQuery({ ...DEFAULT_SEARCH_OPTIONS, ...data, page: undefined });
    closeDialog();
  };

  const onReset = () => {
    reset(DEFAULT_SEARCH_OPTIONS);
    setCount((prev) => !prev);
  };

  return (
    <FormProvider {...formProps}>
      <Box
        key={String(count)}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        onReset={onReset}>
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
          <Button type="reset" variant="outlined">
            クリアする
          </Button>
          <Button type="submit" variant="contained">
            絞り込む
          </Button>
        </DialogActions>
      </Box>
    </FormProvider>
  );
}

export default FilterDialog;
