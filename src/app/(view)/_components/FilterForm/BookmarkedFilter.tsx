import { SearchOptions } from "@/lib/types/SearchOptions";
import { Control, useController } from "react-hook-form";
import FilterItem from "./FilterItem";
import {
  FormControlLabel,
  Chip,
  Switch,
  Typography,
  Checkbox,
} from "@mui/material";

interface BookmarkedFilterProps {
  control: Control<SearchOptions>;
}

function BookmarkedFilter({ control }: BookmarkedFilterProps) {
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
