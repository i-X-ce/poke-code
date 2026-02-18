"use client";
import { Box, BoxProps, CircularProgress } from "@mui/material";
import { ReactNode } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

type DropzoneWrapperProps = {
  children?: ReactNode;
  dropzoneProps: DropzoneOptions;
  dragActiveElement?: ReactNode;
  loading?: boolean;
} & BoxProps;

const DropzoneWrapper = ({
  children,
  dropzoneProps,
  dragActiveElement,
  loading,
  ...props
}: DropzoneWrapperProps) => {
  const { getRootProps, isDragActive } = useDropzone(dropzoneProps);
  const isFiltering = isDragActive || loading;

  return (
    <Box {...props} {...getRootProps()} position={"relative"}>
      <Box
        sx={(theme) => ({
          position: "absolute",
          display: isFiltering ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          inset: 0,
          zIndex: 10,
          border: isFiltering
            ? `3px dotted ${theme.palette.primary.main}`
            : "none",
          backdropFilter: isFiltering ? "blur(5px)" : "none",
          backgroundColor: isFiltering
            ? `alpha(${theme.palette.background.paper}, 0.5)`
            : "transparent",
          borderRadius: 1,
        })}
      >
        {loading ? <CircularProgress color="primary" /> : dragActiveElement}
      </Box>
      {children}
    </Box>
  );
};

export default DropzoneWrapper;
