import { useState } from "react";

export const CreateViewModes = {
  EDIT: "edit",
  PREVIEW: "preview",
} as const;

export type CreateViewMode =
  (typeof CreateViewModes)[keyof typeof CreateViewModes];

export const useCreateViewMode = (
  initViewMode: CreateViewMode = CreateViewModes.EDIT,
) => {
  const [viewMode, setMode] = useState<CreateViewMode>(initViewMode);

  const toggleViewMode = () => {
    setMode((prevMode) =>
      prevMode === CreateViewModes.EDIT
        ? CreateViewModes.PREVIEW
        : CreateViewModes.EDIT,
    );
  };

  return { viewMode, toggleViewMode };
};
