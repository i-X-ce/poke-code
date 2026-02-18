import { CodeDataInput } from "@/lib/types/CodeDataModel";
import { useLoading } from "../useLoading";
import { PATH } from "@/lib/constant/paths";

export const useSaveCode = () => {
  const { isLoading: isSaving, startLoading } = useLoading();

  const saveCodeFetcher = async (updateCodeData: CodeDataInput) => {
    return await startLoading(async () => {
      const response = await fetch(PATH.api.CODE_CREATE, {
        method: "PUT",
        body: JSON.stringify(updateCodeData),
      });
      const data = response;
      if (!data.ok) {
        throw new Error("コードデータの一時保存に失敗しました");
      }
      return await data.json();
    });
  };

  return {
    isSaving,
    saveCodeFetcher,
  };
};
