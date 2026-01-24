import path from "path";
import fs from "fs/promises";
import React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { createMockCodeData } from "@/lib/model/CodeDataModel";
import CodeInfo from "@/app/_components/CodeInfo";
import CodeTags from "@/app/_components/CodeTags";
import CustomMarkdown from "@/app/_components/CustomMarkdown";
import CodeContentView from "@/app/_components/CodeContentView";

interface CodePageProps {
  params: Promise<{ id: string }>;
}

const CodePage: React.FC<CodePageProps> = async ({ params }) => {
  const { id } = await params;
  const data = await getCodeData(id);

  if (!data) {
    return <div>Code not found</div>;
  }

  return (
    <div>
      <Typography
        variant="h4"
        fontWeight={"500"}
        gutterBottom
        color="textPrimary">
        {data.title}
      </Typography>
      <Stack gap={2}>
        <CodeTags data={data} />
        <CodeInfo data={data} />
        <Typography color="textSecondary">{data.detail}</Typography>
        <Divider />
      </Stack>
      <CustomMarkdown>{data.description}</CustomMarkdown>
      <CodeContentView content={data.content} />
    </div>
  );
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
