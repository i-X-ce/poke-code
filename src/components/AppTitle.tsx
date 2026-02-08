import { Box, Typography } from '@mui/material'
import React from 'react'
import CommonSection from './CommonSection'
import Link from 'next/link'
import { PATH } from '@/lib/constant/paths'

function AppTitle() {
    return (
        <CommonSection>
            <Link href={PATH.HOME} style={{ textDecoration: "none" }}>
                <Typography fontSize={"3rem"} color="textPrimary">Poke Code</Typography>
            </Link>
        </CommonSection>
    )
}

export default AppTitle