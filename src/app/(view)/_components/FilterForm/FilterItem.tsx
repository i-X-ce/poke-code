import { Box, Divider, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

interface FilterItemProps {
  label: string;
  children: ReactNode;
}

function FilterItem({ label, children }: FilterItemProps) {
  return (
    <Stack direction={"row"} gap={2}>
      <Box width={100} flexShrink={0}>
        <Typography>{label}</Typography>
      </Box>
      <Divider orientation="vertical" flexItem />
      {children}
    </Stack>
  );
}

export default FilterItem;
