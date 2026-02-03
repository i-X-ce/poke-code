"use client";
import { TextField } from "@mui/material";
import { memo } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { CodeDataInput } from "@/lib/types/CodeDataModel";
import { fieldItems } from "../_util/fieldItems";

interface DateFieldProps {
  formProps: UseFormReturn<CodeDataInput>;
}

const DateField = memo(function DateField({ formProps }: DateFieldProps) {
  const {
    register,
    formState: { errors },
  } = formProps;

  return (
    <TextField
      type="date"
      label={fieldItems.data.date.label}
      slotProps={{ inputLabel: { shrink: true } }}
      {...register("date")}
      error={!!errors.date?.message}
      helperText={errors.date?.message}
      autoComplete="off"
    />
  );
});

export default DateField;
