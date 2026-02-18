import {
  CELL_STATES,
  CellPos,
  CellState,
} from "@/components/CodeContentView/cellState";
import { Box, SxProps, Theme, Tooltip } from "@mui/material";
import { Grid } from "@mui/material";
import { memo, MouseEventHandler, ReactNode } from "react";
import { CODE_GRID_CSS_VARIABLES } from "./cssVariables";

interface CodeGridParams {
  children: ReactNode;
  pos: CellPos;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  label?: string;
  stickyRow?: number;
}

const CodeGrid = memo(
  ({ pos, children, onMouseEnter, label, stickyRow = 0 }: CodeGridParams) => {
    const isColumnEdge = pos.x === 0;
    const isRowEdge = pos.y === 0;

    return (
      <Tooltip title={label} placement="top" arrow sx={{ userSelect: "none" }}>
        <Grid
          {...{
            [CODE_GRID_CSS_VARIABLES.dataX]: pos.x,
            [CODE_GRID_CSS_VARIABLES.dataY]: pos.y,
          }}
          onMouseEnter={onMouseEnter}
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

            [`[${CODE_GRID_CSS_VARIABLES.dataHX}="${pos.x}"] &, [${CODE_GRID_CSS_VARIABLES.dataHY}="${pos.y}"] &`]:
              {
                color:
                  isColumnEdge || isRowEdge ? "background.default" : "inherit",
              },
          })}
        >
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
                isColumnEdge || isRowEdge ? "action.hover" : "background.paper",

              borderBottom: isRowEdge
                ? `1px ${theme.palette.divider} solid`
                : "none",

              // 親(data-h-x等)と自分の(data-x等)が一致した時のスタイル
              [`[${CODE_GRID_CSS_VARIABLES.dataHX}="${pos.x}"] &, [${CODE_GRID_CSS_VARIABLES.dataHY}="${pos.y}"] &`]:
                {
                  backgroundColor:
                    isColumnEdge || isRowEdge
                      ? "primary.main"
                      : "action.selected",
                },
              // マウス直下のセル
              [`[${CODE_GRID_CSS_VARIABLES.dataHX}="${pos.x}"][${CODE_GRID_CSS_VARIABLES.dataHY}="${pos.y}"] &`]:
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
            fontSize={{ xs: 12, md: "1rem" }}
          >
            {children}
          </Box>
        </Grid>
      </Tooltip>
    );
  },
);

export default CodeGrid;
