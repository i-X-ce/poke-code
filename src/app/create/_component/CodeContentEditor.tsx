import CodeContentView from "@/app/_components/CodeContentView";
import { CodeBlock, CodeContent, CodeData } from "@/lib/model/CodeDataModel";
import { PokeVersions, PokeVersionType } from "@/lib/model/PokeVersion";
import { Delete } from "@mui/icons-material";
import { Box, Chip, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { FieldErrors } from "react-hook-form";

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

const fieldItems: {
  [K in keyof CodeBlock]: {
    label: string;
    placeholder: string;
  };
} = {
  title: {
    label: "タイトル",
    placeholder: "コードブロックのタイトル",
  },
  address: {
    label: "開始アドレス",
    placeholder: "DA00",
  },
  code: {
    label: "コード",
    placeholder:
      "// ここにコードを記述します。\n00 01 02 03 04 05 06 07\n08 09 0A 0B 0C 0D 0E 0F",
  },
};

interface CodeContentEditorProps {
  value: CodeData["content"];
  onChange: (newValue: CodeData["content"]) => void;
  errors?: FieldErrors<CodeContent>[];
}

function CodeContentEditor({
  value,
  onChange,
  errors,
}: CodeContentEditorProps) {
  const [selectedVersion, setSelectedVersion] = useState<PokeVersionType>(
    INIT_SELECTED_VERSION,
  );

  const currentContentIndex = value.findIndex(
    (c) => c.version === selectedVersion,
  );
  const currentContent = value[currentContentIndex];
  const currentBlocks = currentContent?.blocks || [];

  const currentErrors = errors?.[currentContentIndex];

  const handleChangeVersion = (version: PokeVersionType) => {
    setSelectedVersion(version);
  };

  const updateCurrentVersionBlocks = (newBlocks: CodeBlock[]) => {
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
    updateCurrentVersionBlocks([...currentBlocks, INIT_CODE_BLOCK]);
  };

  const handleRemoveBlock = (index: number) => {
    updateCurrentVersionBlocks(currentBlocks.filter((_, i) => i !== index));
  };

  const handleChangeBlock = (index: number, field: Partial<CodeBlock>) => {
    const newBlocks = currentBlocks.map((b, i) =>
      i === index ? { ...b, ...field } : b,
    );
    updateCurrentVersionBlocks(newBlocks);
  };

  return (
    <CodeContentView
      content={value}
      mode="edit"
      selectedVersion={selectedVersion}
      onChangeVersion={handleChangeVersion}>
      {currentBlocks.map(({ title, address, code }, index) => {
        const blockErrors = currentErrors?.blocks?.[index];
        return (
          <Stack
            key={`${selectedVersion}-${index}`}
            position={"relative"}
            gap={2}
            p={2}
            borderRadius={1}
            sx={{
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}>
            <Stack direction={"row"} gap={2}>
              <TextField
                value={title}
                label={fieldItems.title.label}
                placeholder={fieldItems.title.placeholder}
                error={!!blockErrors?.title}
                slotProps={{ inputLabel: { shrink: true } }}
                autoComplete="off"
                onChange={(e) =>
                  handleChangeBlock(index, { title: e.target.value })
                }
              />
              <TextField
                value={address}
                label={fieldItems.address.label}
                placeholder={fieldItems.address.placeholder}
                error={!!blockErrors?.address}
                slotProps={{ inputLabel: { shrink: true } }}
                autoComplete="off"
                onChange={(e) =>
                  handleChangeBlock(index, { address: e.target.value })
                }
              />
            </Stack>
            <TextField
              value={code}
              label={fieldItems.code.label}
              placeholder={fieldItems.code.placeholder}
              autoComplete="off"
              error={!!blockErrors?.code}
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
