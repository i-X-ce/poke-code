import { useDialog } from "@/hooks/useDialog";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

type DeleteCheckDialogContentProps = {
  fieldName: string;
  onDelete?: () => void;
};

const DeleteCheckDialogContent = ({
  fieldName,
  onDelete,
}: DeleteCheckDialogContentProps) => {
  const { closeDialog } = useDialog();

  const handleDelete = () => {
    onDelete?.();
    closeDialog();
  };

  return (
    <>
      <DialogTitle>{fieldName}削除の確認</DialogTitle>
      <DialogContent>
        <DialogContentText>
          この{fieldName}を削除します。この操作は元に戻せません。
        </DialogContentText>
        <DialogContentText>よろしいですか？</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="error">
          キャンセル
        </Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          削除する
        </Button>
      </DialogActions>
    </>
  );
};

export default DeleteCheckDialogContent;
