"use client";
import { type CodeBlock as CodeBlockView } from "@/lib/types/CodeDataModel";
import {
  Box,
  Chip,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, {
  memo,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from "react";
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
  hidden?: boolean;
}

const CodeBlockView = ({ block, hidden }: CodeBlockViewProps) => {
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const containerRef = useRef<HTMLDivElement>(null);

  const stepNum = isSm ? 8 : 16;

  const code = formatCode(block.code);
  const codeLength = Math.floor(code.length / 2);
  const startAddress = block.address ? parseInt(block.address, 16) : 0;
  const startRange = block.address ? parseInt(block.address, 16) & 0xfff0 : 0;
  const endRange = (startAddress + codeLength - 1) | (stepNum - 1);
  const addressRange = endRange - startRange;

  const handleMouseEnters = useCallback((pos: CellPos) => {
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
  }, []);

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    const el = containerRef.current;
    if (!el) return;

    el.setAttribute(CODE_GRID_CSS_VARIABLES.dataHX, "-1");
    el.setAttribute(CODE_GRID_CSS_VARIABLES.dataHY, "-1");
  };

  const { title } = block;

  const topHeader = useMemo(
    () =>
      Array.from({ length: stepNum + 1 }).map((_, i) => {
        const pos: CellPos = { x: i, y: 0 };
        return (
          <CodeGrid
            key={`header-${i}`}
            {...pos}
            onMouseEnter={handleMouseEnters}>
            {i === 0 ? "" : num2Hex(i - 1, 2)}
          </CodeGrid>
        );
      }),
    [stepNum, handleMouseEnters],
  );

  const topHeaderSm = useMemo(() => {
    if (!isSm) return null;
    return Array.from({ length: stepNum + 1 }).map((_, i) => {
      const pos: CellPos = { x: i, y: 0 };
      return (
        <CodeGrid
          key={`header-sm-${i}`}
          {...pos}
          onMouseEnter={handleMouseEnters}
          stickyRow={1}>
          {i === 0 ? "" : num2Hex(i + stepNum - 1, 2)}
        </CodeGrid>
      );
    });
  }, [isSm, stepNum, handleMouseEnters]);

  const codeCells = useMemo(() => {
    const cells: ReactNode[] = [];
    const rowCount = Math.ceil(addressRange / stepNum);

    for (let addressIndex = 0; addressIndex < rowCount; addressIndex++) {
      const rowAddress = startRange + addressIndex * stepNum;
      const addressPos: CellPos = { x: 0, y: addressIndex + 1 };

      cells.push(
        <CodeGrid
          key={`address-${rowAddress}`}
          {...addressPos}
          onMouseEnter={handleMouseEnters}>
          {num2Hex(rowAddress, 4)}
        </CodeGrid>,
      );

      for (let byteIndex = 0; byteIndex < stepNum; byteIndex++) {
        const address = rowAddress + byteIndex;
        const sub = address - startAddress;
        const value =
          sub < 0 || sub >= codeLength
            ? ""
            : code.substring(sub * 2, (sub + 1) * 2);
        const pos: CellPos = {
          x: byteIndex + 1,
          y: addressIndex + 1,
        };

        cells.push(
          <CodeGrid
            key={address}
            {...pos}
            onMouseEnter={handleMouseEnters}
            label={`${num2Hex(address, 4)} : ${value}`}>
            {value}
          </CodeGrid>,
        );
      }
    }

    return cells;
  }, [
    addressRange,
    stepNum,
    startRange,
    handleMouseEnters,
    startAddress,
    codeLength,
    code,
  ]);

  return (
    <Stack display={hidden ? "none" : ""} position={"relative"} gap={1}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        position={"sticky"}>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          {title && <Chip label={title} />}
          <Typography
            fontFamily={GoogleSansCode.style.fontFamily}
            color="textSecondary">
            {codeLength} Byte
          </Typography>
        </Stack>
        <Box ml={"auto"}>
          <CopyButton copyValue={code} />
        </Box>
      </Stack>

      <Box
        sx={{
          border: (theme) => `1px ${theme.palette.divider} solid`,
          borderRadius: 1,
          // borderStartStartRadius: 0
          overflow: "clip",
          cursor: "default",
        }}>
        <Grid
          ref={containerRef}
          onMouseLeave={handleMouseLeave}
          container
          columns={stepNum + 2}
          fontFamily={GoogleSansCode.style.fontFamily}
          position={"relative"}>
          {/* 上端の数値 */}
          {topHeader}
          {topHeaderSm}
          {codeCells}
        </Grid>
        {/* {block.code} */}
      </Box>
    </Stack>
  );
};

const areEqual = (prev: CodeBlockViewProps, next: CodeBlockViewProps) => {
  return (
    prev.hidden === next.hidden &&
    prev.block.id === next.block.id &&
    prev.block.code === next.block.code &&
    prev.block.address === next.block.address &&
    prev.block.title === next.block.title
  );
};

export default memo(CodeBlockView, areEqual);
