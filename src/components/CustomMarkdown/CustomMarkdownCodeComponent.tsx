"use client";
import { Box } from "@mui/material";
import { ReactNode, useRef } from "react";
import CopyButton from "../CopyButton";

interface CustomMarkdownCodeComponentProps {
  children: ReactNode;
}

function CustomMarkdownCodeComponent({
  children,
}: CustomMarkdownCodeComponentProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Box
      component={"pre"}
      borderRadius={1}
      boxShadow={"inset var(--sh-regular)"}
      p={2}
      position={"relative"}>
      <Box ref={ref}>{children}</Box>
      <Box sx={{ position: "absolute", top: 0, right: 0, margin: 1 }}>
        <CopyButton copyValue={ref.current ?? ""} />
      </Box>
    </Box>
  );
}

export default CustomMarkdownCodeComponent;
