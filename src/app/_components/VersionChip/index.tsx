import React from 'react'
import styles from './style.module.css'
import { PokeVersionType } from '@/lib/model/PokeVersion'
import ver2css, { str2css } from '@/lib/util/str2css'
import { Box, CardActionArea, useTheme } from '@mui/material'

function VersionChip({ version, disable, onClick }: { version: PokeVersionType, disable?: boolean, onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined }) {
    const content = (
        <Box
            className={styles.root}
            borderRadius={1}
            color={theme => theme.palette.background.paper}
            sx={{
                backgroundColor: theme => disable ? theme.palette.action.disabledBackground : ver2css(version),
            }}>
            {version.toUpperCase()}
        </Box>
    )

    if (onClick) {
        return (
            <CardActionArea href='' onClick={onClick}>
                {content}
            </CardActionArea>
        )
    } else {
        return content
    }
}

export default VersionChip