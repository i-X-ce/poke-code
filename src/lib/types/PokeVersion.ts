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
