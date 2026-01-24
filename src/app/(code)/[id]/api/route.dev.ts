import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  const rndId = Math.random().toString(36).substring(2, 10);

  const dirPath = path.join(process.cwd(), "public", "data", "codes", rndId);
  await fs.mkdir(dirPath, { recursive: true });
  return NextResponse.json({
    message: `Success make dir: ${dirPath}`,
    id: rndId,
  });
}
