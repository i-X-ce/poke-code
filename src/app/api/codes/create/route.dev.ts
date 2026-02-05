import { CodeDataInput } from "@/lib/types/CodeDataModel";
import {
  createCode,
  loadTemporaryCodeData,
  saveCodeData,
} from "@/service/server/codes";
import { NextRequest, NextResponse } from "next/server";

/**
 * 一時保存したデータの取得
 */
export const GET = async () => {
  try {
    const { ok, data } = await loadTemporaryCodeData();
    if (!ok) {
      throw new Error("一時データの読み込みに失敗しました");
    }
    return NextResponse.json(data);
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

/**
 * コードデータの作成
 *
 * @param req
 * @returns
 */
export const POST = async (req: NextRequest) => {
  try {
    const reqData: CodeDataInput = await req.json();
    const { ok, data } = await createCode(reqData);
    if (!ok) {
      throw new Error("コードデータの作成に失敗しました");
    }
    return NextResponse.json({ ok: true, data });
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

/**
 * コードデータの一時保存
 *
 * @param req
 * @returns
 */
export const PUT = async (req: NextRequest) => {
  try {
    const reqData: CodeDataInput = await req.json();
    const { ok } = await saveCodeData(reqData);
    if (!ok) {
      throw new Error("コードデータの一時保存に失敗しました");
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
