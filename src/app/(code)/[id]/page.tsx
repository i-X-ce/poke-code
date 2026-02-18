import path from "path";
import fs from "fs/promises";
import CodeView from "../_components/CodeView";
import { PATH } from "@/lib/constant/paths";
import MoreButton from "@/app/_components/MoreButton";
import { Stack } from "@mui/material";
import BookmarkButton from "@/app/_components/BookmarkButton";
import { readCode } from "@/service/server/codes";
import { Metadata } from "next";
import { PROJECT_NAME } from "@/lib/constant/projectName";

export async function generateStaticParams() {
  const codesDirectory = path.join(process.cwd(), PATH.server.CODE_DATA());
  const folderNames = await fs.readdir(codesDirectory);

  const ids = folderNames.map((folderName) => ({
    id: folderName,
  }));
  return ids;
}

export async function generateMetadata({
  params,
}: CodePageProps): Promise<Metadata> {
  const { id } = await params;
  const { data } = await readCode(id);

  if (!data) {
    return {
      title: "コードが見つかりません",
      description: "指定されたコードは存在しません",
    };
  }

  return {
    title: `${data.title} - ${PROJECT_NAME}`,
    description: data.description,
    keywords: data.tags,
  };
}

export interface CodePageProps {
  params: Promise<{ id: string }>;
}

const CodePage: React.FC<CodePageProps> = async ({ params }) => {
  const { id } = await params;
  const { data } = await readCode(id);

  if (!data) {
    return <div>Code not found</div>;
  }

  return (
    <>
      <CodeView data={data} />
      <Stack
        direction={"row"}
        position={"absolute"}
        p={{ xs: 0, md: 1 }}
        top={{ xs: -48, md: 0 }}
        right={0}
      >
        <BookmarkButton id={data.id} />
        <MoreButton id={data.id} />
      </Stack>
    </>
  );
};

export default CodePage;
