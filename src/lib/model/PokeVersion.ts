export type PokeVersionType =
  | "r0"
  | "r1"
  | "g0"
  | "g1"
  | "b"
  | "y0"
  | "y1"
  | "y2"
  | "y3";

export const PokeVersions: Record<string, PokeVersionType> = {
  R0: "r0",
  R1: "r1",
  G0: "g0",
  G1: "g1",
  B: "b",
  Y0: "y0",
  Y1: "y1",
  Y2: "y2",
  Y3: "y3",
};
