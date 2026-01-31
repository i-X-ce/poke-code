import React from "react";
import CreateView from "./_component/CreateView";
import { loadTemporaryCodeData } from "@/lib/service/server/headers";

interface CreatePageProps {}

const CreatePage: React.FC<CreatePageProps> = async () => {
  const tempDataResult = await loadTemporaryCodeData();
  const { data, message } = tempDataResult;

  return <CreateView initData={data} errorMessage={message} />;
};

export default CreatePage;
