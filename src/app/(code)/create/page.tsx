import { Box, Typography } from "@mui/material";
import React from "react";
import CreateForm from "./_component/CreateForm";

interface CreatePageProps {}

const CreatePage: React.FC<CreatePageProps> = async () => {
  return (
    <Box flex={1}>
      <CreateForm />
    </Box>
  );
};

export default CreatePage;
