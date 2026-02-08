"use client";
import { useURLQuery } from "@/hooks/useURLQuery";
import { Search } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

function SearchTextField() {
  const { parsedParams, updateQuery } = useURLQuery();
  const [q, setQ] = useState(parsedParams.q || "");

  const onSubmit: FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    updateQuery({ q, page: 0 });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQ(e.target.value);
  };

  return (
    <Box flex={1} component={"form"} onSubmit={onSubmit}>
      <TextField
        value={q}
        onChange={handleChange}
        onSubmit={onSubmit}
        variant="standard"
        label="検索"
        fullWidth
        autoComplete="off"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="submit" onSubmit={onSubmit}>
                <Search />
              </IconButton>
            ),
          },
        }}
      />
    </Box>
  );
}

export default SearchTextField;
