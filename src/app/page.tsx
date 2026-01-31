"use client";
import { CodeDataHeaderJson } from "@/lib/model/CodeDataModel";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import CodeCard from "./(view)/_components/CodeCard";
import { useEffect, useState } from "react";
import { Search, Tune } from "@mui/icons-material";
import { useLoading } from "@/hooks/useLoading";
import { useSnackbar } from "notistack";
import { getHeaders } from "@/service/client/headers";
import { useSearchParams } from "next/navigation";

// 1ページあたりのカード表示数
const MAX_CARD_PER_PAGE = 12;

export default function Home() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(0);
  const [codeData, setCodeData] = useState<CodeDataHeaderJson[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const { isLoading, startLoading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = Object.fromEntries(searchParams.entries());
        const { ok, data } = await getHeaders({
          ...params,
          page,
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
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1);
  };

  return (
    <Stack flex={1} gap={3}>
      <Stack direction={"row"} gap={1} alignItems={"end"}>
        <TextField
          variant="standard"
          label="検索"
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              ),
            },
          }}
        />
        <IconButton>
          <Tune />
        </IconButton>
      </Stack>
      {isLoading ? (
        <Box
          flex={1}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {codeData.map((data) => (
            <Grid key={data.id} size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <CodeCard data={data} />
            </Grid>
          ))}
        </Grid>
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
