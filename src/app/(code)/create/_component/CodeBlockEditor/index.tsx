"use client";
import { CodeDataInput } from "@/lib/types/CodeDataModel";
import { ArrowDownward, ArrowUpward, Delete } from "@mui/icons-material";
import { Box, IconButton, Paper, Stack } from "@mui/material";
import { memo } from "react";
import { UseFieldArrayMove, UseFieldArrayRemove } from "react-hook-form";
import { useDialog } from "@/hooks/useDialog";
import DeleteCheckDialogContent from "../DeleteCheckDialogContent";
import { CodeBlockTextField } from "./CodeBlockTextField";
import CodeBlockCodeField from "./CodeBlockCodeField";

interface CodeBlockEditorProps {
  index: number;
  fields: CodeDataInput["blocks"];
  move: UseFieldArrayMove;
  remove: UseFieldArrayRemove;
}

const CodeBlockEditor = memo(
  ({ index, fields, move, remove }: CodeBlockEditorProps) => {
    const { openDialog } = useDialog();
    const thisBlock = fields[index];

    const handleMoveUp = () => {
      if (index <= 0) return;
      const prevIndex = fields
        .slice(0, index)
        .findLastIndex((f) => f.contentId === thisBlock.contentId);

      if (prevIndex === -1) return;
      move(index, prevIndex);
    };

    const handleMoveDown = () => {
      if (index >= fields.length - 1) return;
      const nextOffset = fields
        .slice(index + 1)
        .findIndex((f) => f.contentId === thisBlock.contentId);
      if (nextOffset === -1) return;

      const nextIndex = index + 1 + nextOffset;
      move(index, nextIndex);
    };

    const handleRemove = () => {
      const onDelete = () => {
        remove(index);
      };

      openDialog(
        <DeleteCheckDialogContent
          fieldName="コードブロック"
          onDelete={onDelete}
        />,
      );
    };

    return (
      <Stack position={"relative"} gap={2} borderRadius={1}>
        <Stack direction={"row"} gap={2}>
          <CodeBlockTextField fieldName="address" index={index} />
          <CodeBlockTextField fieldName="title" index={index} />
        </Stack>
        <Box position={"relative"}>
          <CodeBlockCodeField index={index} />

          <Box position={"absolute"} top={-30} right={10}>
            <Paper elevation={1}>
              <Stack direction={"row"} p={0.5}>
                <IconButton size="small" onClick={handleMoveUp}>
                  <ArrowUpward />
                </IconButton>
                <IconButton size="small" onClick={handleMoveDown}>
                  <ArrowDownward />
                </IconButton>
                <IconButton onClick={handleRemove} size="small">
                  <Delete />
                </IconButton>
              </Stack>
            </Paper>
          </Box>
        </Box>
      </Stack>
    );
  },
);

export default CodeBlockEditor;
