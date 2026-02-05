"use client";
import { useDeleteCode } from "@/hooks/codes/useDeleteCode";
import { useDialog } from "@/hooks/useDialog";
import { CodeData } from "@/lib/types/CodeDataModel";
import isDevelopment from "@/lib/util/isDevelopment";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";

type DeleteDialogProps = {
  id: CodeData["id"];
};

function DeleteDialogContent({ id }: DeleteDialogProps) {
  const { closeDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading: isDeleting, deleteCodeFetcher } = useDeleteCode();

  const handleDelete = async () => {
    const { ok, message } = await deleteCodeFetcher(id);

    if (ok) {
      enqueueSnackbar("コードを削除しました", { variant: "success" });
      window.location.reload();
    } else {
      enqueueSnackbar(message);
    }

    closeDialog();
  };

  if (!isDevelopment) {
    return null;
  }

  return (
    <>
      <DialogTitle>コードの削除</DialogTitle>
      <DialogContent>
        <DialogContentText>{id}</DialogContentText>
        <DialogContentText>
          本当にこのコードを削除してもよろしいですか？
        </DialogContentText>
        <DialogContentText>この操作は元に戻せません。</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="error">
          キャンセル
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          loading={isDeleting}>
          削除する
        </Button>
      </DialogActions>
    </>
  );
}

export default DeleteDialogContent;
