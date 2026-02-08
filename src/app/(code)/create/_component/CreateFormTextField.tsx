import { CodeDataInput } from "@/lib/types/CodeDataModel";
import { TextField, TextFieldProps } from "@mui/material";
import React, { memo } from "react";
import { FieldName, useFormContext } from "react-hook-form";
import { fieldItems } from "../_util/fieldItems";

type CreateFormTextFieldProps = {
  fieldName: FieldName<CodeDataInput>;
} & TextFieldProps;

const CreateFormTextField = memo(
  ({ fieldName, ...props }: CreateFormTextFieldProps) => {
    const {
      register,
      formState: { errors },
    } = useFormContext<CodeDataInput>();

    return (
      <TextField
        {...register(fieldName)}
        variant="outlined"
        fullWidth
        label={fieldItems.data[fieldName].label}
        placeholder={fieldItems.data[fieldName].placeholder}
        slotProps={{ inputLabel: { shrink: true } }}
        autoComplete="off"
        error={!!errors[fieldName]?.message}
        helperText={errors[fieldName]?.message}
        {...props}
      />
    );
  },
);

export default CreateFormTextField;
