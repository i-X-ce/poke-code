"use client";
import { bookmarkBaseAtom } from "@/atoms/base";
import { PATH } from "@/lib/constant/paths";
import { ActionResult } from "@/lib/types/ActionResult";
import {
  CodeDataHeaderJson,
  HeaderJsonSchema,
} from "@/lib/types/CodeDataModel";
import { type SearchOptions } from "@/lib/types/SearchOptions";
import { getDefaultStore, useAtomValue } from "jotai";

interface GetHeadersResult {
  headers: CodeDataHeaderJson[];
  totalCount: number;
}

/**
 * コードデータヘッダーの取得
 *
 * @param param0
 * @returns
 */
export const getHeaders = async ({
  page = 0,
  limit,

  q,
  tags,
  versions,
  sizeMin,
  sizeMax,
  orderBy = "date",
  orderDirection = "desc",
  onlyBookmarked = false,
}: SearchOptions): Promise<ActionResult<GetHeadersResult>> => {
  try {
    const res = await fetch(PATH.HEADERS);
    const data = await res.json();
    const parsedData = HeaderJsonSchema.parse(data);

    let filteredHeaders = parsedData.headers;

    // 検索クエリでフィルタリング
    if (q) {
      const lowerQ = q.toLowerCase();
      filteredHeaders = filteredHeaders.filter(
        (header) =>
          header.title.toLowerCase().includes(lowerQ) ||
          header.tags.some((tag) => tag.toLowerCase().includes(lowerQ)),
      );
    }

    // タグでフィルタリング
    if (tags) {
      filteredHeaders = filteredHeaders.filter((header) =>
        tags.every((tag) => header.tags.includes(tag)),
      );
    }

    // バージョンでフィルタリング
    if (versions) {
      filteredHeaders = filteredHeaders.filter((header) =>
        versions.every((version) => header.versions.includes(version)),
      );
    }
    // コードサイズでフィルタリング
    if (sizeMin !== undefined) {
      filteredHeaders = filteredHeaders.filter(
        (header) => header.codeSize >= sizeMin,
      );
    }
    if (sizeMax !== undefined) {
      filteredHeaders = filteredHeaders.filter(
        (header) => header.codeSize <= sizeMax,
      );
    }

    // ブックマーク済みのみ
    if (onlyBookmarked) {
      const store = getDefaultStore();
      const bookmarkedIds = store.get(bookmarkBaseAtom);
      filteredHeaders = filteredHeaders.filter((header) =>
        bookmarkedIds.includes(header.id),
      );
    }

    // ソート
    filteredHeaders.sort((a, b) => {
      let compareValue = 0;
      if (orderBy === "date") {
        compareValue = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (orderBy === "title") {
        compareValue = a.title.localeCompare(b.title);
      }

      return orderDirection === "asc" ? compareValue : -compareValue;
    });

    const totalCount = filteredHeaders.length;

    // ページネーション
    const paginatedHeaders = limit
      ? filteredHeaders.slice(page * limit, (page + 1) * limit)
      : filteredHeaders;

    return {
      ok: true,
      data: {
        headers: paginatedHeaders,
        totalCount,
      },
    };
  } catch (error) {
    return {
      ok: false,
      message: "ヘッダーファイルの取得に失敗しました",
    };
  }
};

interface TagListResult {
  tags: string[];
}

/**
 * タグ一覧の取得
 */
export const getTagList = async (): Promise<ActionResult<TagListResult>> => {
  try {
    const res = await fetch(PATH.HEADERS);
    const data = await res.json();
    const { tags } = HeaderJsonSchema.parse(data);
    const uniqueTags = Array.from(new Set(tags));
    return {
      ok: true,
      data: {
        tags: uniqueTags,
      },
    };
  } catch (error) {
    return {
      ok: false,
      message: "タグ一覧の取得に失敗しました",
    };
  }
};
