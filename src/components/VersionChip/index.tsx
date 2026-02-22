import React from "react";
import { PokeVersionType } from "@/lib/types/PokeVersion";
import ver2css from "@/lib/util/str2css";
import { Box, CardActionArea, useTheme } from "@mui/material";

function VersionChip({
  version,
  disabled: disabled,
  onClick,
}: {
  version: PokeVersionType;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const content = (
    <Box
      borderRadius={1}
      color={(theme) => theme.palette.background.paper}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: { xs: "1.2rem", sm: "1.5rem" },
        aspectRatio: "1 / 1",
        fontSize: { xs: "10.5px", sm: "12px" },
        fontFamily: "var(--font-zen-kaku-gothic-new)",
        backgroundColor: (theme) =>
          disabled ? theme.palette.action.disabledBackground : ver2css(version),
      }}>
      {version.toUpperCase()}
    </Box>
  );

  if (onClick) {
    return (
      <CardActionArea
        onClick={onClick}
        sx={{ borderRadius: 1, width: "fit-content" }}>
        {content}
      </CardActionArea>
    );
  } else {
    return content;
  }
}

export default VersionChip;
