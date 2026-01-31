"use client";
import { CodeDataHeaderJson } from "@/lib/model/CodeDataModel";
import { PokeVersions } from "@/lib/model/PokeVersion";
import {
  Bookmark,
  BookmarkBorder,
  MoreVert,
} from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import VersionChip from "../../../_components/VersionChip";
import CodeInfo from "@/app/_components/CodeInfo";
import styles from "./styles.module.css";
import DevelopmentComponent from "@/app/_components/DevelopmentComponent";
import { PATH } from "@/lib/constant/paths";
import CodeTags from "@/app/_components/CodeTags";
import Link from "next/link";
import { useBookmark } from "@/app/_hooks/useBookmark";

interface CodeCardProps {
  data: CodeDataHeaderJson;
}

const CodeCard: React.FC<CodeCardProps> = ({ data }) => {
  const { versions } = data;
  const { title, tags, date, detail, codeSize } = data;
  const { isBookmarked, toggleBookmark } = useBookmark(data.id);

  return (
    <Card sx={{ position: "relative" }}>
      <CardActionArea LinkComponent={Link} href={PATH.DETAIL(data.id)}>
        <CardContent>
          <Typography variant="h6" gutterBottom className={styles.title}>
            {/* <Typography component={"span"} fontSize={"1.8rem"}>{data.icon}</Typography> */}
            {title}
          </Typography>
          <Stack gap={1}>
            <CodeInfo date={date} codeSize={codeSize} />
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
        <IconButton
          onClick={toggleBookmark}
          color={isBookmarked ? "primary" : "default"}>
          {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
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
