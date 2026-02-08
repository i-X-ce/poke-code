import { CodeDataInput, CodeDataSchema } from "@/lib/types/CodeDataModel";
import { Box } from "@mui/material";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import CodeView from "../../_components/CodeView";

interface CodeViewWrapperProps {
  formProps: UseFormReturn<CodeDataInput>;
}

const CodeViewWrapper = ({ formProps }: CodeViewWrapperProps) => {
  const { getValues } = formProps;

  const parsed = CodeDataSchema.safeParse(getValues());
  if (!parsed.success) {
    return <Box>データに不備があります。</Box>;
  }

  return <CodeView data={parsed.data} />;
};

export default CodeViewWrapper;
