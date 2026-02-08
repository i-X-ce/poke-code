"use client";
import useCopyClipboard from "@/hooks/useCopyClipboard";
import { type CodeBlock as CodeBlockView } from "@/lib/types/CodeDataModel";
import { Box, Chip, Grid, Stack } from "@mui/material";
import React from "react";
import CopyButton from "../CopyButton";
import { GoogleSansCode } from "@/lib/util/fonts";
import CodeGrid from "./CodeGrid";
import { PosType } from "@/lib/types/PosType";

const num2Hex = (num: number, pad: number, fillString: string = "0") => {
  return num.toString(16).toUpperCase().padStart(pad, fillString);
};

function CodeBlockView({ block }: { block: CodeBlockView }) {
  const { handleCopy, copied } = useCopyClipboard(block.code);
  const [mousePos, setMousePos] = React.useState<PosType>({ x: -1, y: -1 });

  const codeLength = Math.floor(block.code.length / 2);
  const startAddress = block.address ? parseInt(block.address, 16) : 0;
  const startRange = block.address ? parseInt(block.address, 16) & 0xfff0 : 0;
  const endRange = (startAddress + codeLength - 1) | 0xf;
  const addressRange = endRange - startRange;

  const handleEnter = (pos: PosType) => {
    setMousePos(pos);
  };

  const handleLeave = () => {
    setMousePos({ x: -1, y: -1 });
  };

  const { title } = block;

  return (
    <Stack position={"relative"} gap={1}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}>
        {title && <Chip label={title} />}
        <Box ml={"auto"}>
          <CopyButton copied={copied} onClick={handleCopy} />
        </Box>
      </Stack>

      <Box
        sx={{
          border: (theme) => `1px ${theme.palette.divider} solid`,
          borderRadius: 1,
          // borderStartStartRadius: 0
          overflow: "hidden",
          cursor: "default",
        }}>
        <Grid
          container
          columns={18}
          fontFamily={GoogleSansCode.style.fontFamily}>
          {/* 上端の数値 */}
          {Array.from({ length: 17 }).map((_, i) => (
            <CodeGrid
              key={i}
              pos={{ x: i, y: 0 }}
              mousePos={mousePos}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}>
              {i === 0 ? "" : num2Hex(i - 1, 2, "x")}
            </CodeGrid>
          ))}
          {/* アドレスとコード部 */}
          {Array.from({ length: Math.ceil(addressRange / 16) }).map(
            (_, addressIndex) => (
              <React.Fragment key={addressIndex}>
                {/* アドレス部 */}
                <CodeGrid
                  pos={{ x: 0, y: addressIndex + 1 }}
                  mousePos={mousePos}
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}>
                  {num2Hex(startRange + addressIndex * 16, 4).substring(0, 3) +
                    "x"}
                </CodeGrid>

                {/* コード部 */}
                {Array.from({ length: 16 }).map((_, byteIndex) => {
                  const address = startRange + addressIndex * 16 + byteIndex;
                  const sub = address - startAddress;
                  return (
                    <CodeGrid
                      key={address}
                      pos={{ x: byteIndex + 1, y: addressIndex + 1 }}
                      mousePos={mousePos}
                      onMouseEnter={handleEnter}
                      onMouseLeave={handleLeave}>
                      {sub < 0 || sub >= codeLength
                        ? ""
                        : block.code.substring(sub * 2, (sub + 1) * 2)}
                    </CodeGrid>
                  );
                })}
              </React.Fragment>
            ),
          )}
        </Grid>
        {/* {block.code} */}
      </Box>
    </Stack>
  );
}

export default CodeBlockView;
