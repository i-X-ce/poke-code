"use client";
import { CodeBlock, CodeContent } from "@/lib/types/CodeDataModel";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { Activity, memo, ReactNode, useState } from "react";
import CodeBlockView from "./CodeBlockView";
import { Add } from "@mui/icons-material";
import VersionTabGroup from "./VersionTabGroup";

export type ModeType = "view" | "edit";

interface CodeContentViewProps {
  content?: CodeContent[];
  blocks?: CodeBlock[];
  selectedId?: CodeContent["id"];
  mode?: ModeType;
  onChangeId?: (id: CodeContent["id"]) => void;
  onAdd?: () => void;
  addDisabled?: boolean;
  children?: ReactNode;
}

const CodeContentView = memo(
  ({
    content,
    blocks,
    selectedId,
    mode,
    onChangeId,
    onAdd,
    addDisabled,
    children,
  }: CodeContentViewProps) => {
    const [localSelectedVersion, localSetSelectedVersion] = useState(
      content && content[0].id,
    );

    const handleChangeVersion = (id: CodeContent["id"]) => {
      if (onChangeId) onChangeId(id);
      else localSetSelectedVersion(id);
    };

    // 見た目に使うためのバージョン変数
    // selectedVersionが渡されていればそれを優先、なければローカルステートを使う
    const selectedIdView = selectedId || localSelectedVersion;

    return (
      <Stack position={"relative"} marginTop={10}>
        {/* バージョンタグ部 */}
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} alignItems={"end"} gap={1}>
            {content &&
              content.map(
                ({ id, versions }) =>
                  (versions.length > 0 || mode === "edit") && (
                    <VersionTabGroup
                      key={id}
                      versions={versions}
                      selected={id === selectedIdView}
                      onClick={() => handleChangeVersion(id)}
                    />
                  ),
              )}
          </Stack>
          {mode === "edit" && (
            <Tooltip title="コードコンテンツを追加">
              <IconButton onClick={onAdd} disabled={addDisabled}>
                <Add />
              </IconButton>
            </Tooltip>
          )}
        </Stack>

        {/* コードブロック部 */}
        <Stack
          borderRadius={1}
          p={2}
          gap={2}
          sx={(theme) => ({
            minHeight: 200,
            borderStartStartRadius: 0,
            border: `1px solid ${theme.palette.divider}`,
          })}
        >
          {mode === "edit"
            ? children
            : content &&
              blocks
                ?.filter((block) => block.contentId === selectedIdView)
                ?.map((block) => (
                  <CodeBlockView key={block.id} block={block} />
                ))}
        </Stack>
      </Stack>
    );
  },
);

export default CodeContentView;
