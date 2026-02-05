import { readCode } from "@/service/server/codes";
import CreateView from "../../create/_component/CreateView";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

const EditPage: React.FC<EditPageProps> = async ({ params }) => {
  const { id } = await params;
  const { data, message } = await readCode(id);

  return <CreateView mode="edit" initData={data} errorMessage={message} />;
};

export default EditPage;
