import React from 'react'
import styles from './styles.module.css'
import { CardActionArea, Paper, Stack, Typography } from '@mui/material'
import { AutoAwesome, Home } from '@mui/icons-material'

function SideItem({ title, leftIcon, rightIcon, onClick }: { title: string, rightIcon?: React.ReactNode, leftIcon?: React.ReactNode, onClick?: () => void }) {
    return (
        <Paper elevation={3} className={styles.item}>
            <CardActionArea onClick={onClick} >
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} p={2} color={"action"}>
                    <Stack direction={"row"} alignItems={"center"} gap={2}>
                        {leftIcon}
                        <Typography color='textPrimary'>{title}</Typography>
                    </Stack>
                    {rightIcon}
                </Stack>
            </CardActionArea>
        </Paper>
    )
}

function Side() {
    return (
        <div className={styles.root}>
            <Stack gap={.1}>
                <SideItem title='ホーム' leftIcon={<Home color='action' />} />
                <SideItem title='新着' leftIcon={<AutoAwesome color='action' />} />
                <SideItem title='新着' leftIcon={<AutoAwesome color='action' />} />
            </Stack>
        </div>
    )
}

export default Side