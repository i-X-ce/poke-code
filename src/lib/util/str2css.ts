import { PokeVersions, PokeVersionType } from "../model/PokeVersion";

type ColorType = "red" | "green" | "blue" | "yellow" | "gray";

export function str2css(str: ColorType): string {
  return `var(--bc-${str})`;
}

export default function ver2css(version: PokeVersionType) {
  if (version === PokeVersions.R0 || version === PokeVersions.R1) {
    return str2css("red");
  } else if (version === PokeVersions.G0 || version === PokeVersions.G1) {
    return str2css("green");
  } else if (version === PokeVersions.B) {
    return str2css("blue");
  } else if (
    version === PokeVersions.Y0 ||
    version === PokeVersions.Y1 ||
    version === PokeVersions.Y2 ||
    version === PokeVersions.Y3
  ) {
    return str2css("yellow");
  }
  return str2css("gray");
}
