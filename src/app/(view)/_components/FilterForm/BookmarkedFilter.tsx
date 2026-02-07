import { SearchOptions } from "@/lib/types/SearchOptions";
import { useController, useFormContext } from "react-hook-form";
import FilterItem from "./FilterItem";
import { FormControlLabel, Checkbox } from "@mui/material";

function BookmarkedFilter() {
  const { control } = useFormContext<SearchOptions>();
  const { field } = useController({ control, name: "onlyBookmarked" });
  const { value } = field;

  return (
    <FilterItem label="ブックマーク">
      <FormControlLabel
        label="ブックマークのみ表示"
        control={<Checkbox checked={Boolean(value)} {...field} />}
      />
    </FilterItem>
  );
}

export default BookmarkedFilter;
