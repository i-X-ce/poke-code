import { PokeVersionType } from "./PokeVersion";

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
  version: PokeVersionType;
  blocks: CodeBlockModel[];
}

export interface CodeBlockModel {
  title: string;
  code: string;
}

export function createMockCodeData(num: number): CodeDataModel {
  return {
    id: `mock-id-${num}`,
    icon: "🤡",
    title: "セレクトバグ修正",
    date: new Date(),
    tags: ["ツール", "ゲーム", "攻略", "バグ", "裏技", "便利"],
    detail:
      "HRAMとマップスクリプトを併用して任意コード実行を行い、世界最大のバグであるセレクトバグを修正するコードです。コードによって何とかする頑張るよ。",
    description:
      "### すっごい頑張る  すっごい頑張ることで何とかするよ。  1. 頑張る  2. もっと頑張る  3. さらに頑張る",
    content: [
      {
        version: "r0",
        blocks: [
          {
            title: "セットアップ",
            code: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
          },
        ],
      },
      {
        version: "g1",
        blocks: [
          {
            title: "実行",
            code: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
          },
        ],
      },
    ],
  };
}
