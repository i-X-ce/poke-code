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
import { Delete, MoreVert } from "@mui/icons-material";
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
  TextField,
} from "@mui/material";
import { MouseEventHandler, useState } from "react";
import { ControllerRenderProps, FieldErrors } from "react-hook-form";
import { INIT_CODE_BLOCK, INIT_CODE_CONTENT } from "../_util/initValues";
import { fieldItems } from "../_util/fieldItems";
import { useSnackbar } from "notistack";

const MAX_CONTENT_COUNT = Object.keys(PokeVersions).length;

interface CodeContentEditorProps {
  fieldProps: ControllerRenderProps<CodeDataInput, "content">;
  errors?: FieldErrors<CodeContent>[];
}

function CodeContentEditor({
  fieldProps: { value, onChange },
  errors,
}: CodeContentEditorProps) {
  const [selectedId, setSelectedVersion] = useState(value[0]?.id || "");
  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  const currentContentIndex = value.findIndex((c) => c.id === selectedId);
  const currentContent = value[currentContentIndex];
  const currentBlocks = currentContent?.blocks || [];

  const currentErrors = errors?.[currentContentIndex];
  const isMaxedContent = value.length >= MAX_CONTENT_COUNT;

  const handleChangeId = (id: CodeContent["id"]) => {
    setSelectedVersion(id);
  };

  const updateCurrentContentBlocks = (newBlocks: CodeBlock[]) => {
    const newContent = [...value];
    if (currentContentIndex >= 0) {
      newContent[currentContentIndex] = {
        ...currentContent,
        blocks: newBlocks,
      };
    }
    onChange(newContent);
  };

  const handleAddBlock = () => {
    updateCurrentContentBlocks([...currentBlocks, INIT_CODE_BLOCK]);
  };

  const handleRemoveBlock = (index: number) => {
    updateCurrentContentBlocks(currentBlocks.filter((_, i) => i !== index));
  };

  const handleChangeBlock = (index: number, field: Partial<CodeBlock>) => {
    const newBlocks = currentBlocks.map((b, i) =>
      i === index ? { ...b, ...field } : b,
    );
    updateCurrentContentBlocks(newBlocks);
  };

  const handleChangeVersion = (version: PokeVersionType) => {
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
  };

  const handleAddContent = () => {
    if (isMaxedContent) {
      enqueueSnackbar("これ以上コードコンテンツを追加できません", {
        variant: "error",
      });
      return;
    }

    const newContent = INIT_CODE_CONTENT(false);
    onChange([...value, newContent]);
    setSelectedVersion(newContent.id);
  };

  const handleRemoveContent = (id: CodeContent["id"]) => {
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
  };

  const handleOpenMore: MouseEventHandler = (e) => {
    setMoreAnchorEl(e.currentTarget as HTMLElement);
  };

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
                onChange={(e) =>
                  handleChangeBlock(index, { address: e.target.value })
                }
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
                onChange={(e) =>
                  handleChangeBlock(index, { title: e.target.value })
                }
              />
            </Stack>
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
              onChange={(e) =>
                handleChangeBlock(index, { code: e.target.value })
              }
            />
            <Box position={"absolute"} top={0} right={0} p={2}>
              <IconButton
                color="error"
                onClick={() => handleRemoveBlock(index)}>
                <Delete />
              </IconButton>
            </Box>
          </Stack>
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
}

export default CodeContentEditor;
