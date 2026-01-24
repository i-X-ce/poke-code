import { CodeData } from "@/lib/model/CodeDataModel";
import { PokeVersions } from "@/lib/model/PokeVersion";
import { FavoriteBorder, MoreVert } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import VersionChip from "../../../_components/VersionChip";
import CodeInfo from "@/app/_components/CodeInfo";
import styles from "./styles.module.css";
import DevelopmentComponent from "@/app/_components/DevelopmentComponent";
import { PATH } from "@/lib/constant/paths";
import CodeTags from "@/app/_components/CodeTags";
import Link from "next/link";

interface CodeCardProps {
  data: CodeData;
}

const CodeCard: React.FC<CodeCardProps> = ({ data }) => {
  const versions = useMemo(() => {
    return data.content.map((c) => c.versions).flat();
  }, [data.content]);
  const { title, tags, date, detail, content } = data;

  return (
    <Card sx={{ position: "relative" }}>
      <CardActionArea LinkComponent={Link} href={PATH.DETAIL(data.id)}>
        <CardContent>
          <Typography variant="h6" gutterBottom className={styles.title}>
            {/* <Typography component={"span"} fontSize={"1.8rem"}>{data.icon}</Typography> */}
            {title}
          </Typography>
          <Stack gap={1}>
            <CodeInfo date={date} content={content} />
            <CodeTags tags={tags} />
            <Typography color="textSecondary" className={styles.detail}>
              {detail}
            </Typography>
            <Stack direction={"row"} spacing={1}>
              {Object.entries(PokeVersions).map(([_, version]) => (
                <VersionChip
                  key={version}
                  version={version}
                  disabled={!versions.some((v) => v === version)}
                />
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
      <Stack direction={"row"} position={"absolute"} p={1} top={0} right={0}>
        <IconButton>
          <FavoriteBorder />
        </IconButton>
        <DevelopmentComponent>
          <IconButton>
            <MoreVert />
          </IconButton>
        </DevelopmentComponent>
      </Stack>
    </Card>
  );
};

export default CodeCard;
