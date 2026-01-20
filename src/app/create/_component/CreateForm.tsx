"use client";
import {
  CodeBlock,
  CodeContent,
  CodeData,
  CodeDataSchema,
} from "@/lib/model/CodeDataModel";
import { PokeVersions, PokeVersionType } from "@/lib/model/PokeVersion";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import CodeContentEditor from "./CodeContentEditor";

const CODE_DATA_LABELS: { [K in keyof CodeData]: string } = {
  id: "ID",
  title: "タイトル",
  date: "作成日時",
  tags: "タグ(カンマ区切り)",
  detail: "概要",
  description: "説明(Markdown)",
  content: "コード内容",
} as const;

const CODE_DATA_PLACEHOLDERS: { [K in keyof CodeData]: string } = {
  id: "",
  title: "バイナリエディタ",
  date: "",
  tags: "ツール、便利",
  detail:
    "バイナリエディタを起動するコードです。メモリを自由に書き換えることが可能になります。",
  description: `## 使い方
1. なかよしバッヂを入手する
2. そだてやに「てEん」を預け、すぐに引き出す
3. なかよしバッヂを使用する
    `,
  content: "",
} as const;

const INIT_SELECTED_VERSION = PokeVersions.G1;
const INIT_CODE_BLOCK: CodeBlock = {
  title: "",
  address: "DA00",
  code: "",
} as const;
const INIT_CODE_CONTENT = (version: PokeVersionType): CodeContent =>
  ({
    version,
    blocks: INIT_SELECTED_VERSION === version ? [INIT_CODE_BLOCK] : [],
  }) as const;

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
      content: Object.values(PokeVersions).map((v) => INIT_CODE_CONTENT(v)),
    },
  });

  const [selectedVersion, setSelectedVersion] = React.useState<PokeVersionType>(
    INIT_SELECTED_VERSION,
  );

  return (
    <Stack
      component={"form"}
      gap={4}
      onSubmit={handleSubmit((data) => console.log(data))}>
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <TextField
          variant="filled"
          fullWidth
          label={CODE_DATA_LABELS.title}
          placeholder={CODE_DATA_PLACEHOLDERS.title}
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
            label={CODE_DATA_LABELS.date}
            slotProps={{ inputLabel: { shrink: true } }}
            {...register("date", { required: "日時は必須です" })}
            error={!!errors.date?.message}
            helperText={errors.date?.message}
          />
          <TextField
            sx={{ flex: 1 }}
            label={CODE_DATA_LABELS.tags}
            placeholder={CODE_DATA_PLACEHOLDERS.tags}
            slotProps={{ inputLabel: { shrink: true } }}
            {...register("tags")}
          />
        </Stack>
        <TextField
          multiline
          minRows={3}
          label={CODE_DATA_LABELS.detail}
          placeholder={CODE_DATA_PLACEHOLDERS.detail}
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("detail", { required: "概要は必須です" })}
          error={!!errors.detail?.message}
          helperText={errors.detail?.message}
        />
      </Stack>
      <TextField
        multiline
        minRows={10}
        label={CODE_DATA_LABELS.description}
        placeholder={CODE_DATA_PLACEHOLDERS.description}
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
