"use client";
import { CodeDataHeaderJson } from "@/lib/types/CodeDataModel";
import { PokeVersions } from "@/lib/types/PokeVersion";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import VersionChip from "../../../../components/VersionChip";
import CodeInfo from "@/components/CodeInfo";
import styles from "./styles.module.css";
import { PATH } from "@/lib/constant/paths";
import CodeTags from "@/components/CodeTags";
import Link from "next/link";
import MoreButton from "@/app/_components/MoreButton";
import BookmarkButton from "@/app/_components/BookmarkButton";

interface CodeCardProps {
  data: CodeDataHeaderJson;
}

const CodeCard: React.FC<CodeCardProps> = ({ data }) => {
  const { versions } = data;
  const { title, tags, date, detail, codeSize, isPublic } = data;

  return (
    <Card sx={{ position: "relative", height: "100%" }}>
      <CardActionArea
        LinkComponent={Link}
        href={PATH.DETAIL(data.id)}
        sx={{ height: "100%" }}>
        <CardContent sx={{ height: "100%" }}>
          <Stack justifyContent={"space-between"} height={"100%"} gap={1}>
            <Stack gap={1}>
              <Typography variant="h6" className={styles.title}>
                {/* <Typography component={"span"} fontSize={"1.8rem"}>{data.icon}</Typography> */}
                {title}
              </Typography>
              <CodeInfo date={date} codeSize={codeSize} />
              <CodeTags tags={tags} isPublic={isPublic}/>
              <Typography color="textSecondary" className={styles.detail}>
                {detail}
              </Typography>
            </Stack>

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

      <Box position={"absolute"} p={1} top={0} right={0}>
        <MoreButton id={data.id} />
      </Box>

      <Box position={"absolute"} p={1} bottom={0} right={0}>
        <BookmarkButton id={data.id} />
      </Box>
    </Card>
  );
};

export default CodeCard;
