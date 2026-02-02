import { SearchOptions } from "@/lib/types/SearchOptions";
import { UseFormRegister } from "react-hook-form";
import FilterItem from "./FilterItem";
import {
  InputAdornment,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

interface SizeFilterProps {
  register: UseFormRegister<SearchOptions>;
}

function SizeFilter({ register }: SizeFilterProps) {
  const commonTextFieldProps: TextFieldProps = useMemo(
    () => ({
      type: "number",
      size: "small",
      sx: { width: 150 },
      inputProps: { min: 0 },
      slotProps: {
        inputLabel: { shrink: true },
        input: {
          endAdornment: <InputAdornment position="end">byte</InputAdornment>,
        },
      },
    }),
    [],
  );

  return (
    <FilterItem label="サイズ">
      <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
        <TextField
          {...register("sizeMax")}
          {...commonTextFieldProps}
          label="下限"
        />
        <Typography align="center" variant="body1" sx={{ alignSelf: "center" }}>
          ~
        </Typography>
        <TextField
          {...register("sizeMin")}
          {...commonTextFieldProps}
          label="上限"
        />
      </Stack>
    </FilterItem>
  );
}

export default SizeFilter;
