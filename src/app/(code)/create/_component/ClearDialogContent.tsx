import { useDialog } from "@/hooks/useDialog";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

type ClearDialogContentProps = {
  onClear: () => void;
};

const ClearDialogContent = ({ onClear }: ClearDialogContentProps) => {
  const { closeDialog } = useDialog();

  return (
    <>
      <DialogTitle>内容をクリア</DialogTitle>
      <DialogContent>
        <DialogContentText>
          内容をクリアしますか？この操作は元に戻せません。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>キャンセル</Button>
        <Button onClick={onClear} variant="contained">
          クリア
        </Button>
      </DialogActions>
    </>
  );
};

export default ClearDialogContent;
