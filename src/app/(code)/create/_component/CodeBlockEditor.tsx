"use client";
import { CodeBlock } from "@/lib/types/CodeDataModel";
import { ArrowDownward, ArrowUpward, Delete } from "@mui/icons-material";
import { Box, IconButton, Paper, Stack, TextField } from "@mui/material";
import { memo } from "react";
import { fieldItems } from "../_util/fieldItems";

interface CodeBlockEditorProps {
  block: CodeBlock;
  index: number;
  selectedId: string;
  blockErrors?: any;
  onChangeBlock: (index: number, field: Partial<CodeBlock>) => void;
  onMoveBlock: (fromIndex: number, step: number) => void;
  onRemoveBlock: (index: number) => void;
}

const CodeBlockEditor = memo(function CodeBlockEditor({
  block: { title, address, code },
  index,
  selectedId,
  blockErrors,
  onChangeBlock,
  onMoveBlock,
  onRemoveBlock,
}: CodeBlockEditorProps) {
  return (
    <Stack
      key={`${selectedId}-${index}`}
      position={"relative"}
      gap={2}
      borderRadius={1}>
      <Stack direction={"row"} gap={2}>
        <TextField
          value={address}
          label={fieldItems.block.address.label}
          placeholder={fieldItems.block.address.placeholder}
          error={!!blockErrors?.address}
          helperText={blockErrors?.address?.message}
          slotProps={{ inputLabel: { shrink: true } }}
          size="small"
          autoComplete="off"
          onChange={(e) => onChangeBlock(index, { address: e.target.value })}
        />
        <TextField
          value={title}
          label={fieldItems.block.title.label}
          placeholder={fieldItems.block.title.placeholder}
          error={!!blockErrors?.title}
          helperText={blockErrors?.title?.message}
          slotProps={{ inputLabel: { shrink: true } }}
          size="small"
          autoComplete="off"
          onChange={(e) => onChangeBlock(index, { title: e.target.value })}
        />
      </Stack>
      <Box position={"relative"}>
        <TextField
          value={code}
          label={fieldItems.block.code.label}
          placeholder={fieldItems.block.code.placeholder}
          autoComplete="off"
          error={!!blockErrors?.code}
          helperText={blockErrors?.code?.message}
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
          multiline
          minRows={4}
          onChange={(e) => onChangeBlock(index, { code: e.target.value })}
        />

        <Box position={"absolute"} top={-30} right={10}>
          <Paper elevation={1}>
            <Stack direction={"row"} p={0.5}>
              <IconButton size="small" onClick={() => onMoveBlock(index, -1)}>
                <ArrowUpward />
              </IconButton>
              <IconButton size="small" onClick={() => onMoveBlock(index, 1)}>
                <ArrowDownward />
              </IconButton>
              <IconButton onClick={() => onRemoveBlock(index)} size="small">
                <Delete />
              </IconButton>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Stack>
  );
});

export default CodeBlockEditor;
