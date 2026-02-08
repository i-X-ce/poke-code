import { PATH } from "@/lib/constant/paths";
import { CodeDataInput } from "@/lib/types/CodeDataModel";
import { useLoading } from "../useLoading";

export const useCreateCode = () => {
  const { isLoading, startLoading } = useLoading();

  const createCodeFetcher = async (updateCodeData: CodeDataInput) => {
    return await startLoading(async () => {
      const response = await fetch(PATH.api.CODE_CREATE, {
        method: "POST",
        body: JSON.stringify(updateCodeData),
      });
      const data = response;
      if (!data.ok) {
        throw new Error("コードデータの作成に失敗しました");
      }
      return await data.json();
    });
  };

  return {
    isLoading,
    createCodeFetcher,
  };
};
