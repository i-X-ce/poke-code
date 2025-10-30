"use client"
import { CodeContentModel } from '@/lib/model/CodeDataModel'
import { Stack } from '@mui/material'
import React from 'react'
import VersionTab from './VersionTab'
import CodeBlock from './CodeBlock'
import { PokeVersionType } from '@/lib/model/PokeVersion'

function CodeContentView({ content }: { content: CodeContentModel[] }) {
    const [selectedVersion, setSelectedVersion] = React.useState<PokeVersionType>(content[0].version);

    const handleChangeVersion = (version: PokeVersionType) => {
        setSelectedVersion(version);
    }

    return (
        <Stack marginTop={10}>
            {/* バージョンタグ部 */}
            <Stack direction={"row"} alignItems={"end"}>
                {content.map((c, index) => (
                    <VersionTab
                        key={c.version}
                        version={c.version}
                        radius={{ L: index === 0, R: index === content.length - 1 }}
                        selected={c.version === selectedVersion}
                        onClick={() => handleChangeVersion(c.version)}
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
                {content.find(c => c.version === selectedVersion)?.blocks.map((block, index) =>
                    <CodeBlock key={`${selectedVersion}-${index}`} block={block} />
                )}
            </Stack>
        </Stack>
    )
}

export default CodeContentView