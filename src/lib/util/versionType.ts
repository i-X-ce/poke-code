import { PokeVersions, PokeVersionType } from "../model/PokeVersion";

export const sortVersions = (
  versions: PokeVersionType[],
): PokeVersionType[] => {
  const versionOrder = Object.values(PokeVersions).reduce(
    (acc, v, i) => {
      acc[v] = i;
      return acc;
    },
    {} as Record<PokeVersionType, number>,
  );
  return versions.toSorted((a, b) => versionOrder[a] - versionOrder[b]);
};
