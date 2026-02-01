"use client";
import { CodeContent } from "@/lib/types/CodeDataModel";
import { IconButton, Stack, Tooltip } from "@mui/material";
import React from "react";
import VersionTab from "./VersionTab";
import CodeBlock from "./CodeBlock";
import { Add } from "@mui/icons-material";
import { sortVersions } from "@/lib/util/versionType";

export type ModeType = "view" | "edit";

interface CodeContentViewProps {
  content?: CodeContent[];
  selectedId?: CodeContent["id"];
  mode?: ModeType;
  onChangeId?: (id: CodeContent["id"]) => void;
  onAdd?: () => void;
  addDisabled?: boolean;
  children?: React.ReactNode;
}

function CodeContentView({
  content,
  selectedId,
  mode,
  onChangeId,
  onAdd,
  addDisabled,
  children,
}: CodeContentViewProps) {
  const [localSelectedVersion, localSetSelectedVersion] = React.useState(
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
            content.map(({ id, versions }) => {
              const isSelected = id === selectedIdView;
              return (
                <Stack direction={"row"} alignItems={"end"} key={id}>
                  {versions.length === 0 ? (
                    <VersionTab
                      version={"N"}
                      radius={{ L: true, R: true }}
                      selected={isSelected}
                      onClick={
                        id === selectedIdView
                          ? undefined
                          : () => handleChangeVersion(id)
                      }
                    />
                  ) : (
                    sortVersions(versions).map((v, index) => (
                      <VersionTab
                        key={v}
                        version={v}
                        radius={{
                          L: index === 0,
                          R: index === versions.length - 1,
                        }}
                        selected={isSelected}
                        onClick={
                          v === selectedIdView
                            ? undefined
                            : () => handleChangeVersion(id)
                        }
                      />
                    ))
                  )}
                </Stack>
              );
            })}
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
        sx={{
          minHeight: 200,
          borderStartStartRadius: 0,
          boxShadow: (theme) =>
            theme.shadows[2]
              .split("),")
              .map((s) => `inset ${s.trim()}`)
              .join("),"),
        }}>
        {mode === "edit"
          ? children
          : content &&
            content
              .find((c) => c.id === selectedIdView)
              ?.blocks.map((block, index) => (
                <CodeBlock key={`${selectedIdView}-${index}`} block={block} />
              ))}
      </Stack>
    </Stack>
  );
}

export default CodeContentView;
