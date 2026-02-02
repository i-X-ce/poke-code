import { atom } from "jotai";
import { ReactNode } from "react";

export const modalAtom = atom<ReactNode | null>(null);