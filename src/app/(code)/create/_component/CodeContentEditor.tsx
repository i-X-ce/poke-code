"use client";
import CodeContentView from "@/components/CodeContentView";
import VersionChip from "@/components/VersionChip";
import {
  CodeBlock,
  CodeContent,
  CodeDataInput,
} from "@/lib/types/CodeDataModel";
import { PokeVersions, PokeVersionType } from "@/lib/types/PokeVersion";
import { sortVersions } from "@/lib/util/versionType";
import { ArrowBack, ArrowForward, Delete, MoreVert } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
} from "@mui/material";
import { MouseEventHandler, memo, useState } from "react";
import { useController, useFieldArray, useFormContext } from "react-hook-form";
import { createInitCodeBlock, INIT_CODE_CONTENT } from "../_util/initValues";
import { useSnackbar } from "notistack";
import CodeBlockEditor from "./CodeBlockEditor";
import { useDialog } from "@/hooks/useDialog";
import DeleteCheckDialogContent from "./DeleteCheckDialogContent";

const MAX_CONTENT_COUNT = Object.keys(PokeVersions).length;

const CodeContentEditor = memo(() => {
  const { control } = useFormContext<CodeDataInput>();
  const {
    field: { value: contentValue, onChange },
  } = useController({ control, name: "content" });

  const {
    append: appendContent,
    move: moveContent,
    remove: removeContent,
  } = useFieldArray({
    control,
    name: "content",
  });
  const {
    append: appendBlock,
    fields: blocksFields,
    move: blocksMove,
    remove: blocksRemove,
  } = useFieldArray({
    control,
    name: "blocks",
  });

  const [selectedId, setSelectedVersion] = useState(
    contentValue?.[0]?.id || "",
  );
  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const { openDialog } = useDialog();

  const currentContentIndex =
    contentValue?.findIndex((c) => c.id === selectedId) || 0;
  const currentContent = contentValue?.[currentContentIndex] || null;

  const isMaxedContent = contentValue?.length >= MAX_CONTENT_COUNT;

  const handleChangeId = (id: CodeContent["id"]) => {
    setSelectedVersion(id);
  };

  const handleAddBlock = () => {
    if (!currentContent) return;
    const newBlock: CodeBlock = createInitCodeBlock(currentContent.id);
    appendBlock(newBlock);
  };

  const handleChangeVersion = (version: PokeVersionType) => {
    const currentContentIndex = contentValue.findIndex(
      (c) => c.id === selectedId,
    );
    if (currentContentIndex < 0) return;

    const currentContent = contentValue[currentContentIndex];
    const included = currentContent.versions.includes(version);

    if (included) {
      const newValue = [...contentValue];
      newValue[currentContentIndex] = {
        ...currentContent,
        versions: sortVersions(
          currentContent.versions.filter((v) => v !== version),
        ),
      };
      onChange(newValue);
    } else {
      const newValue = contentValue.map((content, i) => ({
        ...content,
        versions:
          currentContentIndex === i
            ? [...currentContent.versions, version]
            : sortVersions(content.versions.filter((v) => v !== version)),
      }));
      onChange(newValue);
    }
  };

  const handleAddContent = () => {
    if (isMaxedContent) {
      enqueueSnackbar("これ以上コードコンテンツを追加できません", {
        variant: "error",
      });
      return;
    }

    const newContent = INIT_CODE_CONTENT(false);
    appendContent(newContent);
    setSelectedVersion(newContent.id);
  };

  const handleMoveUpContent = () => {
    if (currentContentIndex <= 0) return;
    moveContent(currentContentIndex, currentContentIndex - 1);
  };

  const handleMoveDownContent = () => {
    if (
      currentContentIndex < 0 ||
      currentContentIndex >= contentValue.length - 1
    )
      return;
    moveContent(currentContentIndex, currentContentIndex + 1);
  };

  const handleRemoveContent = () => {
    const onDelete = () => {
      if (contentValue.length <= 1) {
        enqueueSnackbar("コードコンテンツは最低一つ必要です", {
          variant: "error",
        });
        return;
      }
      removeContent(currentContentIndex);
      setSelectedVersion(
        contentValue[Math.max(0, currentContentIndex - 1)]?.id || "",
      );
      handleCloseMore();
    };

    openDialog(
      <DeleteCheckDialogContent
        fieldName="コードコンテンツ"
        onDelete={onDelete}
      />,
    );
  };

  const handleOpenMore: MouseEventHandler = (e) => {
    setMoreAnchorEl(e.currentTarget as HTMLElement);
  };

  const handleCloseMore = () => {
    setMoreAnchorEl(null);
  };

  return (
    <CodeContentView
      content={contentValue}
      mode="edit"
      selectedId={selectedId}
      onChangeId={handleChangeId}
      onAdd={handleAddContent}
      addDisabled={isMaxedContent}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          {currentContent &&
            Object.values(PokeVersions).map((v) => (
              <VersionChip
                key={v}
                version={v}
                disabled={!currentContent.versions.includes(v)}
                onClick={() => handleChangeVersion(v)}
              />
            ))}
        </Stack>

        <IconButton size="small" onClick={handleOpenMore}>
          <MoreVert />
        </IconButton>

        <Popover
          id={`${currentContent?.id}-more-menu`}
          anchorEl={moreAnchorEl}
          open={Boolean(moreAnchorEl)}
          onClose={handleCloseMore}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleMoveUpContent}>
                <ListItemIcon>
                  <ArrowBack />
                </ListItemIcon>
                <ListItemText primary="前に移動" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleMoveDownContent}>
                <ListItemIcon>
                  <ArrowForward />
                </ListItemIcon>
                <ListItemText primary="後ろに移動" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleRemoveContent}>
                <ListItemIcon>
                  <Delete />
                </ListItemIcon>
                <ListItemText primary="削除する" />
              </ListItemButton>
            </ListItem>
          </List>
        </Popover>
      </Stack>

      {blocksFields.map(({ id, contentId }, index) => {
        if (contentId !== selectedId) return null;
        return (
          <CodeBlockEditor
            key={id}
            index={index}
            move={blocksMove}
            remove={blocksRemove}
            fields={blocksFields}
          />
        );
      })}

      <Box display={"flex"} justifyContent={"center"} bottom={0}>
        <Chip
          label="コードブロックを追加 +"
          variant="outlined"
          clickable
          color="primary"
          sx={{
            px: 2,
            alignSelf: "end",
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
          onClick={handleAddBlock}
        />
      </Box>
    </CodeContentView>
  );
});

export default CodeContentEditor;
