import { CodeBlock, CodeContent } from "@/lib/model/CodeDataModel";
import { PokeVersions } from "@/lib/model/PokeVersion";

export const INIT_CODE_BLOCK: CodeBlock = {
  title: "",
  address: "DA00",
  code: "",
} as const;

export const INIT_CODE_CONTENT = (allVersion: boolean = true): CodeContent => ({
  id: crypto.randomUUID(),
  versions: allVersion ? Object.values(PokeVersions) : [],
  blocks: [],
});
