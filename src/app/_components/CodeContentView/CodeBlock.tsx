import { CodeBlockModel } from '@/lib/model/CodeDataModel'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

function CodeBlock({ block }: { block: CodeBlockModel }) {
    return (
        <Stack>
            <Box
                borderRadius={1}
                py={.5}
                px={2}
                sx={{
                    borderEndStartRadius: 0,
                    borderEndEndRadius: 0,
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
                    borderStartStartRadius: 0
                }}
            >
                {block.code}
            </Box>
        </Stack>
    )
}

export default CodeBlock