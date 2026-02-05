import { CodeBlock, CodeData } from "../types/CodeDataModel";

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
