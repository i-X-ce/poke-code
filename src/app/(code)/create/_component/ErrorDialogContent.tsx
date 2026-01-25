"use client";
import { useDialog } from "@/app/_hooks/useDialog";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

type ErrorDialogContentProps = {
  errors: string[];
};

const ErrorDialogContent = ({ errors }: ErrorDialogContentProps) => {
  const { closeDialog } = useDialog();
  const errorsCounts = useMemo(
    () =>
      errors.reduce(
        (acc, error) => {
          if (!acc[error]) {
            acc[error] = 0;
          }
          acc[error] += 1;
          return acc;
        },
        {} as Record<string, number>,
      ),
    [errors],
  );
  console.log(errorsCounts);

  return (
    <>
      <DialogTitle>入力エラー</DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom>
          入力内容にエラーがあるため、この操作はできません。以下のエラーを確認してください。
        </DialogContentText>
        <Box component={"ul"}>
          {Object.entries(errorsCounts).map(([message, count], index) => (
            <DialogContentText key={index} color="error" component={"li"}>
              {message}{" "}
              <Typography component={"span"} fontSize={"small"}>
                {count > 1 && `(${count}箇所)`}
              </Typography>
            </DialogContentText>
          ))}
        </Box>
        <DialogActions>
          <Button onClick={closeDialog} variant="outlined" autoFocus>
            閉じる
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};

export default ErrorDialogContent;
