import { PokeVersionType } from "@/lib/model/PokeVersion";
import { GoogleSansCode } from "@/lib/util/fonts";
import ver2css, { str2css } from "@/lib/util/str2css";
import { Box, CardActionArea, Typography } from "@mui/material";
import React from "react";

function VersionTab({
  version,
  selected = false,
  radius,
  onClick,
}: {
  version: PokeVersionType | "N";
  selected?: boolean;
  radius?: { L?: boolean; R?: boolean };
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <Box
      sx={{
        borderTopLeftRadius: (theme) =>
          radius?.L ? theme.shape.borderRadius : 0,
        borderTopRightRadius: (theme) =>
          radius?.R ? theme.shape.borderRadius : 0,
        overflow: "hidden",
      }}>
      <CardActionArea onClick={onClick}>
        <Box
          px={2}
          py={selected ? 1 : 0.5}
          sx={{
            backgroundColor:
              version === "N" ? str2css("gray") : ver2css(version),
            opacity: selected ? 1 : 0.6,
          }}>
          <Typography
            display={"flex"}
            alignItems={"center"}
            fontSize={"large"}
            fontFamily={GoogleSansCode.style.fontFamily}
            color="var(--background)">
            {version.toUpperCase()}
          </Typography>
        </Box>
      </CardActionArea>
    </Box>
  );
}

export default VersionTab;
