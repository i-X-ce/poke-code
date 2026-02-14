"use client";
import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

type DropzoneWrapperProps = {
  children?: ReactNode;
  dropzoneProps: DropzoneOptions;
  dragActiveElement?: ReactNode;
} & BoxProps;

const DropzoneWrapper = ({
  children,
  dropzoneProps,
  dragActiveElement,
  ...props
}: DropzoneWrapperProps) => {
  const { getRootProps, isDragActive } = useDropzone(dropzoneProps);

  return (
    <Box {...props} {...getRootProps()} position={"relative"}>
      <Box
        sx={(theme) => ({
          position: "absolute",
          display: isDragActive ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          inset: 0,
          zIndex: 10,
          border: isDragActive
            ? `3px dotted ${theme.palette.primary.main}`
            : "none",
          backdropFilter: isDragActive ? "blur(5px)" : "none",
          backgroundColor: isDragActive
            ? `alpha(${theme.palette.background.paper}, 0.5)`
            : "transparent",
          borderRadius: 1,
        })}
      >
        {dragActiveElement}
      </Box>
      {children}
    </Box>
  );
};

export default DropzoneWrapper;
