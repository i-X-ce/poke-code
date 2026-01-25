import { CodeBlock, CodeContent, CodeData } from "@/lib/model/CodeDataModel";
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

const Date2String = (date: Date): string => date.toISOString().split("T")[0];

export const INIT_CODE_DATA: CodeData = {
  id: "init-id",
  title: "",
  date: Date2String(new Date()),
  tags: [] as string[],
  detail: "",
  description: "",
  content: [INIT_CODE_CONTENT()],
};
