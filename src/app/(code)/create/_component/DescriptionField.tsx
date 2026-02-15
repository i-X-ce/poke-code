import { CodeDataInput } from "@/lib/types/CodeDataModel";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import CreateFormTextField from "./CreateFormTextField";
import DropzoneWrapper from "@/components/DropzoneWrapper";
import { Stack, TextField, Typography } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";
import { useImageUpload } from "@/hooks/images/useImage";
import { useSnackbar } from "notistack";
import { INIT_CODE_DATA } from "../_util/initValues";

const DescriptionField = () => {
  const { control, getValues } = useFormContext<CodeDataInput>();
  const {
    field: { value, onChange },
  } = useController({ control, name: "description" });
  const { isLoading, uploadImageFetcher } = useImageUpload();
  const { enqueueSnackbar } = useSnackbar();

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    try {
      const { id } = getValues();

      const imageSrc = acceptedFiles
        .map(async (file) => {
          try {
            const imageUrl = await uploadImageFetcher(
              file,
              id === INIT_CODE_DATA.id ? undefined : id,
            );
            return `![${file.name}](${imageUrl})`;
          } catch (error) {
            return null;
          }
        })
        .filter((url) => url !== null);
      onChange([value, ...(await Promise.all(imageSrc))].join("\n"));
    } catch (error) {
      console.error(error);
      enqueueSnackbar("画像のアップロードに失敗しました", { variant: "error" });
    }
  };

  return (
    <DropzoneWrapper
      dropzoneProps={{ accept: { "image/*": [] }, onDrop }}
      dragActiveElement={
        <Stack gap={1} alignItems={"center"} justifyContent={"center"}>
          <AddPhotoAlternate fontSize="large" color="action" />
          <Typography color="textSecondary">ここに画像をドロップ</Typography>
        </Stack>
      }
    >
      <CreateFormTextField
        fieldName="description"
        minRows={10}
        multiline
        value={value}
        onChange={onChange}
      />
    </DropzoneWrapper>
  );
};

export default DescriptionField;
