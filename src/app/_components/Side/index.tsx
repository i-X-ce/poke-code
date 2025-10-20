import React from 'react'
import styles from './styles.module.css'
import { Stack } from '@mui/material'
import { AutoAwesome, Favorite, Home } from '@mui/icons-material'
import SideItem from './SideItem'
import { createMockCodeData } from '@/lib/model/CodeDataModel'
import SideItemChild from './SideItemChild'

const getCodeData = () => {
    return Array.from({ length: 5 }).map((_, i) => createMockCodeData(i))
}

function Side() {
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <Stack>
                    <SideItem title='ホーム' leftIcon={<Home color='action' />} />
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
        </div>
    )
}

export default Side