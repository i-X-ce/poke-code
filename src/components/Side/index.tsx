"use client";
import { Box, Button, Stack } from "@mui/material";
import { Add, AutoAwesome, Bookmark, Home } from "@mui/icons-material";
import SideItem from "./SideItem";
import SideItemChild from "./SideItemChild";
import DevelopmentComponent from "../DevelopmentComponent";
import { PATH } from "@/lib/constant/paths";
import Link from "next/link";
import { getHeaders } from "@/service/client/headers";
import { useEffect, useState } from "react";
import { CodeDataHeaderJson } from "@/lib/types/CodeDataModel";
import { useAtomValue } from "jotai";
import { bookmarkBaseAtom } from "@/atoms/base";

function Side() {
  const [newCodeData, setNewCodeData] = useState<CodeDataHeaderJson[]>([]);
  const [bookmarkedCodeData, setBookmarkedCodeData] = useState<
    CodeDataHeaderJson[]
  >([]);
  const bookmarkedIds = useAtomValue(bookmarkBaseAtom);

  useEffect(() => {
    const fetchNewCodeData = async () => {
      const result = await getHeaders({
        page: 0,
        limit: 5,
        orderBy: "date",
        orderDirection: "desc",
      });
      if (!result.ok) return;
      setNewCodeData(result.data?.headers || []);
    };

    fetchNewCodeData();
  }, [bookmarkBaseAtom]);

  useEffect(() => {
    const fetchBookmarkedCodeData = async () => {
      const result = await getHeaders({ onlyBookmarked: true });
      if (!result.ok) return;
      const bookmarkedOrder = bookmarkedIds.reduce(
        (acc, id, index) => {
          acc[id] = index;
          return acc;
        },
        {} as Record<string, number>,
      );
      const sortedHeaders = (result.data?.headers || []).sort((a, b) => {
        return bookmarkedOrder[a.id] - bookmarkedOrder[b.id];
      });
      setBookmarkedCodeData(sortedHeaders);
    };
    fetchBookmarkedCodeData();
  }, [bookmarkedIds]);

  return (
    <Box flexShrink={0} width={300}>
      <Box
        sx={(theme) => ({
          bgcolor: "divider",
          borderRadius: 1,
          border: `1px solid ${theme.palette.divider}`,
          overflow: "clip",
        })}>
        <Stack>
          <SideItem
            title="ホーム"
            href={PATH.HOME}
            leftIcon={<Home color="action" />}
            topLevel
          />
          <SideItem title="新着" leftIcon={<AutoAwesome color="action" />}>
            {newCodeData.map((data) => (
              <SideItemChild key={data.id} data={data} />
            ))}
          </SideItem>
          {bookmarkedCodeData.length > 0 && (
            <SideItem
              title="ブックマーク"
              leftIcon={<Bookmark color="action" />}>
              {bookmarkedCodeData.map((data) => (
                <SideItemChild key={data.id} data={data} />
              ))}
            </SideItem>
          )}
        </Stack>
      </Box>
      <DevelopmentComponent>
        <Button
          LinkComponent={Link}
          href={PATH.CREATE}
          endIcon={<Add />}
          fullWidth
          variant="contained"
          sx={{ marginTop: 2 }}>
          新規作成
        </Button>
      </DevelopmentComponent>
    </Box>
  );
}

export default Side;
