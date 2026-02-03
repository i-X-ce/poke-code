"use client";
import { TextField } from "@mui/material";
import { memo } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { CodeDataInput } from "@/lib/types/CodeDataModel";
import { fieldItems } from "../_util/fieldItems";

interface TitleFieldProps {
  formProps: UseFormReturn<CodeDataInput>;
}

const TitleField = memo(function TitleField({ formProps }: TitleFieldProps) {
  const {
    register,
    formState: { errors },
  } = formProps;

  return (
    <TextField
      variant="filled"
      fullWidth
      label={fieldItems.data.title.label}
      placeholder={fieldItems.data.title.placeholder}
      slotProps={{ inputLabel: { shrink: true } }}
      {...register("title")}
      error={!!errors.title?.message}
      helperText={errors.title?.message}
      autoComplete="off"
    />
  );
});

export default TitleField;
