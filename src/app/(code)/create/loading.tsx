import { Box, CircularProgress } from "@mui/material";
import React from "react";

function CreatePageLoading() {
  return (
    <Box
      flex={1}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}>
      <CircularProgress />
    </Box>
  );
}

export default CreatePageLoading;
