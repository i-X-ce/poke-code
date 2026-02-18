import DropzoneWrapper from "@/components/DropzoneWrapper";
import { CodeBlockTextField } from "./CodeBlockTextField";
import { Stack, Typography } from "@mui/material";
import { Code } from "@mui/icons-material";
import { CodeDataInput } from "@/lib/types/CodeDataModel";
import { useController, useFormContext } from "react-hook-form";
import { formatArrayBufferCode } from "@/lib/util/codeDataFormat";

type CodeBlockCodeFieldProps = {
  index: number;
};

const CodeBlockCodeField = ({ index }: CodeBlockCodeFieldProps) => {
  const { control } = useFormContext<CodeDataInput>();
  const {
    field: { value, onChange },
  } = useController({ control, name: `blocks.${index}.code` });

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    const reader = new FileReader();
    const extension = file.name.split(".").pop()?.toLowerCase();
    reader.onload = () => {
      if (extension === "bin") {
        const arrayBuffer = reader.result as ArrayBuffer;
        const hexString = formatArrayBufferCode(arrayBuffer);
        console.log(arrayBuffer);
        onChange(hexString);
      } else {
        const text = reader.result as string;
        onChange(text);
      }
    };

    if (extension === "bin") {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  };

  return (
    <DropzoneWrapper
      dropzoneProps={{
        onDrop,
        accept: { "text/*": [], "application/octet-stream": [".bin"] },
      }}
      dragActiveElement={
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Code fontSize="large" color="action" />
          <Typography color="textSecondary">
            ここにコードファイルをドロップ
          </Typography>
        </Stack>
      }
    >
      <CodeBlockTextField
        fieldName="code"
        index={index}
        multiline
        minRows={4}
        fullWidth
        value={value}
      />
    </DropzoneWrapper>
  );
};

export default CodeBlockCodeField;
