"use client"
import { ContentCopy } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React from 'react'

function CustomMarkdownCodeComponent({ children }: { children: React.ReactNode }) {
    const contentRef = React.useRef<HTMLDivElement>(null);

    const handleCopy = async () => {
        const textToCopy = contentRef.current?.innerText || "";
        try {
            await navigator.clipboard.writeText(textToCopy);
        } catch (error) {
            console.error("クリップボードへのコピーに失敗しました:", error);
        }
    }

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
        <IconButton
            sx={{ position: "absolute", top: 0, right: 0, margin: 1 }}
            onClick={handleCopy}
        >
            <ContentCopy fontSize='small' />
        </IconButton>
    </Box>)
}

export default CustomMarkdownCodeComponent