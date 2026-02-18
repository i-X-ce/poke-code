import { CodeDataInput } from "@/lib/types/CodeDataModel";
import { TextFieldProps, TextField } from "@mui/material";
import { memo } from "react";
import { FieldName, useFormContext } from "react-hook-form";
import { fieldItems } from "../../_util/fieldItems";

type CodeBlockTextFieldProps = {
  index: number;
  fieldName: FieldName<CodeDataInput["blocks"][number]>;
} & TextFieldProps;

export const CodeBlockTextField = memo(
  ({ index, fieldName, ...props }: CodeBlockTextFieldProps) => {
    const {
      register,
      formState: { errors },
    } = useFormContext<CodeDataInput>();
    const blockErrors = errors.blocks?.[index];

    return (
      <TextField
        label={fieldItems.block[fieldName].label}
        placeholder={fieldItems.block[fieldName].placeholder}
        error={!!blockErrors?.[fieldName]}
        helperText={blockErrors?.[fieldName]?.message}
        slotProps={{ inputLabel: { shrink: true } }}
        size="small"
        autoComplete="off"
        {...register(`blocks.${index}.${fieldName}`)}
        {...props}
      />
    );
  },
);
