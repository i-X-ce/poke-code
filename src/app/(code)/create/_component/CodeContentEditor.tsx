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
import { MouseEventHandler, memo, useCallback, useState } from "react";
import { Control, useController } from "react-hook-form";
import { INIT_CODE_BLOCK, INIT_CODE_CONTENT } from "../_util/initValues";
import { useSnackbar } from "notistack";
import CodeBlockEditor from "./CodeBlockEditor";

const MAX_CONTENT_COUNT = Object.keys(PokeVersions).length;

interface CodeContentEditorProps {
  control: Control<CodeDataInput>;
}

const CodeContentEditor = memo(function CodeContentEditor({
  control,
}: CodeContentEditorProps) {
  const {
    field: { value, onChange },
    formState: { errors },
  } = useController({ control, name: "content" });
  const [selectedId, setSelectedVersion] = useState(value[0]?.id || "");
  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  const currentContentIndex = value.findIndex((c) => c.id === selectedId);
  const currentContent = value[currentContentIndex];
  const currentBlocks = currentContent?.blocks || [];

  const currentErrors = errors?.content?.[currentContentIndex];
  const isMaxedContent = value.length >= MAX_CONTENT_COUNT;

  const handleChangeId = useCallback((id: CodeContent["id"]) => {
    setSelectedVersion(id);
  }, []);

  const updateCurrentContentBlocks = useCallback(
    (newBlocks: CodeBlock[]) => {
      const newContent = [...value];
      const index = value.findIndex((c) => c.id === selectedId);
      if (index >= 0) {
        const current = value[index];
        newContent[index] = {
          ...current,
          blocks: newBlocks,
        };
      }
      onChange(newContent);
    },
    [value, selectedId, onChange],
  );

  const handleAddBlock = useCallback(() => {
    updateCurrentContentBlocks([...currentBlocks, INIT_CODE_BLOCK]);
  }, [currentBlocks, updateCurrentContentBlocks]);

  const handleMoveBlock = useCallback(
    (fromIndex = 0, step: number = 0) => {
      const toIndex = fromIndex + step;
      if (toIndex < 0 || toIndex >= currentBlocks.length) return;

      const newBlocks = [...currentBlocks];
      const [movedBlock] = newBlocks.splice(fromIndex, 1);
      newBlocks.splice(toIndex, 0, movedBlock);
      updateCurrentContentBlocks(newBlocks);
    },
    [currentBlocks, updateCurrentContentBlocks],
  );

  const handleRemoveBlock = useCallback(
    (index: number) => {
      updateCurrentContentBlocks(currentBlocks.filter((_, i) => i !== index));
    },
    [currentBlocks, updateCurrentContentBlocks],
  );

  const handleChangeBlock = useCallback(
    (index: number, field: Partial<CodeBlock>) => {
      const newBlocks = currentBlocks.map((b, i) =>
        i === index ? { ...b, ...field } : b,
      );
      updateCurrentContentBlocks(newBlocks);
    },
    [currentBlocks, updateCurrentContentBlocks],
  );

  const handleChangeVersion = useCallback(
    (version: PokeVersionType) => {
      const currentContentIndex = value.findIndex((c) => c.id === selectedId);
      if (currentContentIndex < 0) return;

      const currentContent = value[currentContentIndex];
      const included = currentContent.versions.includes(version);

      if (included) {
        const newValue = [...value];
        newValue[currentContentIndex] = {
          ...currentContent,
          versions: sortVersions(
            currentContent.versions.filter((v) => v !== version),
          ),
        };
        onChange(newValue);
      } else {
        const newValue = value.map((content, i) => ({
          ...content,
          versions:
            currentContentIndex === i
              ? [...currentContent.versions, version]
              : sortVersions(content.versions.filter((v) => v !== version)),
        }));
        onChange(newValue);
      }
    },
    [value, selectedId, onChange],
  );

  const handleAddContent = useCallback(() => {
    if (isMaxedContent) {
      enqueueSnackbar("これ以上コードコンテンツを追加できません", {
        variant: "error",
      });
      return;
    }

    const newContent = INIT_CODE_CONTENT(false);
    onChange([...value, newContent]);
    setSelectedVersion(newContent.id);
  }, [isMaxedContent, value, onChange, enqueueSnackbar]);

  const handleMoveContent = useCallback(
    (fromIndex: number, step: number) => {
      const toIndex = fromIndex + step;
      if (toIndex < 0 || toIndex >= value.length) return;

      const newContents = [...value];
      const [movedContent] = newContents.splice(fromIndex, 1);
      newContents.splice(toIndex, 0, movedContent);
      onChange(newContents);
    },
    [value, onChange],
  );

  const handleRemoveContent = useCallback(
    (id: CodeContent["id"]) => {
      if (value.length <= 1) {
        enqueueSnackbar("コードコンテンツは最低一つ必要です", {
          variant: "error",
        });
        return;
      }

      const newContents = value.filter((c) => c.id !== id);
      onChange(newContents);
      if (selectedId === id && newContents.length > 0) {
        setSelectedVersion(newContents[0].id);
      }
      handleCloseMore();
    },
    [value, selectedId, onChange, enqueueSnackbar],
  );

  const handleOpenMore: MouseEventHandler = useCallback((e) => {
    setMoreAnchorEl(e.currentTarget as HTMLElement);
  }, []);

  const handleCloseMore = () => {
    setMoreAnchorEl(null);
  };

  return (
    <CodeContentView
      content={value}
      mode="edit"
      selectedId={selectedId}
      onChangeId={handleChangeId}
      onAdd={handleAddContent}
      addDisabled={isMaxedContent}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          {Object.values(PokeVersions).map((v) => (
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
          id={`${currentContent.id}-more-menu`}
          anchorEl={moreAnchorEl}
          open={Boolean(moreAnchorEl)}
          onClose={handleCloseMore}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleMoveContent(currentContentIndex, -1)}>
                <ListItemIcon>
                  <ArrowBack />
                </ListItemIcon>
                <ListItemText primary="前に移動" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleMoveContent(currentContentIndex, 1)}>
                <ListItemIcon>
                  <ArrowForward />
                </ListItemIcon>
                <ListItemText primary="後ろに移動" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleRemoveContent(currentContent.id)}>
                <ListItemIcon>
                  <Delete />
                </ListItemIcon>
                <ListItemText primary="削除する" />
              </ListItemButton>
            </ListItem>
          </List>
        </Popover>
      </Stack>

      {currentBlocks.map(({ title, address, code }, index) => {
        const blockErrors = currentErrors?.blocks?.[index];
        return (
          <CodeBlockEditor
            key={`${selectedId}-${index}`}
            block={{ title, address, code }}
            index={index}
            selectedId={selectedId}
            blockErrors={blockErrors}
            onChangeBlock={handleChangeBlock}
            onMoveBlock={handleMoveBlock}
            onRemoveBlock={handleRemoveBlock}
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
