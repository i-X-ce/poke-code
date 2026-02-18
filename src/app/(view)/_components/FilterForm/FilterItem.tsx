import { Box, Divider, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

interface FilterItemProps {
  label: string;
  children: ReactNode;
}

function FilterItem({ label, children }: FilterItemProps) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} gap={{ xs: 1.5, sm: 2 }}>
      <Box width={100} flexShrink={0} display={{ xs: "none", sm: "block" }}>
        <Typography>{label}</Typography>
      </Box>
      <Divider
        orientation={"vertical"}
        flexItem
        sx={{ display: { xs: "none", sm: "flex" } }}
      />
      <Divider
        orientation={"horizontal"}
        sx={{ display: { sm: "none" } }}
        textAlign="left"
      >
        <Typography color="textSecondary">{label}</Typography>
      </Divider>
      {children}
    </Stack>
  );
}

export default FilterItem;
