import { PokeVersions, PokeVersionType } from '@/lib/model/PokeVersion'
import ver2css from '@/lib/util/str2css'
import { Box, CardActionArea, Typography } from '@mui/material'
import React from 'react'

function VersionTab({ version, selected = false, radius, onClick }: { version: PokeVersionType, selected?: boolean, radius?: { L?: boolean, R?: boolean }, onClick?: () => void }) {
    radius = selected ? { L: true, R: true } : radius;

    return (
        <Box sx={{
            borderTopLeftRadius: (theme) => radius?.L ? theme.shape.borderRadius : 0,
            borderTopRightRadius: (theme) => radius?.R ? theme.shape.borderRadius : 0,
            overflow: "hidden",
        }}>
            <CardActionArea onClick={onClick}>
                <Box
                    px={2}
                    py={selected ? 1 : .5}
                    sx={{
                        backgroundColor: ver2css(version),
                        opacity: selected ? 1 : 0.5,
                    }}>
                    <Typography
                        fontSize={"large"}
                        fontFamily={"var(--font-google-sans-code)"}
                        color='var(--background)'
                    >
                        {version.toUpperCase()}
                    </Typography>
                </Box>
            </CardActionArea>
        </Box>
    )
}

export default VersionTab