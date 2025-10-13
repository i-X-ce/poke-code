import React from 'react'
import styles from './styles.module.css'
import { commonStyles } from '@/lib/util/commonStyle'

function CommonSection({ children }: { children: React.ReactNode }) {
    return (
        <section className={styles.section} style={{ maxWidth: commonStyles.maxWidth }}>{children}</section>
    )
}

export default CommonSection