import { SearchOptions } from "@/lib/types/SearchOptions";
import { Control, useController } from "react-hook-form";
import FilterItem from "./FilterItem";
import {
  Autocomplete,
  IconButton,
  IconButtonProps,
  InputLabel,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { useMemo } from "react";
import { North, South } from "@mui/icons-material";

interface OrderSelectorProps {
  control: Control<SearchOptions>;
}

function OrderSelector({ control }: OrderSelectorProps) {
  const {
    field: { value: orderByValue, onChange: onOrderByChange },
  } = useController({ control, name: "orderBy" });
  const {
    field: { value: orderDirectionValue, onChange: onOrderDirectionChange },
  } = useController({ control, name: "orderDirection" });

  const orderOptions: { label: string; value: SearchOptions["orderBy"] }[] =
    useMemo(
      () => [
        { label: "投稿日順", value: "date" },
        { label: "名前順", value: "title" },
      ],
      [],
    );

  const commonIconButtonProps: IconButtonProps = useMemo(
    () => ({
      size: "small",
      sx: { flexShrink: 0 },
    }),
    [],
  );

  const handleOrderByChange = (value?: SearchOptions["orderBy"]) => {
    if (value) {
      onOrderByChange(value);
    }
  };

  const handleOrderDirectionChange = (
    direction: SearchOptions["orderDirection"],
  ) => {
    onOrderDirectionChange(direction);
  };

  const isAsc = orderDirectionValue === "asc";

  return (
    <FilterItem label="並び順">
      <Stack direction={"row"} gap={2} flexWrap={"wrap"} alignItems={"center"}>
        <Autocomplete
          options={orderOptions}
          onChange={(_, value) => handleOrderByChange(value?.value)}
          renderInput={(params) => (
            <TextField
              {...params}
              value={orderByValue}
              onChange={onOrderByChange}
              label="並び順"
              slotProps={{ inputLabel: { shrink: true } }}
            />
          )}
          size="small"
          sx={{ width: 150 }}
        />
        <Stack direction={"row"} flexShrink={0}>
          <Tooltip title="昇順">
            <IconButton
              {...commonIconButtonProps}
              onClick={() => handleOrderDirectionChange("asc")}
              color={isAsc ? "primary" : "default"}>
              <North />
            </IconButton>
          </Tooltip>
          <Tooltip title="降順">
            <IconButton
              {...commonIconButtonProps}
              onClick={() => handleOrderDirectionChange("desc")}
              color={!isAsc ? "primary" : "default"}>
              <South />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </FilterItem>
  );
}

export default OrderSelector;
