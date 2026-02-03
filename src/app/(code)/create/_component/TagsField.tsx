"use client";
import { TextField } from "@mui/material";
import { memo } from "react";
import { UseFormReturn } from "react-hook-form";
import { CodeDataInput } from "@/lib/types/CodeDataModel";
import { fieldItems } from "../_util/fieldItems";

interface TagsFieldProps {
  formProps: UseFormReturn<CodeDataInput>;
}

const TagsField = memo(function TagsField({ formProps }: TagsFieldProps) {
  const {
    register,
    formState: { errors },
  } = formProps;

  return (
    <TextField
      label={fieldItems.data.tags.label}
      placeholder={fieldItems.data.tags.placeholder}
      slotProps={{ inputLabel: { shrink: true } }}
      error={!!errors.tags?.message}
      helperText={errors.tags?.message}
      {...register("tags")}
      autoComplete="off"
    />
  );
});

export default TagsField;
