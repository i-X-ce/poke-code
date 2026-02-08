"use client";
import { useDialog } from "../hooks/useDialog";
import { Dialog } from "@mui/material";

const DialogController = () => {
  const { open, content, closeDialog } = useDialog();

  return (
    <Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth>
      {content}
    </Dialog>
  );
};

export default DialogController;
