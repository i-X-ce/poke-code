import { CodeData } from "../types/CodeDataModel";

/**
 * コードサイズをcontentから計算する
 *
 * @param content
 * @returns
 */
export const codeSize = (content?: CodeData["content"]) => {
  if (!content) return 0;
  return Math.max(
    ...content.map((c) =>
      c.blocks.reduce((acc, b) => Math.ceil(acc + b.code.length / 2), 0),
    ),
  );
};
