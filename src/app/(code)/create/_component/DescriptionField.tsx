import { CodeDataInput } from "@/lib/types/CodeDataModel";
import React from "react";
import { useController, useFormContext, UseFormReturn } from "react-hook-form";
import CreateFormTextField from "./CreateFormTextField";
import DropzoneWrapper from "@/components/DropzoneWrapper";
import { Stack, Typography } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";

const DescriptionField = () => {
  const { control } = useFormContext<CodeDataInput>();
  const {
    field: { value, onChange },
  } = useController({ control, name: "description" });

  return (
    <DropzoneWrapper
      dropzoneProps={{ accept: { "image/*": [] } }}
      dragActiveElement={
        <Stack gap={1} alignItems={"center"} justifyContent={"center"}>
          <AddPhotoAlternate fontSize="large" color="action" />
          <Typography color="textSecondary">ここに画像をドロップ</Typography>
        </Stack>
      }
    >
      <CreateFormTextField fieldName="description" minRows={10} multiline />
    </DropzoneWrapper>
  );
};

export default DescriptionField;
