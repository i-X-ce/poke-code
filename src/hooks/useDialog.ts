import { modalAtom } from "@/atoms/ui/dialog";
import { useAtom } from "jotai";
import { ReactNode } from "react";

export const useDialog = () => {
  const [content, setContent] = useAtom(modalAtom);

  const openDialog = (modalContent: ReactNode) => {
    setContent(modalContent);
  };

  const closeDialog = () => {
    setContent(null);
  };

  return {
    open: Boolean(content),
    content,
    openDialog,
    closeDialog,
  };
};
