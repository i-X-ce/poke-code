"use server";

import { CodeDataInput, CodeDataSchema } from "@/lib/model/CodeDataModel";
import path from "path";
import fs from "fs/promises";
import { PATH } from "@/lib/constant/paths";
import { FILE_NAME } from "@/lib/constant/fileName";
import { ActionResult } from "@/lib/model/ActionResult";

export async function createCode(
  data: CodeDataInput,
): Promise<ActionResult<string>> {
  try {
    const parsed = CodeDataSchema.parse(data);
    const id = crypto.randomUUID();
    const { description, ...dataWithoutDescription } = parsed;
    const dataToSave = { ...dataWithoutDescription, id };

    const dirPath = path.join(process.cwd(), PATH.server.CODE_DATA(id));
    await fs.mkdir(dirPath, { recursive: true });

    const codeDataFilePath = path.join(dirPath, FILE_NAME.CODE_DATA);
    await fs.writeFile(
      codeDataFilePath,
      JSON.stringify(dataToSave, null, 2),
      "utf-8",
    );

    const descriptionFilePath = path.join(dirPath, FILE_NAME.DESCRIPTION_MD);
    await fs.writeFile(descriptionFilePath, description, "utf-8");

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

export async function loadTemporaryCodeData(): Promise<
  ActionResult<CodeDataInput>
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

    const dataJson = await fs.readFile(tempFilePath, "utf-8");
    const description = await fs.readFile(descriptionFilePath, "utf-8");
    const data = JSON.parse(dataJson);
    const codeData = { ...data, description } as CodeDataInput;

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
