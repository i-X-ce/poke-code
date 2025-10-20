import { CodeDataModel } from '@/lib/model/CodeDataModel'
import { PokeVersions } from '@/lib/model/PokeVersion'
import { CalendarMonth, Straighten } from '@mui/icons-material'
import { Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import VersionChip from './VersionChip'
import IconAndText from '@/app/_components/IconAndText'
import CodeInfo from '@/app/_components/CodeInfo'

interface CodeCardProps {
    data: CodeDataModel
}

const CodeCard: React.FC<CodeCardProps> = ({ data }) => {
    // コード長を取得
    const codeLength = Math.max(...data.content.map(c => c.blocks.reduce((acc, b) => acc + (b.code.length / 2), 0)));

    return (
        <Card>
            <CardContent>
                <Typography variant='h6' gutterBottom>
                    <Typography component={"span"} fontSize={"1.8rem"}>{data.icon}</Typography>
                    {data.title}
                </Typography>
                <Stack gap={1}>
                    <CodeInfo data={data} />
                    <Stack direction={"row"} gap={1}>
                        {
                            data.tags.map(tag => (
                                <Chip key={tag} label={tag} variant="outlined" />
                            ))
                        }
                    </Stack>
                    <Typography color="textSecondary">
                        {data.detail}
                    </Typography>
                    <Stack direction={"row"} spacing={1}>
                        {
                            Object.entries(PokeVersions).map(([_, version]) => (
                                <VersionChip key={version} version={version} disable={!data.content.some(c => c.version === version)} />
                            ))
                        }
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default CodeCard
