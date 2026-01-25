import { CodeBlock, CodeData } from "@/lib/model/CodeDataModel";

interface FieldItem {
  label: string;
  placeholder: string;
}

export const fieldItems: {
  data: Record<keyof CodeData, FieldItem>;
  block: Record<keyof CodeBlock, FieldItem>;
} = {
  data: {
    id: {
      label: "ID",
      placeholder: "",
    },
    isPublic: {
      label: "公開設定",
      placeholder: "",
    },
    title: {
      label: "タイトル",
      placeholder: "バイナリエディタ",
    },
    date: {
      label: "作成日時",
      placeholder: "",
    },
    tags: {
      label: "タグ(カンマ区切り)",
      placeholder: "ツール、便利",
    },
    detail: {
      label: "概要",
      placeholder:
        "バイナリエディタを起動するコードです。メモリを自由に書き換えることが可能になります。",
    },
    description: {
      label: "説明(Markdown)",
      placeholder: `## 使い方
1. なかよしバッヂを入手する
2. そだてやに「てEん」を預け、すぐに引き出す
3. なかよしバッヂを使用する
    `,
    },
    content: {
      label: "コード内容",
      placeholder: "",
    },
  },
  block: {
    title: {
      label: "タイトル",
      placeholder: "コードブロックのタイトル",
    },
    address: {
      label: "開始アドレス",
      placeholder: "DA00",
    },
    code: {
      label: "コード",
      placeholder:
        "// ここにコードを記述します。\n00 01 02 03 04 05 06 07\n08 09 0A 0B 0C 0D 0E 0F",
    },
  },
} as const;
