"use client";
import { CodeData, createMockCodeData } from "@/lib/model/CodeDataModel";
import { Grid, IconButton, Pagination, Stack, TextField } from "@mui/material";
import CodeCard from "./(view)/_components/CodeCard";
import { useState } from "react";
import { Search, Tune } from "@mui/icons-material";

// 1ページあたりのカード表示数
const MAX_CARD_PER_PAGE = 12;

// モックデータの総数
const MOCK_DATA_LENGTH = MAX_CARD_PER_PAGE * 3 + 1;

function getCodeData(page: number): CodeData[] {
  return Array.from({
    length:
      MAX_CARD_PER_PAGE * (page + 1) > MOCK_DATA_LENGTH
        ? MOCK_DATA_LENGTH % MAX_CARD_PER_PAGE
        : MAX_CARD_PER_PAGE,
  }).map((_, i) => createMockCodeData(page * MAX_CARD_PER_PAGE + i));
}

export default function Home() {
  const [page, setPage] = useState(0);
  const codeData: CodeData[] = getCodeData(page);

  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1);
  };

  return (
    <Stack gap={3}>
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
      <Grid container spacing={2}>
        {codeData.map((data) => (
          <Grid key={data.id} size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <CodeCard data={data} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        page={page + 1}
        count={Math.ceil(MOCK_DATA_LENGTH / MAX_CARD_PER_PAGE)}
        onChange={(_, v) => {
          handlePageChange(v);
        }}
        shape="rounded"
      />
    </Stack>
  );
}
