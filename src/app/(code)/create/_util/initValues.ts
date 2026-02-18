import { CodeBlock, CodeContent, CodeData } from "@/lib/types/CodeDataModel";
import { PokeVersions } from "@/lib/types/PokeVersion";

export const createInitCodeBlock = (contentId: string): CodeBlock => ({
  id: crypto.randomUUID(),
  contentId,
  title: "",
  address: "DA00",
  code: "",
});

export const INIT_CODE_CONTENT = (allVersion: boolean = true): CodeContent => ({
  id: crypto.randomUUID(),
  versions: allVersion ? Object.values(PokeVersions) : [],
});

const Date2String = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  date.setSeconds(0);
  return formatter.format(date).replace(" ", "T");
};

const initialContent = INIT_CODE_CONTENT();

export const INIT_CODE_DATA: CodeData = {
  id: "init-id",
  isPublic: true,
  title: "",
  date: Date2String(new Date()),
  tags: [] as string[],
  detail: "",
  description: "",
  content: [initialContent],
  blocks: [createInitCodeBlock(initialContent.id)],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
