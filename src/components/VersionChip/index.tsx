import React from "react";
import styles from "./style.module.css";
import { PokeVersionType } from "@/lib/types/PokeVersion";
import ver2css, { str2css } from "@/lib/util/str2css";
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
      className={styles.root}
      borderRadius={1}
      color={(theme) => theme.palette.background.paper}
      sx={{
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
