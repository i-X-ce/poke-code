import { saveImage } from "@/service/server/images";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { imageData, id } = await request.json();
    const { ok, data } = await saveImage(imageData, id);

    if (!ok) {
      throw new Error("画像のアップロードに失敗しました");
    }
    console.log("画像が保存されました:", data);
    return new NextResponse(data);
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: (error as Error).message,
      }),
      { status: 500 },
    );
  }
};
