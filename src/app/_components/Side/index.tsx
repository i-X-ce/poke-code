import React from 'react'
import styles from './styles.module.css'
import { Button, Stack } from '@mui/material'
import { Add, AutoAwesome, Favorite, Home } from '@mui/icons-material'
import SideItem from './SideItem'
import { createMockCodeData } from '@/lib/model/CodeDataModel'
import SideItemChild from './SideItemChild'
import DevelopmentComponent from '../DevelopmentComponent'
import { PATH } from '@/lib/constant/paths'

const getCodeData = () => {
    return Array.from({ length: 5 }).map((_, i) => createMockCodeData(i))
}

function Side() {
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <Stack>
                    <SideItem title='ホーム' href={PATH.HOME} leftIcon={<Home color='action' />} />
                    <SideItem title='新着' leftIcon={<AutoAwesome color='action' />} >
                        {getCodeData().map((data) => (
                            <SideItemChild key={data.id} data={data} />
                        ))}
                    </SideItem>
                    <SideItem title='お気に入り' leftIcon={<Favorite color='action' />} >
                        {getCodeData().map((data) => (
                            <SideItemChild key={data.id} data={data} />
                        ))}
                    </SideItem>
                </Stack>
            </div>
            <DevelopmentComponent>
                <Button endIcon={<Add />} fullWidth variant='contained' sx={{ marginTop: 2 }}>
                    新規作成
                </Button>
            </DevelopmentComponent>
        </div>
    )
}

export default Side