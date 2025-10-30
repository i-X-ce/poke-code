import { Check, ContentCopy } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

function CopyButton({ copied = false, onClick }: { copied?: boolean, onClick?: () => void }) {
    return (
        <Tooltip title={copied ? "コピーしました" : "コピー"}>
            <IconButton
                color={copied ? "success" : "default"}
                onClick={() => { onClick?.() }}
            >
                {
                    copied ? <Check fontSize='small' /> : <ContentCopy fontSize='small' />
                }
            </IconButton>
        </Tooltip>
    )
}

export default CopyButton