export interface CellPos {
  x: number;
  y: number;
}

export const CELL_STATES = {
  NORMAL: "normal",
  HOVERED: "hovered",
  SELECTED: "selected",
} as const;

export type CellState = (typeof CELL_STATES)[keyof typeof CELL_STATES];

export const cellState = (currentPos: CellPos, cellPos: CellPos) => {
  if (cellPos.x === currentPos.x && cellPos.y === currentPos.y) {
    return CELL_STATES.SELECTED;
  } else if (cellPos.x === currentPos.x || cellPos.y === currentPos.y) {
    return CELL_STATES.HOVERED;
  } else {
    return CELL_STATES.NORMAL;
  }
};
