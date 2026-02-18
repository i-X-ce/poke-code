import { atom } from "jotai";

export const sideAtom = atom<boolean>(false);

export const openSideAtom = atom(null, (get, set) => {
  set(sideAtom, true);
});

export const closeSideAtom = atom(null, (get, set) => {
  set(sideAtom, false);
});
