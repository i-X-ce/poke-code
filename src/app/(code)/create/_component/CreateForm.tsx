"use client";
import { CodeDataInput } from "@/lib/types/CodeDataModel";
import { Stack } from "@mui/material";
import React from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import CodeContentEditor from "./CodeContentEditor";
import { CREATE_FORM_ID } from "../_consts/formId";
import IsPublicField from "./IsPublicField";
import CreateFormTextField from "./CreateFormTextField";

interface CreateFormProps {
  formProps: UseFormReturn<CodeDataInput>;
}

function CreateForm({ formProps }: CreateFormProps) {
  return (
    <FormProvider {...formProps}>
      <Stack component={"form"} id={CREATE_FORM_ID} gap={2}>
        <IsPublicField />
        <CreateFormTextField fieldName="title" variant="filled" />
        <CreateFormTextField fieldName="date" />
        <CreateFormTextField fieldName="tags" />
        <CreateFormTextField fieldName="detail" />
        <CreateFormTextField fieldName="description" minRows={10} multiline />
        <CodeContentEditor />
      </Stack>
    </FormProvider>
  );
}

export default CreateForm;
