import path from "path";
import fs from "fs/promises";
import React from "react";
import { createMockCodeData } from "@/lib/model/CodeDataModel";
import CodeView from "../_components/CodeView";

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
  const codesDirectory = path.join(process.cwd(), "src/data/codes");
  const filenames = await fs.readdir(codesDirectory);

  const ids = filenames.map((filename) => ({
    id: filename.replace(/\.json$/, ""),
  }));
  return ids;
}

async function getCodeData(id: string) {
  return createMockCodeData(1);
}

export default CodePage;
