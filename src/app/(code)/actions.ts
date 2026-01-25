"use server";

import { CodeDataInput, CodeDataSchema } from "@/lib/model/CodeDataModel";
import path from "path";
import fs from "fs/promises";
import { PATH } from "@/lib/constant/paths";
import { FILE_NAME } from "@/lib/constant/fileName";

export async function createCode(data: CodeDataInput) {
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

    return id;
  } catch (error) {
    throw new Error("データの保存に失敗しました");
  }
}

export async function saveCodeData(data: CodeDataInput) {
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
    return;
  } catch (error) {
    throw new Error("一時データの保存に失敗しました");
  }
}
