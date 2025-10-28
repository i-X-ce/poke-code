"use client"
import useCopyClipboard from '@/lib/hooks/useCopyClipboard';
import { Check, ContentCopy } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React from 'react'
import CopyButton from '../CopyButton';

function CustomMarkdownCodeComponent({ children }: { children: React.ReactNode }) {
    const [contentRef, handleCopy, copied] = useCopyClipboard<HTMLDivElement>();

    return (<Box
        component={"pre"}
        borderRadius={1}
        boxShadow={"inset var(--sh-regular)"}
        p={2}
        position={"relative"}
    >
        <div ref={contentRef}>
            {children}
        </div>
        <Box
            sx={{ position: "absolute", top: 0, right: 0, margin: 1 }}
        >
            <CopyButton copied={copied} onClick={handleCopy} />
        </Box>

    </Box>)
}

export default CustomMarkdownCodeComponent