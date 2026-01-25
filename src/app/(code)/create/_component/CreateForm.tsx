"use client";
import {
  CodeContent,
  CodeDataInput,
} from "@/lib/model/CodeDataModel";
import {
  Box,
  Chip,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import React from "react";
import {
  Controller,
  FieldErrors,
  UseFormReturn,
} from "react-hook-form";
import CodeContentEditor from "./CodeContentEditor";
import { fieldItems } from "../_util/fieldItems";
import { CREATE_FORM_ID } from "../_consts/formId";

interface CreateFormProps {
  formProps: UseFormReturn<CodeDataInput>;
}

function CreateForm({ formProps }: CreateFormProps) {
  const {
    register,
    formState: { errors },
    control,
  } = formProps;


  return (
    <Stack component={"form"} id={CREATE_FORM_ID} gap={2}>
      <Box sx={{ userSelect: "none" }}>
        <Controller
          control={control}
          name="isPublic"
          render={({ field }) => (
            <FormControlLabel
              label={
                <Chip
                  label={field.value ? "公開中" : "非公開"}
                  color={field.value ? "primary" : "default"}
                />
              }
              control={<Switch {...field} />}
            />
          )}
        />
      </Box>

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

      <TextField
        type="date"
        label={fieldItems.data.date.label}
        slotProps={{ inputLabel: { shrink: true } }}
        {...register("date")}
        error={!!errors.date?.message}
        helperText={errors.date?.message}
        autoComplete="off"
      />
      <TextField
        label={fieldItems.data.tags.label}
        placeholder={fieldItems.data.tags.placeholder}
        slotProps={{ inputLabel: { shrink: true } }}
        error={!!errors.tags?.message}
        helperText={errors.tags?.message}
        {...register("tags")}
        autoComplete="off"
      />
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

      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <CodeContentEditor
            fieldProps={field}
            errors={errors?.content as FieldErrors<CodeContent>[] | undefined}
          />
        )}
      />
    </Stack>
  );
}

export default CreateForm;
