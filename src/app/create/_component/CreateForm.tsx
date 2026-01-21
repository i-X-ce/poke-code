"use client";
import {
  CodeBlock,
  CodeContent,
  CodeData,
  CodeDataSchema,
} from "@/lib/model/CodeDataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import CodeContentEditor from "./CodeContentEditor";
import { INIT_CODE_CONTENT } from "../_util/initValues";
import { fieldItems } from "../_util/fieldItems";

const Date2String = (date: Date): string => date.toISOString().split("T")[0];

function CreateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CodeData, unknown>({
    resolver: zodResolver(CodeDataSchema),
    mode: "onChange",
    defaultValues: {
      date: Date2String(new Date()),
      content: [INIT_CODE_CONTENT()],
    },
  });

  return (
    <Stack
      component={"form"}
      gap={4}
      onSubmit={handleSubmit((data) => console.log(data))}>
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <TextField
          variant="filled"
          fullWidth
          label={fieldItems.data.title.label}
          placeholder={fieldItems.data.title.placeholder}
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("title", { required: "タイトルは必須です" })}
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
            {...register("date", { required: "日時は必須です" })}
            error={!!errors.date?.message}
            helperText={errors.date?.message}
          />
          <TextField
            sx={{ flex: 1 }}
            label={fieldItems.data.tags.label}
            placeholder={fieldItems.data.tags.placeholder}
            slotProps={{ inputLabel: { shrink: true } }}
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
      <Button variant="contained" type="submit">
        作成
      </Button>
    </Stack>
  );
}

export default CreateForm;
