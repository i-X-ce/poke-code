import { CodeDataModel } from "@/lib/model/CodeDataModel"
import { CardActionArea, IconButton, Stack, Typography } from "@mui/material"
import CodeInfo from "../CodeInfo"
import styles from './styles.module.css'
import { Favorite, FavoriteBorder } from "@mui/icons-material"

function SideItemChild({ data }: { data: CodeDataModel }) {
    return (
        <div className={styles.itemChild}>
            <CardActionArea LinkComponent={"a"}>
                <Stack direction={"row"} p={1} alignItems={"center"} justifyContent={"space-between"}>
                    <Stack gap={0.5} className={styles.itemChildInfoContainer}>
                        <Typography color="textPrimary" className={styles.itemChildTitle}>
                            {data.icon} {data.title}
                        </Typography>
                        <CodeInfo data={data} size="small" />
                    </Stack>
                    <IconButton>
                        <FavoriteBorder />
                    </IconButton>
                </Stack>
            </CardActionArea>
        </div>
    )
}

export default SideItemChild