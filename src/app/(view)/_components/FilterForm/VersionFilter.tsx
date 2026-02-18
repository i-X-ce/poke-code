"use client";
import { useController, useFormContext } from "react-hook-form";
import FilterItem from "./FilterItem";
import { Stack } from "@mui/material";
import { PokeVersions, PokeVersionType } from "@/lib/types/PokeVersion";
import VersionChip from "@/components/VersionChip";
import { SearchOptions } from "@/lib/types/SearchOptions";

function VersionFilter() {
  const { control } = useFormContext<SearchOptions>();
  const {
    field: { value, onChange },
  } = useController({ control, name: "versions" });

  const includeVersion = (version: PokeVersionType) => {
    return Boolean(value?.includes(version));
  };

  const toggleVersion = (version: PokeVersionType) => {
    if (includeVersion(version)) {
      onChange(value?.filter((v) => v !== version));
    } else {
      onChange([...(value || []), version]);
    }
  };

  return (
    <FilterItem label="バージョン">
      <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
        {Object.values(PokeVersions).map((version) => (
          <VersionChip
            key={version}
            version={version}
            disabled={!includeVersion(version)}
            onClick={() => toggleVersion(version)}
          />
        ))}
      </Stack>
    </FilterItem>
  );
}

export default VersionFilter;
