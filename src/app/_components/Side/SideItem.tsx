"use client"
import { CardActionArea, Collapse, Stack, Typography } from '@mui/material'
import styles from './styles.module.css'
import { KeyboardArrowDown } from '@mui/icons-material'
import { useState } from 'react'

function SideItem({ title, leftIcon, children }: { title: string, leftIcon?: React.ReactNode, children?: React.ReactNode, }) {
    const [open, setOpen] = useState(false);
    const handleToggleOpen = () => {
        setOpen(!open);
    }

    return (
        <>
            <div className={styles.item}>
                <CardActionArea onClick={handleToggleOpen} >
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} p={2} color={"action"}>
                        <Stack direction={"row"} alignItems={"center"} gap={2}>
                            {leftIcon}
                            <Typography color='textPrimary'>{title}</Typography>
                        </Stack>
                        {children ? <KeyboardArrowDown color='action' sx={{ transform: `rotate(${!open ? "0" : "180"}deg)`, transition: ".3s" }} /> : null}
                    </Stack>
                </CardActionArea>
            </div>
            <Collapse in={open}>
                {children}
            </Collapse>
        </>
    )
}

export default SideItem