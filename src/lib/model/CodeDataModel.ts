import PokeVersion from "./PokeVersion";

export interface CodeDataModel {
  id: string;
  icon: string;
  title: string;
  date: Date;
  tags: string[];
  detail: string;
  description: string;
  content: CodeContentModel[];
}

export interface CodeContentModel {
  version: PokeVersion;
  blocks: CodeBlockModel[];
}

export interface CodeBlockModel {
  title: string;
  code: string;
}
