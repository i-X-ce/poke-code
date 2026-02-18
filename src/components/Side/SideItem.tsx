"use client";
import {
  Box,
  CardActionArea,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useState } from "react";
import Link from "next/link";

function SideItem({
  title,
  leftIcon,
  children,
  href,
  topLevel = false,
}: {
  title: string;
  leftIcon?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  topLevel?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const handleToggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        sx={(theme) => ({
          // bgcolor: theme.palette.background.paper,
          borderTop: topLevel ? "none" : `1px solid ${theme.palette.divider}`,
        })}
      >
        <CardActionArea
          LinkComponent={href ? Link : undefined}
          {...(href && { href: href })}
          onClick={handleToggleOpen}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            p={2}
            color={"action"}
          >
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              {leftIcon}
              <Typography color="textPrimary">{title}</Typography>
            </Stack>
            {children ? (
              <KeyboardArrowDown
                color="action"
                sx={{
                  transform: `rotate(${!open ? "0" : "180"}deg)`,
                  transition: ".3s",
                }}
              />
            ) : null}
          </Stack>
        </CardActionArea>
      </Box>
      <Collapse in={open}>{children}</Collapse>
    </>
  );
}

export default SideItem;
