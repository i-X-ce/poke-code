import React from 'react'
import styles from './styles.module.css'
import { commonStyles } from '@/lib/util/commonStyle'

function CommonFooter() {
    return (
        <footer className={styles.footer} >
            <div className={styles.footerContent} style={{ maxWidth: commonStyles.maxWidth }}>
            </div>
        </footer>
    )
}

export default CommonFooter