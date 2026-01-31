import React from "react";
import CreateView from "./_component/CreateView";
import { loadTemporaryCodeData } from "@/service/server/codes";

interface CreatePageProps {}

const CreatePage: React.FC<CreatePageProps> = async () => {
  const tempDataResult = await loadTemporaryCodeData();
  const { data, message } = tempDataResult;

  return <CreateView initData={data} errorMessage={message} />;
};

export default CreatePage;
