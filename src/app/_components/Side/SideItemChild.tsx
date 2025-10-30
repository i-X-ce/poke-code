import { CodeDataModel } from "@/lib/model/CodeDataModel"
import { Box, CardActionArea, IconButton, Stack, Typography } from "@mui/material"
import CodeInfo from "../CodeInfo"
import styles from './styles.module.css'
import { FavoriteBorder } from "@mui/icons-material"
import { PATH } from "@/lib/constant/paths"
import Link from "next/link"

function SideItemChild({ data }: { data: CodeDataModel }) {
    return (
        <div className={styles.itemChild}>
            <CardActionArea LinkComponent={Link} href={PATH.DETAIL(data.id)}>
                <Stack direction={"row"} p={1} alignItems={"center"} justifyContent={"space-between"}>
                    <Stack gap={0.5} className={styles.itemChildInfoContainer}>
                        <Typography color="textPrimary" className={styles.itemChildTitle}>
                            {data.icon} {data.title}
                        </Typography>
                        <CodeInfo data={data} size="small" />
                    </Stack>
                </Stack>
            </CardActionArea>
            <div className={styles.itemChildIconWrapper}>
                <IconButton>
                    <FavoriteBorder />
                </IconButton>
            </div>
        </div >
    )
}

export default SideItemChild