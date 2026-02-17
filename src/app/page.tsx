"use client";
import { CodeDataHeaderJson } from "@/lib/types/CodeDataModel";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import CodeCard from "./(view)/_components/CodeCard";
import { useEffect, useState } from "react";
import { SearchOff, Tune } from "@mui/icons-material";
import { useLoading } from "@/hooks/useLoading";
import { useSnackbar } from "notistack";
import { getHeaders } from "@/service/client/headers";
import { useURLQuery } from "@/hooks/useURLQuery";
import SearchTextField from "./(view)/_components/SearchTextField";
import { useDialog } from "@/hooks/useDialog";
import FilterDialog from "./(view)/_components/FilterForm/FilterDialog";

// 1ページあたりのカード表示数
const MAX_CARD_PER_PAGE = 12;

export default function Home() {
  const [codeData, setCodeData] = useState<CodeDataHeaderJson[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const { isLoading, startLoading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();
  const { parsedParams, searchParams, updateQuery } = useURLQuery();
  const { openDialog } = useDialog();
  const page = parsedParams.page || 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { ok, data } = await getHeaders({
          ...parsedParams,
          limit: MAX_CARD_PER_PAGE,
        });
        if (!ok) throw new Error();

        setCodeData(data?.headers || []);
        setPageCount(Math.ceil((data?.totalCount || 0) / MAX_CARD_PER_PAGE));
      } catch (error) {
        enqueueSnackbar("コードデータの取得に失敗しました", {
          variant: "error",
        });
      }
    };
    startLoading(fetchData);
  }, [searchParams.toString()]);

  const handlePageChange = (newPage: number) => {
    updateQuery({ page: newPage - 1 });
  };

  const handleOpenFilterDialog = () => {
    openDialog(<FilterDialog />);
  };

  const minHeight = "70vh";

  return (
    <Stack flex={1} gap={3}>
      <Stack direction={"row"} gap={1} alignItems={"end"}>
        <SearchTextField />
        <IconButton onClick={handleOpenFilterDialog}>
          <Tune />
        </IconButton>
      </Stack>

      {isLoading ? (
        <Box
          flex={1}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          minHeight={minHeight}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {codeData.length < 1 ? (
            <Stack
              flex={1}
              justifyContent={"center"}
              alignItems={"center"}
              minHeight={minHeight}
              gap={2}
            >
              <SearchOff color="action" fontSize="large" />
              <Typography color="textSecondary">
                コードデータが見つかりませんでした。
              </Typography>
            </Stack>
          ) : (
            <Stack flex={1} minHeight={minHeight}>
              <Grid container spacing={2}>
                {codeData.map((data) => (
                  <Grid key={data.id} size={{ xs: 12, lg: 6 }}>
                    <CodeCard data={data} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          )}
        </>
      )}

      {pageCount > 1 && (
        <Pagination
          page={page + 1}
          count={Math.ceil(pageCount)}
          onChange={(_, v) => {
            handlePageChange(v);
          }}
          shape="rounded"
        />
      )}
    </Stack>
  );
}
