import React from "react";
import { commonStyles } from "@/lib/util/commonStyle";
import { Box } from "@mui/material";

function CommonSection({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component={"section"}
      sx={{
        marginY: 0,
        marginX: "auto",
        paddingTop: 20,
        paddingX: 2,
        maxWidth: commonStyles.maxWidth,
      }}
    >
      {children}
    </Box>
  );
}

export default CommonSection;
