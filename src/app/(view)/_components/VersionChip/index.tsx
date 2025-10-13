"use client"
import React from 'react'
import styles from './style.module.css'
import { PokeVersionType } from '@/lib/model/PokeVersion'
import ver2css, { str2css } from '@/lib/util/str2css'
import { useTheme } from '@mui/material'

function VersionChip({ version, disable }: { version: PokeVersionType, disable?: boolean }) {
    const theme = useTheme();
    const backgroundColor = disable ? theme.palette.grey["300"] : ver2css(version);
    const borderRadius = theme.shape.borderRadius;
    const color = theme.palette.background.paper;

    return (
        <div className={styles.root} style={{ backgroundColor, borderRadius, color }}>
            {version.toUpperCase()}
        </div>
    )
}

export default VersionChip