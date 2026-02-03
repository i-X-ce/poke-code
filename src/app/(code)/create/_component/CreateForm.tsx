"use client";
import { CodeDataInput } from "@/lib/types/CodeDataModel";
import { Stack } from "@mui/material";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import CodeContentEditor from "./CodeContentEditor";
import { CREATE_FORM_ID } from "../_consts/formId";
import IsPublicField from "./IsPublicField";
import TitleField from "./TitleField";
import DateField from "./DateField";
import TagsField from "./TagsField";
import DetailField from "./DetailField";
import DescriptionField from "./DescriptionField";

interface CreateFormProps {
  formProps: UseFormReturn<CodeDataInput>;
}

function CreateForm({ formProps }: CreateFormProps) {
  return (
    <Stack component={"form"} id={CREATE_FORM_ID} gap={2}>
      <IsPublicField formProps={formProps} />
      <TitleField formProps={formProps} />
      <DateField formProps={formProps} />
      <TagsField formProps={formProps} />
      <DetailField formProps={formProps} />
      <DescriptionField formProps={formProps} />
      <CodeContentEditor control={formProps.control} />
    </Stack>
  );
}

export default CreateForm;
