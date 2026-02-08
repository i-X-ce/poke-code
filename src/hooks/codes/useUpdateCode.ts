import { CodeData, CodeDataInput } from "@/lib/types/CodeDataModel";
import { useLoading } from "../useLoading";
import { PATH } from "@/lib/constant/paths";

export const useUpdateCode = () => {
  const { isLoading: isUpdating, startLoading } = useLoading();

  const updateCodeFetcher = async (
    id: CodeData["id"],
    updateCodeData: CodeDataInput,
  ) => {
    return await startLoading(async () => {
      const response = await fetch(PATH.api.CODE(id), {
        method: "PUT",
        body: JSON.stringify(updateCodeData),
      });
      const data = response;
      if (!data.ok) {
        throw new Error("コードデータの更新に失敗しました");
      }
      return await data.json();
    });
  };

  return {
    isUpdating,
    updateCodeFetcher,
  };
};
