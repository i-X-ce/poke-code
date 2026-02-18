import { readCode } from "@/service/server/codes";
import CreateView from "../../create/_component/CreateView";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: EditPageProps): Promise<Metadata> {
  const { id } = await params;
  const { data } = await readCode(id);

  if (!data) {
    return {
      title: "コードが見つかりません",
      description: "指定されたコードは存在しません",
    };
  }

  return {
    title: `${data.title}を編集`,
    description: `コード「${data.title}」の編集ページです`,
  };
}

interface EditPageProps {
  params: Promise<{ id: string }>;
}

const EditPage: React.FC<EditPageProps> = async ({ params }) => {
  const { id } = await params;
  const { data, message } = await readCode(id);

  return <CreateView mode="edit" initData={data} errorMessage={message} />;
};

export default EditPage;
