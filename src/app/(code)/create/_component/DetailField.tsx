"use client";
import { TextField } from "@mui/material";
import { memo } from "react";
import { UseFormReturn } from "react-hook-form";
import { CodeDataInput } from "@/lib/types/CodeDataModel";
import { fieldItems } from "../_util/fieldItems";

interface DetailFieldProps {
  formProps: UseFormReturn<CodeDataInput>;
}

const DetailField = memo(function DetailField({ formProps }: DetailFieldProps) {
  const {
    register,
    formState: { errors },
  } = formProps;

  return (
    <TextField
      multiline
      minRows={3}
      label={fieldItems.data.detail.label}
      placeholder={fieldItems.data.detail.placeholder}
      slotProps={{ inputLabel: { shrink: true } }}
      {...register("detail", { required: "概要は必須です" })}
      error={!!errors.detail?.message}
      helperText={errors.detail?.message}
      autoComplete="off"
    />
  );
});

export default DetailField;
