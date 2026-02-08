import fs from "fs/promises";
import path from "path";
import { PATH } from "../../lib/constant/paths";
import {
  CodeData,
  CodeDataHeaderJson,
  CodeDataHeaderJsonSchema,
  CodeDataInput,
  CodeDataSchema,
  HeaderJson,
} from "../../lib/types/CodeDataModel";
import { FILE_NAME } from "../../lib/constant/fileName";
import { ActionResult } from "../../lib/types/ActionResult";
import { codeSize } from "../../lib/util/codeDataFormat";
import isDevelopment from "@/lib/util/isDevelopment";

/**
 * コードデータの読み取り（ID指定）
 *
 * @param id
 */
export async function readCode(
  id: CodeData["id"],
): Promise<ActionResult<CodeData>> {
  try {
    const codeDataDir = path.join(process.cwd(), PATH.server.CODE_DATA(id));
    const codeDataFilePath = path.join(codeDataDir, FILE_NAME.CODE_DATA);
    const descriptionFilePath = path.join(
      codeDataDir,
      FILE_NAME.DESCRIPTION_MD,
    );

    const dataJson = await fs.readFile(codeDataFilePath, "utf-8");
    const description = await fs.readFile(descriptionFilePath, "utf-8");
    const data = JSON.parse(dataJson);
    const codeData = CodeDataSchema.parse({ ...data, description });

    if (!isDevelopment && !codeData.isPublic) {
      return {
        ok: false,
        message: "指定されたコードデータは非公開です",
      };
    }

    return {
      ok: true,
      data: codeData,
    };
  } catch (error) {
    return {
      ok: false,
      message: "コードデータの読み取りに失敗しました",
    };
  }
}

/**
 * コードデータの新規作成
 *
 * @param data
 * @returns
 */
export async function createCode(
  data: CodeDataInput,
): Promise<ActionResult<string>> {
  try {
    const parsed = CodeDataSchema.parse(data);
    const id = crypto.randomUUID();
    const { description, ...dataWithoutDescription } = parsed;
    const dataToSave = { ...dataWithoutDescription, id };

    // ディレクトリ作成
    const dirPath = path.join(process.cwd(), PATH.server.CODE_DATA(id));
    await fs.mkdir(dirPath, { recursive: true });

    // ファイル保存
    const codeDataFilePath = path.join(dirPath, FILE_NAME.CODE_DATA);
    await fs.writeFile(
      codeDataFilePath,
      JSON.stringify(dataToSave, null, 2),
      "utf-8",
    );

    // 説明文保存(Markdown)
    const descriptionFilePath = path.join(dirPath, FILE_NAME.DESCRIPTION_MD);
    await fs.writeFile(descriptionFilePath, description, "utf-8");

    await updateHeadersFile();

    // 一時保存データの削除
    const tempDirPath = path.join(
      process.cwd(),
      PATH.server.TEMPORARY_CODE_DATA,
    );
    await fs.rm(tempDirPath, { recursive: true, force: true });

    return {
      ok: true,
      data: id,
    };
  } catch (error) {
    return {
      ok: false,
      message: "コードデータの作成に失敗しました",
    };
  }
}

export const updateCode = async (
  id: CodeData["id"],
  data: CodeDataInput,
): Promise<ActionResult<string>> => {
  try {
    const parsed = CodeDataSchema.parse(data);
    const { description, ...dataWithoutDescription } = parsed;
    const dataToSave = { ...dataWithoutDescription, id };

    const codeDataDir = path.join(process.cwd(), PATH.server.CODE_DATA(id));

    // ファイル保存
    const codeDataFilePath = path.join(codeDataDir, FILE_NAME.CODE_DATA);
    await fs.writeFile(
      codeDataFilePath,
      JSON.stringify(dataToSave, null, 2),
      "utf-8",
    );

    // 説明文保存(Markdown)
    const descriptionFilePath = path.join(
      codeDataDir,
      FILE_NAME.DESCRIPTION_MD,
    );
    await fs.writeFile(descriptionFilePath, description, "utf-8");

    await updateHeadersFile();

    return {
      ok: true,
      data: id,
    };
  } catch (error) {
    return {
      ok: false,
      message: "コードデータの更新に失敗しました",
    };
  }
};

/**
 * コードデータの削除（ID指定）
 *
 * @param id
 * @returns
 */
export const deleteCode = async (id: CodeData["id"]): Promise<ActionResult> => {
  try {
    const codeDataDir = path.join(process.cwd(), PATH.server.CODE_DATA(id));
    await fs.rm(codeDataDir, { recursive: true, force: true });

    await updateHeadersFile();

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: "コードデータの削除に失敗しました",
    };
  }
};

/**
 * コードデータの一時保存
 *
 * @param data
 * @returns
 */
export async function saveCodeData(data: CodeDataInput): Promise<ActionResult> {
  try {
    const { description, ...dataWithoutDescription } = data;
    const dataToSave = { ...dataWithoutDescription };

    const tempDirPath = path.join(
      process.cwd(),
      PATH.server.TEMPORARY_CODE_DATA,
    );
    await fs.mkdir(tempDirPath, { recursive: true });

    const tempFilePath = path.join(tempDirPath, FILE_NAME.CODE_DATA);
    await fs.writeFile(
      tempFilePath,
      JSON.stringify(dataToSave, null, 2),
      "utf-8",
    );

    const descriptionFilePath = path.join(
      tempDirPath,
      FILE_NAME.DESCRIPTION_MD,
    );
    await fs.writeFile(descriptionFilePath, description, "utf-8");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: "一時データの保存に失敗しました",
    };
  }
}

/**
 * 一時保存したコードデータの読み込み
 *
 * @returns
 */
export async function loadTemporaryCodeData(): Promise<
  ActionResult<CodeDataInput | undefined>
> {
  try {
    const tempDirPath = path.join(
      process.cwd(),
      PATH.server.TEMPORARY_CODE_DATA,
    );

    const tempFilePath = path.join(tempDirPath, FILE_NAME.CODE_DATA);
    const descriptionFilePath = path.join(
      tempDirPath,
      FILE_NAME.DESCRIPTION_MD,
    );

    if (!(await fs.stat(tempFilePath).catch(() => false))) {
      return {
        ok: true,
        data: undefined,
      };
    }

    const dataJson = await fs.readFile(tempFilePath, "utf-8");
    const description = await fs.readFile(descriptionFilePath, "utf-8");
    const data = JSON.parse(dataJson);
    // const codeData = CodeDataSchema.parse({ ...data, description });
    const codeData = { ...data, description };

    return {
      ok: true,
      data: codeData,
    };
  } catch (error) {
    return {
      ok: false,
      message: "一時データの読み込みに失敗しました",
    };
  }
}

/**
 * ヘッダーファイルのアップデート
 *
 */
const updateHeadersFile = async (): Promise<ActionResult> => {
  try {
    const folderNames = await fs.readdir(
      path.join(process.cwd(), PATH.server.CODE_DATA()),
    );

    const headers: CodeDataHeaderJson[] = (
      await Promise.all(
        folderNames.map(async (id) => {
          const codeDataDir = path.join(
            process.cwd(),
            PATH.server.CODE_DATA(id),
          );
          const codeDataFilePath = path.join(codeDataDir, FILE_NAME.CODE_DATA);
          const dataJson = JSON.parse(
            await fs.readFile(codeDataFilePath, "utf-8"),
          );
          const { data, success } = CodeDataSchema.omit({
            description: true,
          }).safeParse(dataJson);

          if (!success) {
            return null;
          }

          const parsedData = CodeDataHeaderJsonSchema.safeParse({
            ...data,
            id,
            versions: data.content.flatMap((c) => c.versions),
            codeSize: codeSize(data.blocks),
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
