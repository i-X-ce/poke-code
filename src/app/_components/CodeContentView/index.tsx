"use client"
import { CodeContentModel } from '@/lib/model/CodeDataModel'
import { Stack } from '@mui/material'
import React from 'react'
import VersionTab from './VersionTab'
import CodeBlock from './CodeBlock'
import { PokeVersionType } from '@/lib/model/PokeVersion'

export type ModeType = "view" | "edit";

function CodeContentView({
    content,
    selectedVersion,
    mode,
    onChangeVersion,
    children
}: {
    content: CodeContentModel[],
    selectedVersion?: PokeVersionType,
    mode?: ModeType,
    onChangeVersion?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, version: PokeVersionType) => void,
    children?: React.ReactNode
}) {
    const [localSelectedVersion, localSetSelectedVersion] = React.useState<PokeVersionType>(content[0].version);

    const handleChangeVersion = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, version: PokeVersionType) => {
        if (onChangeVersion) onChangeVersion(e, version);
        else localSetSelectedVersion(version);
    }

    // 見た目に使うためのバージョン変数
    // selectedVersionが渡されていればそれを優先、なければローカルステートを使う
    const selectedVersionView = selectedVersion || localSelectedVersion;

    return (
        <Stack position={"relative"} marginTop={10} >
            {/* バージョンタグ部 */}
            <Stack direction={"row"} alignItems={"end"}>
                {content.map((c, index) => (
                    <VersionTab
                        key={c.version}
                        version={c.version}
                        radius={{ L: index === 0, R: index === content.length - 1 }}
                        selected={c.version === selectedVersionView}
                        onClick={c.version === selectedVersionView ? undefined : (e) => handleChangeVersion(e, c.version)}
                    />
                ))}
            </Stack>

            {/* コードブロック部 */}
            <Stack
                borderRadius={1}
                p={2}
                gap={2}
                sx={{
                    borderStartStartRadius: 0,
                    boxShadow: (theme) => theme.shadows[2].split('),').map(s => `inset ${s.trim()}`).join('),'),
                }}
            >
                {mode === "edit" ? children :
                    content.find(c => c.version === selectedVersionView)?.blocks.map((block, index) =>
                        <CodeBlock key={`${selectedVersionView}-${index}`} block={block} />
                    )}
            </Stack>
        </Stack>
    )
}

export default CodeContentView