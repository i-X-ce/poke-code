import { updateHeadersFile } from "@/service/server/codes";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const { ok } = await updateHeadersFile();

    if (!ok) {
      throw new Error("ヘッダーファイルの更新に失敗しました");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
};
