import z from "zod";
import { PokeVersions, PokeVersionType } from "./PokeVersion";

export const CodeContentSchema = z.object({
  id: z.string(),
  versions: z.enum(PokeVersions).array(),
});

export const CodeBlockSchema = z.object({
  id: z.string(),
  contentId: CodeContentSchema.shape.id,
  title: z.string(),
  address: z.string().length(4, "開始アドレスは4文字で入力してください"),
  code: z.string(),
});

export const CodeDataHeaderSchema = z.object({
  id: z.string(),
  isPublic: z.boolean(),
  title: z
    .string()
    .min(1, "タイトルは1文字以上入力してください")
    .max(50, "タイトルは50文字以内で入力してください"),
  date: z.preprocess((val) => {
    try {
      if (typeof val === "string" || val instanceof Date) {
        return new Date(val).toISOString();
      }
      return val;
    } catch {
      return val;
    }
  }, z.iso.datetime("有効な日付を入力してください")),
  tags: z
    .preprocess(
      (value) => {
        if (typeof value === "string") {
          const splitter = ",";
          return value
            .replaceAll(/[，、]/g, splitter)
            .split(splitter)
            .map((tag) => tag.trim())
            .filter(Boolean);
        }
        return value;
      },
      z.array(z.string()).max(10, "タグは最大10個までです"),
    )
    .refine((tags) => {
      const uniqueTags = new Set(tags);
      return uniqueTags.size === tags.length;
    }, "タグは重複できません")
    .refine((tags) => {
      return tags.every((tag) => tag.length <= 20);
    }, "各タグは20文字以内で入力してください"),
  detail: z
    .string()
    .min(1, "概要は1文字以上入力してください")
    .max(200, "概要は200文字以内で入力してください"),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

// JSONに保存するヘッダーメタデータのスキーマ
export const CodeDataHeaderJsonSchema = CodeDataHeaderSchema.extend({
  versions: z.enum(PokeVersions).array(),
  codeSize: z.number(),
});

// JSON全体のスキーマ
export const HeaderJsonSchema = z.object({
  tags: z.array(z.string()),
  headers: z.array(CodeDataHeaderJsonSchema),
});

export const CodeDataSchema = z.object({
  ...CodeDataHeaderSchema.shape,
  description: z
    .string()
    .min(1, "説明は1文字以上入力してください")
    .max(10000, "説明は10000文字以内で入力してください"),
  content: z
    .array(CodeContentSchema)
    .min(1, "コンテンツは一つ以上必要です")
    .max(Object.keys(PokeVersions).length, "コンテンツの数が多すぎます"),
  blocks: z.array(CodeBlockSchema).min(1, "コードブロックは一つ以上必要です"),
});

export type CodeBlock = z.infer<typeof CodeBlockSchema>;
export type CodeContent = z.infer<typeof CodeContentSchema>;
export type CodeDataHeader = z.infer<typeof CodeDataHeaderSchema>;
export type CodeData = z.infer<typeof CodeDataSchema>;

export type CodeDataHeaderJson = z.infer<typeof CodeDataHeaderJsonSchema>; // jsonに保存するメタデータ バージョングループを保持せず、タグ一覧のみ保持する
export type HeaderJson = z.infer<typeof HeaderJsonSchema>; // ヘッダーファイル全体の型

export type CodeDataInput = z.input<typeof CodeDataSchema>;
export type CodeDataOutput = z.output<typeof CodeDataSchema>;

export function createMockCodeData(num: number): CodeData {
  // const randomVersion = (): PokeVersionType => {
  //   const versions: PokeVersionType[] = Object.values(PokeVersions);
  //   return versions[Math.floor(Math.random() * versions.length)];
  // };

  const romVersions = ((num: number): PokeVersionType[] => {
    const versions: PokeVersionType[] = Object.values(PokeVersions);
    return versions.filter((_, i) => (num >> i) % 2 === 1);
  })(Math.floor(Math.random() * ((1 << 10) - 1)) + 1);

  const romVersionList = (() => {
    let list: PokeVersionType[][] = [];
    for (let i = 0; i < romVersions.length; i++) {
      const len = Math.random() * (romVersions.length - i) + 1;
      list = [...list, romVersions.slice(i, i + len)];
      i += len - 1;
    }
    return list;
  })();

  return {
    id: `mock-id-${num}`,
    isPublic: Math.random() < 0.5,
    title: `🤡セレクトバグ修正セレクトバグ修正セレクトバグ修正-${num}`,
    date: new Date().toString(),
    tags: ["ツール", "ゲーム", "攻略", "バグ", "裏技", "便利"],
    detail:
      "HRAMとマップスクリプトを併用して任意コード実行を行い、世界最大のバグであるセレクトバグを修正するコードです。コードによって何とかする頑張るよ。HRAMとマップスクリプトを併用して任意コード実行を行い、世界最大のバグであるセレクトバグを修正するコードです。コードによって何とかする頑張るよ。",
    description: `
# h1テスト  
## h2テスト
### h3テスト
#### h4テスト
##### h5テスト  
###### h6テスト  

**太字**  
*斜体*  
~~取り消し線~~  
\`inline code\`  テスト

\`\`\`javascript
function helloWorld() {
  console.log("Hello, world!");
}
\`\`\`  

1. タスク1 
1. タスク2
1. タスク3
    1. サブタスク1
    1. サブタスク2
2. 完成

- リストアイテム1
- リストアイテム2
- リストアイテム3
    - サブアイテム1
    - サブアイテム2
- リストアイテム4

> これは引用のテストです。
---

[リンクのテスト](https://example.com)  
aaa  
aaa![画像のテスト](../../test.bmp) aaa  
aaa  

<img src="../../test.bmp" alt="画像のテスト" />

| Parameter | Type | Default Value |
|------------------------|-------------|----------------|
| text | String | Empty String |
| buttonBackgroundColor | Int | Default Color |
| action | () -> Unit | Empty |

<!-- コメントのテスト -->

    `,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    content: [
      ...romVersionList.map((v, i) => ({
        id: `mock-content-id-${num}-${i}`,
        versions: v,
      })),
    ],
    blocks: [
      ...Array.from({
        length: Math.floor(Math.random() * 3) + 1,
      }).map((_, j) => ({
        id: `mock-block-id-${num}-${j}`,
        contentId: `mock-content-id-${num}-${j % romVersionList.length}`,
        order: j,
        title: `コードブロック${j + 1}`,
        address: Math.floor(Math.random() * 0xffff)
          .toString(16)
          .toUpperCase()
          .padStart(4, "0"),
        code: Array.from({
          length: Math.floor(Math.random() * 20) + 10,
        })
          .map(() => Math.random().toString(16).slice(2, 4).toUpperCase())
          .join(""),
      })),
    ],
  };
}

// content: [...Array(Math.floor(Math.random() * 5) + 1)].map((_, i) => ({
//       version: randomVersion(),
//       blocks: [
//         {
//           title: `コードブロック${i + 1}`,
//           code: Array((Math.floor(Math.random() * 10) + 1) * 5)
//             .fill(Math.random().toString(16).slice(2, 4).toUpperCase())
//             .join(""),
//         },
//       ],
//     })),
//   };
