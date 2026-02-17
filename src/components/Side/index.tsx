"use client";
import { Box, Button, Stack, styled, SwipeableDrawer } from "@mui/material";
import { Add, AutoAwesome, Bookmark, Home, Refresh } from "@mui/icons-material";
import SideItem from "./SideItem";
import SideItemChild from "./SideItemChild";
import DevelopmentComponent from "../DevelopmentComponent";
import { PATH } from "@/lib/constant/paths";
import Link from "next/link";
import { getHeaders } from "@/service/client/headers";
import { Suspense, useEffect, useState } from "react";
import { CodeDataHeaderJson } from "@/lib/types/CodeDataModel";
import { useAtomValue } from "jotai";
import { bookmarkBaseAtom } from "@/atoms/base";
import TagList from "./TagList";
import TagListSkeleton from "./TagListSkeleton";
import { useRefresh } from "@/hooks/api/useRefresh";
import { useSnackbar } from "notistack";
import { grey } from "@mui/material/colors";

const drawerBleeding = 40;

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  ...theme.applyStyles("dark", {
    backgroundColor: grey[900],
  }),
}));

function Side() {
  const [newCodeData, setNewCodeData] = useState<CodeDataHeaderJson[]>([]);
  const [bookmarkedCodeData, setBookmarkedCodeData] = useState<
    CodeDataHeaderJson[]
  >([]);
  const bookmarkedIds = useAtomValue(bookmarkBaseAtom);
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading: isRefreshing, refreshFetcher } = useRefresh();
  const [open, setOpen] = useState(false);

  const handleRefresh = async () => {
    try {
      const result = await refreshFetcher();
      if (!result.ok) {
        throw new Error("リフレッシュに失敗しました");
      }
      enqueueSnackbar("リフレッシュが完了しました", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("リフレッシュに失敗しました", { variant: "error" });
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const container =
    window !== undefined ? () => window.document.body : undefined;

  const content = (
    <>
      <Box
        sx={(theme) => ({
          // bgcolor: "divider",
          borderRadius: 1,
          border: `1px solid ${theme.palette.divider}`,
          overflow: "clip",
        })}
      >
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
              leftIcon={<Bookmark color="action" />}
            >
              {bookmarkedCodeData.map((data) => (
                <SideItemChild key={data.id} data={data} />
              ))}
            </SideItem>
          )}
        </Stack>
      </Box>
      <Suspense fallback={<TagListSkeleton />}>
        <TagList />
      </Suspense>

      <DevelopmentComponent>
        <Stack mt={2} gap={2}>
          <Button
            onClick={handleRefresh}
            endIcon={<Refresh />}
            fullWidth
            variant="outlined"
            loading={isRefreshing}
          >
            リフレッシュ
          </Button>
          <Button
            LinkComponent={Link}
            href={PATH.CREATE}
            endIcon={<Add />}
            fullWidth
            variant="contained"
          >
            新規作成
          </Button>
        </Stack>
      </DevelopmentComponent>
    </>
  );

  return (
    <>
      <Box display={{ xs: "none", md: "block" }} flexShrink={0} width={300}>
        {content}
      </Box>

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        keepMounted
        sx={{
          display: { xs: "block", md: "none" },
          position: "relative",
          zIndex: 80,
          "& .MuiDrawer-paper": {
            overflow: "visible",
            maxHeight: "85dvh",
          },
        }}
      >
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: -drawerBleeding,
            width: "100%",
            height: drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
            bgcolor: theme.palette.background.paper,
            ...theme.applyStyles("dark", { backgroundColor: grey[800] }),
          })}
        >
          <Puller />
        </Box>
        <Box
          p={2}
          sx={{
            maxHeight: `calc(85dvh - ${drawerBleeding}px)`,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {content}
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export default Side;
