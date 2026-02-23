import { CellPos } from "@/components/CodeContentView/cellState";
import { Box, Tooltip } from "@mui/material";
import { Grid } from "@mui/material";
import { memo, MouseEventHandler, useCallback } from "react";
import { CODE_GRID_CSS_VARIABLES } from "./cssVariables";

type CodeGridParams = {
  children: string;
  onMouseEnter: (pos: CellPos) => void;
  label?: string;
  stickyRow?: number;
} & CellPos;

const CodeGrid = memo(
  ({ x, y, children, onMouseEnter, label, stickyRow = 0 }: CodeGridParams) => {
    const isColumnEdge = x === 0;
    const isRowEdge = y === 0;

    const handleMouseEnter: MouseEventHandler<HTMLDivElement> =
      useCallback(() => {
        onMouseEnter({ x, y });
      }, [onMouseEnter, x, y]);

    return (
      <Tooltip title={label} placement="top" arrow sx={{ userSelect: "none" }}>
        <Grid
          {...{
            [CODE_GRID_CSS_VARIABLES.dataX]: x,
            [CODE_GRID_CSS_VARIABLES.dataY]: y,
          }}
          onMouseEnter={handleMouseEnter}
          size={isColumnEdge ? 2 : 1}
          sx={(theme) => ({
            position: isRowEdge ? "sticky" : "relative",
            top: isRowEdge ? stickyRow * 20 : "auto",
            zIndex: isRowEdge ? 5 : "auto",
            display: "flex",
            color: "text.secondary",
            borderTop: isRowEdge
              ? "none"
              : `1px ${theme.palette.divider} solid`,
            borderLeft: isColumnEdge
              ? "none"
              : `1px ${theme.palette.divider} solid`,

            [`[${CODE_GRID_CSS_VARIABLES.dataHX}="${x}"] &, [${CODE_GRID_CSS_VARIABLES.dataHY}="${y}"] &`]:
              {
                color:
                  isColumnEdge || isRowEdge ? "background.default" : "inherit",
              },
          })}>
          <Box
            zIndex={0}
            sx={{ position: "absolute", inset: 0, bgcolor: "background.paper" }}
          />
          <Box
            zIndex={1}
            sx={(theme) => ({
              position: "absolute",
              inset: 0,
              backgroundColor:
                isColumnEdge || isRowEdge
                  ? y % 2 === 0
                    ? "action.selected"
                    : "action.hover"
                  : y % 2 === 0
                    ? "action.hover"
                    : "background.paper",

              borderBottom: isRowEdge
                ? `1px ${theme.palette.divider} solid`
                : "none",

              // 親(data-h-x等)と自分の(data-x等)が一致した時のスタイル
              [`[${CODE_GRID_CSS_VARIABLES.dataHX}="${x}"] &, [${CODE_GRID_CSS_VARIABLES.dataHY}="${y}"] &`]:
                {
                  backgroundColor:
                    isColumnEdge || isRowEdge
                      ? "primary.main"
                      : "action.selected",
                },
              // マウス直下のセル
              [`[${CODE_GRID_CSS_VARIABLES.dataHX}="${x}"][${CODE_GRID_CSS_VARIABLES.dataHY}="${y}"] &`]:
                {
                  backgroundColor:
                    isColumnEdge || isRowEdge ? "primary.dark" : "action.focus",
                },
            })}
          />
          <Box
            flex={1}
            px={{ xs: isColumnEdge ? 0.5 : 0, md: isColumnEdge ? 1 : 0.5 }}
            py={{ xs: 0.1, md: 0.5 }}
            display={isColumnEdge ? "start" : "flex"}
            alignItems={"stretch"}
            justifyContent={"center"}
            position={"relative"}
            zIndex={2}
            fontSize={{ xs: 12, md: "1rem" }}>
            {children}
          </Box>
        </Grid>
      </Tooltip>
    );
  },
);

export default CodeGrid;
