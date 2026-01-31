import path from "path";
import fs from "fs/promises";
import React from "react";
import { createMockCodeData } from "@/lib/model/CodeDataModel";
import CodeView from "../_components/CodeView";
import { PATH } from "@/lib/constant/paths";
import { readCode } from "@/lib/service/server/codes";

interface CodePageProps {
  params: Promise<{ id: string }>;
}

const CodePage: React.FC<CodePageProps> = async ({ params }) => {
  const { id } = await params;
  const data = await getCodeData(id);

  if (!data) {
    return <div>Code not found</div>;
  }

  return <CodeView data={data} />;
};

export async function generateStaticParams() {
  const codesDirectory = path.join(process.cwd(), PATH.server.CODE_DATA());
  const filenames = await fs.readdir(codesDirectory);

  const ids = filenames.map((filename) => ({
    id: filename.replace(/\.json$/, ""),
  }));
  return ids;
}

async function getCodeData(id: string) {
  try {
    const result = await readCode(id);
    if (result.ok) {
      return result.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export default CodePage;
