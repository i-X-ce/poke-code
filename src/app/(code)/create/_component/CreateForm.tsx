"use client";
import {
  CodeContent,
  CodeDataInput,
  CodeDataSchema,
} from "@/lib/model/CodeDataModel";
import { Stack, TextField } from "@mui/material";
import React from "react";
import { Controller, FieldErrors, UseFormReturn } from "react-hook-form";
import CodeContentEditor from "./CodeContentEditor";
import { fieldItems } from "../_util/fieldItems";
import { CREATE_FORM_ID } from "../_consts/formId";

interface CreateFormProps {
  formProps: UseFormReturn<CodeDataInput>;
}

function CreateForm({ formProps }: CreateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = formProps;

  return (
    <Stack
      component={"form"}
      id={CREATE_FORM_ID}
      gap={4}
      onSubmit={handleSubmit((data) => console.log(data))}>
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <TextField
          variant="filled"
          fullWidth
          label={fieldItems.data.title.label}
          placeholder={fieldItems.data.title.placeholder}
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("title")}
          error={!!errors.title?.message}
          helperText={errors.title?.message}
        />
      </Stack>
      <Stack gap={2}>
        <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
          <TextField
            fullWidth={false}
            type="date"
            label={fieldItems.data.date.label}
            slotProps={{ inputLabel: { shrink: true } }}
            {...register("date")}
            error={!!errors.date?.message}
            helperText={errors.date?.message}
          />
          <TextField
            sx={{ flex: 1 }}
            label={fieldItems.data.tags.label}
            placeholder={fieldItems.data.tags.placeholder}
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.tags?.message}
            helperText={errors.tags?.message}
            {...register("tags")}
          />
        </Stack>
        <TextField
          multiline
          minRows={3}
          label={fieldItems.data.detail.label}
          placeholder={fieldItems.data.detail.placeholder}
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("detail", { required: "概要は必須です" })}
          error={!!errors.detail?.message}
          helperText={errors.detail?.message}
        />
      </Stack>
      <TextField
        multiline
        minRows={10}
        label={fieldItems.data.description.label}
        placeholder={fieldItems.data.description.placeholder}
        slotProps={{ inputLabel: { shrink: true } }}
        {...register("description", { required: "説明は必須です" })}
        error={!!errors.description?.message}
        helperText={errors.description?.message}
      />

      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <CodeContentEditor
            value={field.value}
            onChange={field.onChange}
            errors={errors?.content as FieldErrors<CodeContent>[] | undefined}
          />
        )}
      />
    </Stack>
  );
}

export default CreateForm;
