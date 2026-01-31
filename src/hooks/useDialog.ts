import { atom, useAtom } from "jotai";
import { ReactNode } from "react";

export const modalAtom = atom<ReactNode | null>(null);

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
