export const PokeVersions = {
  R0: "R0",
  R1: "R1",
  G0: "G0",
  G1: "G1",
  B: "B",
  Y0: "Y0",
  Y1: "Y1",
  Y2: "Y2",
  Y3: "Y3",
} as const;

export type PokeVersionType = (typeof PokeVersions)[keyof typeof PokeVersions];

export const PokeVersionNames: Record<PokeVersionType, string> = {
  R0: "赤初期版v1.0",
  R1: "赤後期版v1.1",
  G0: "緑初期版v1.0",
  G1: "緑後期版v1.1",
  B: "青",
  Y0: "黄初期版v1.0",
  Y1: "黄後期版v1.1",
  Y2: "黄後期版v1.2",
  Y3: "黄後期版v1.3",
} as const;
