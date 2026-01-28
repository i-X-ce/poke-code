"use server";

import fs from "fs/promises";
import path from "path";
import { PATH } from "../constant/paths";
import {
  CodeDataHeaderJson,
  CodeDataHeaderJsonSchema,
  CodeDataSchema,
} from "../model/CodeDataModel";
import { FILE_NAME } from "../constant/fileName";
import { ActionResult } from "../model/ActionResult";

interface HeaderJson {
  tags: string[];
  headers: CodeDataHeaderJson[];
}

/**
 * ヘッダーファイルのアップデート
 *
 */
export const updateHeadersFile = async (): Promise<ActionResult> => {
  try {
    const folderNames = await fs.readdir(
      path.join(process.cwd(), PATH.server.CODE_DATA()),
    );

    const headers: CodeDataHeaderJson[] = (
      await Promise.all(
        folderNames.map(async (folderName) => {
          const codeDataDir = path.join(
            process.cwd(),
            PATH.server.CODE_DATA(folderName),
          );
          const codeDataFilePath = path.join(codeDataDir, FILE_NAME.CODE_DATA);
          const dataJson = JSON.parse(
            await fs.readFile(codeDataFilePath, "utf-8"),
          );
          const data = CodeDataSchema.omit({ description: true }).safeParse(
            dataJson,
          );

          if (!data.success) {
            return null;
          }

          const parsedData = CodeDataHeaderJsonSchema.safeParse({
            ...data.data,
            versions: data.data.content.flatMap((c) => c.versions),
          });

          if (!parsedData.success) {
            return null;
          }

          return parsedData.data;
        }),
      )
    ).filter((header) => header !== null);

    const tags = Array.from(new Set(headers.flatMap((h) => h.tags)));

    const headerJson: HeaderJson = {
      tags,
      headers,
    };

    const headersFilePath = path.join(process.cwd(), PATH.server.HEADERS);
    await fs.writeFile(
      headersFilePath,
      JSON.stringify(headerJson, null, 2),
      "utf-8",
    );

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      message: "ヘッダーファイルの更新に失敗しました",
    };
  }
};
