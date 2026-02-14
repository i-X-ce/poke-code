import { CodeBlock } from "../types/CodeDataModel";

/**
 * コードサイズをcontentから計算する
 *
 * @param content
 * @returns
 */
export const codeSize = (blocks?: CodeBlock[]) => {
  if (!blocks || blocks.length === 0) {
    return 0;
  }
  const blockSum = blocks.reduce<Record<string, number>>((acc, block) => {
    if (!acc[block.contentId]) {
      acc[block.contentId] = 0;
    }
    acc[block.contentId] += Math.ceil(block.code?.length / 2);
    return acc;
  }, {});

  return Math.max(...Object.values(blockSum));
};

/**
 * コードのフォーマットを整える（空白削除）
 *
 * @param code
 * @returns
 */
export const formatCode = (code: CodeBlock["code"]) => {
  return code.replace(/\s+/g, "").toUpperCase();
};
