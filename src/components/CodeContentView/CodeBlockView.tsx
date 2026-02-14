"use client";
import useCopyClipboard from "@/hooks/useCopyClipboard";
import { type CodeBlock as CodeBlockView } from "@/lib/types/CodeDataModel";
import { Box, Chip, Grid, Stack } from "@mui/material";
import React, { memo, MouseEventHandler, useCallback, useRef } from "react";
import CopyButton from "../CopyButton";
import { GoogleSansCode } from "@/lib/util/fonts";
import CodeGrid from "./CodeGrid";
import { CellPos } from "@/components/CodeContentView/cellState";
import { formatCode } from "@/lib/util/codeDataFormat";
import { CODE_GRID_CSS_VARIABLES } from "./cssVariables";

const num2Hex = (num: number, pad: number, fillString: string = "0") => {
  return num.toString(16).toUpperCase().padStart(pad, fillString);
};

interface CodeBlockViewProps {
  block: CodeBlockView;
}

const CodeBlockView = memo(({ block }: CodeBlockViewProps) => {
  const { handleCopy, copied } = useCopyClipboard(formatCode(block.code));

  const containerRef = useRef<HTMLDivElement>(null);

  const code = formatCode(block.code);
  const codeLength = Math.floor(code.length / 2);
  const startAddress = block.address ? parseInt(block.address, 16) : 0;
  const startRange = block.address ? parseInt(block.address, 16) & 0xfff0 : 0;
  const endRange = (startAddress + codeLength - 1) | 0xf;
  const addressRange = endRange - startRange;

  const handleMouseEnter = (pos: CellPos) => {
    const el = containerRef.current;
    if (!el) return;

    const { x, y } = pos;
    if (
      el.getAttribute(CODE_GRID_CSS_VARIABLES.dataX) === x.toString() &&
      el.getAttribute(CODE_GRID_CSS_VARIABLES.dataY) === y.toString()
    ) {
      return; // すでに同じセルにいる場合は何もしない
    }
    el.setAttribute(CODE_GRID_CSS_VARIABLES.dataHX, x.toString());
    el.setAttribute(CODE_GRID_CSS_VARIABLES.dataHY, y.toString());
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    const el = containerRef.current;
    if (!el) return;

    el.setAttribute(CODE_GRID_CSS_VARIABLES.dataHX, "-1");
    el.setAttribute(CODE_GRID_CSS_VARIABLES.dataHY, "-1");
  };

  const { title } = block;

  return (
    <Stack position={"relative"} gap={1}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        position={"sticky"}
      >
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
          overflow: "clip",
          cursor: "default",
        }}
      >
        <Grid
          ref={containerRef}
          onMouseLeave={handleMouseLeave}
          container
          columns={18}
          fontFamily={GoogleSansCode.style.fontFamily}
          position={"relative"}
        >
          {/* 上端の数値 */}
          {Array.from({ length: 17 }).map((_, i) => {
            const pos: CellPos = { x: i, y: 0 };
            return (
              <CodeGrid
                key={i}
                pos={pos}
                onMouseEnter={() => handleMouseEnter(pos)}
              >
                {i === 0 ? "" : num2Hex(i - 1, 2, "x")}
              </CodeGrid>
            );
          })}
          {/* アドレスとコード部 */}
          {Array.from({ length: Math.ceil(addressRange / 16) }).map(
            (_, addressIndex) => {
              const pos: CellPos = { x: 0, y: addressIndex + 1 };
              return (
                <React.Fragment key={addressIndex}>
                  {/* アドレス部 */}
                  <CodeGrid
                    pos={pos}
                    onMouseEnter={() => handleMouseEnter(pos)}
                  >
                    {num2Hex(startRange + addressIndex * 16, 4).substring(
                      0,
                      3,
                    ) + "x"}
                  </CodeGrid>

                  {/* コード部 */}
                  {Array.from({ length: 16 }).map((_, byteIndex) => {
                    const address = startRange + addressIndex * 16 + byteIndex;
                    const sub = address - startAddress;
                    const pos: CellPos = {
                      x: byteIndex + 1,
                      y: addressIndex + 1,
                    };
                    return (
                      <CodeGrid
                        key={address}
                        pos={pos}
                        onMouseEnter={() => handleMouseEnter(pos)}
                        label={`${num2Hex(address, 4)} : ${
                          sub < 0 || sub >= codeLength
                            ? ""
                            : code.substring(sub * 2, (sub + 1) * 2)
                        }`}
                      >
                        {sub < 0 || sub >= codeLength
                          ? ""
                          : code.substring(sub * 2, (sub + 1) * 2)}
                      </CodeGrid>
                    );
                  })}
                </React.Fragment>
              );
            },
          )}
        </Grid>
        {/* {block.code} */}
      </Box>
    </Stack>
  );
});

export default CodeBlockView;
