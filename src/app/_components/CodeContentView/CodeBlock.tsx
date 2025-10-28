"use client"
import useCopyClipboard from '@/lib/hooks/useCopyClipboard'
import { CodeBlockModel } from '@/lib/model/CodeDataModel'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import CopyButton from '../CopyButton'

function CodeBlock({ block }: { block: CodeBlockModel }) {
    const { handleCopy, copied } = useCopyClipboard(block.code);

    return (
        <Stack position={"relative"} gap={1}>
            <Box
                borderRadius={1}
                py={.5}
                px={2}
                sx={{
                    // borderEndStartRadius: 0,
                    // borderEndEndRadius: 0,
                    backgroundColor: theme => theme.palette.text.disabled,
                    alignSelf: "start"
                }}
            >
                <Typography color='var(--background)' fontSize={"small"}>
                    {block.title}
                </Typography>
            </Box>
            <Box
                sx={{
                    border: theme => `1px ${theme.palette.divider} solid`,
                    borderRadius: 1,
                    // borderStartStartRadius: 0
                }}
            >
                {block.code}
            </Box>

            {/* コピーボタン */}
            <Box position={"absolute"} top={0} right={0}>
                <CopyButton copied={copied} onClick={handleCopy} />
            </Box>
        </Stack>
    )
}

export default CodeBlock