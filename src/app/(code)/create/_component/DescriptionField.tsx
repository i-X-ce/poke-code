"use client";
import { TextField } from "@mui/material";
import { memo } from "react";
import { UseFormReturn } from "react-hook-form";
import { CodeDataInput } from "@/lib/types/CodeDataModel";
import { fieldItems } from "../_util/fieldItems";

interface DescriptionFieldProps {
  formProps: UseFormReturn<CodeDataInput>;
}

const DescriptionField = memo(function DescriptionField({
  formProps,
}: DescriptionFieldProps) {
  const {
    register,
    formState: { errors },
  } = formProps;

  return (
    <TextField
      multiline
      minRows={10}
      label={fieldItems.data.description.label}
      placeholder={fieldItems.data.description.placeholder}
      slotProps={{ inputLabel: { shrink: true } }}
      {...register("description", { required: "説明は必須です" })}
      error={!!errors.description?.message}
      helperText={errors.description?.message}
      autoComplete="off"
    />
  );
});

export default DescriptionField;
