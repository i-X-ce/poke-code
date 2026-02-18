import { CodeDataInput } from "@/lib/types/CodeDataModel";
import { deleteCode, readCode, updateCode } from "@/service/server/codes";
import { NextRequest, NextResponse } from "next/server";

/**
 * コードデータの取得(paramsでID指定)
 */
export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const { ok, data, message } = await readCode(id);
    if (!ok) {
      throw new Error(message || "コードデータの読み込みに失敗しました");
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
 * コードデータの更新
 *
 * @param req
 * @param param1
 * @returns
 */
export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const reqData: CodeDataInput = await req.json();

    if (id !== reqData.id) {
      throw new Error("IDが一致しません");
    }

    const { ok, message } = await updateCode(id, reqData);
    if (!ok) {
      throw new Error(message || "コードデータの更新に失敗しました");
    }
    return NextResponse.json({ ok: true, data: id });
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
 * コードデータの削除(ID指定)
 *
 * @param param1
 * @returns
 */
export const DELETE = async (
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const { ok, message } = await deleteCode(id);
    if (!ok) {
      throw new Error(message || "コードデータの削除に失敗しました");
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
