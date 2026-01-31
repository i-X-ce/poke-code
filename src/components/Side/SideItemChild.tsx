import { CodeDataHeaderJson } from "@/lib/model/CodeDataModel";
import { CardActionArea, IconButton, Stack, Typography } from "@mui/material";
import CodeInfo from "../CodeInfo";
import styles from "./styles.module.css";
import { FavoriteBorder } from "@mui/icons-material";
import { PATH } from "@/lib/constant/paths";
import Link from "next/link";

function SideItemChild({ data }: { data: CodeDataHeaderJson }) {
  const { date, codeSize } = data;

  return (
    <div className={styles.itemChild}>
      <CardActionArea LinkComponent={Link} href={PATH.DETAIL(data.id)}>
        <Stack
          direction={"row"}
          p={1}
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Stack gap={0.5} className={styles.itemChildInfoContainer}>
            <Typography color="textPrimary" className={styles.itemChildTitle}>
              {data.title}
            </Typography>
            <CodeInfo date={date} codeSize={codeSize} size="small" />
          </Stack>
        </Stack>
      </CardActionArea>
      <div className={styles.itemChildIconWrapper}>
        <IconButton>
          <FavoriteBorder />
        </IconButton>
      </div>
    </div>
  );
}

export default SideItemChild;
