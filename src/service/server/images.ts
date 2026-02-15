import { PATH } from "@/lib/constant/paths";
import { ActionResult } from "@/lib/types/ActionResult";
import { CodeData } from "@/lib/types/CodeDataModel";
import { ImageFile } from "@/lib/types/Image";
import fs from "fs/promises";
import path from "path";

/**
 * 画像の保存
 *
 * @param imageData
 * @param id
 * @returns
 */
export async function saveImage(
  imageData: ImageFile,
  id?: CodeData["id"],
): Promise<ActionResult<string>> {
  try {
    const imageBuffer = Buffer.from(imageData.data, "base64");
    const imageDir = id
      ? path.join(process.cwd(), PATH.server.CODE_DATA(id))
      : path.join(process.cwd(), PATH.server.TEMPORARY_CODE_DATA);
    await fs.mkdir(imageDir, { recursive: true });

    // ファイル名にタイムスタンプを追加して一意にする
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}_${imageData.name}`;
    const imagePath = path.join(imageDir, uniqueFileName);
    await fs.writeFile(imagePath, imageBuffer);

    return {
      ok: true,
      data: uniqueFileName,
    };
  } catch (error) {
    return {
      ok: false,
      message: "画像の保存に失敗しました",
    };
  }
}
