"use client";
import { useDialog } from "../_hooks/useDialog";
import { Dialog } from "@mui/material";

const DialogController = () => {
  const { open, content, closeDialog } = useDialog();

  return (
    <Dialog open={open} onClose={closeDialog}>
      {content}
    </Dialog>
  );
};

export default DialogController;
