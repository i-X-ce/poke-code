import { PokeVersions, PokeVersionType } from "./PokeVersion";

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
  // const randomVersion = (): PokeVersionType => {
  //   const versions: PokeVersionType[] = Object.values(PokeVersions);
  //   return versions[Math.floor(Math.random() * versions.length)];
  // };

  const romVersions = ((num: number): PokeVersionType[] => {
    const versions: PokeVersionType[] = Object.values(PokeVersions);
    return versions.filter((_, i) => (num >> i) % 2 === 1);
  })(Math.floor(Math.random() * ((1 << 10) - 1)) + 1);

  return {
    id: `mock-id-${num}`,
    icon: "🤡",
    title: `セレクトバグ修正セレクトバグ修正セレクトバグ修正-${num}`,
    date: new Date(),
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
    content: [
      ...Array.from({ length: romVersions.length }).map((_, i) => ({
        version: romVersions[i],
        blocks: [
          ...Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(
            (_, j) => ({
              title: `コードブロック${j + 1}`,
              code: Array.from({
                length: Math.floor(Math.random() * 20) + 10,
              })
                .map(() => Math.random().toString(16).slice(2, 4).toUpperCase())
                .join(""),
            })
          ),
        ],
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
