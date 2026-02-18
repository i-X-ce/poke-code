import React from "react";
import CreateView from "./_component/CreateView";
import { loadTemporaryCodeData } from "@/service/server/codes";
import { Metadata } from "next";
import { PROJECT_NAME } from "@/lib/constant/projectName";

export const metadata: Metadata = {
  title: `コード作成 - ${PROJECT_NAME}`,
  description: "コードの作成ページです",
};

interface CreatePageProps {}

const CreatePage: React.FC<CreatePageProps> = async () => {
  const tempDataResult = await loadTemporaryCodeData();
  const { data, message } = tempDataResult;

  return <CreateView mode="create" initData={data} errorMessage={message} />;
};

export default CreatePage;
