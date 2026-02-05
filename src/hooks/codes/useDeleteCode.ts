import { CodeData } from "@/lib/types/CodeDataModel";
import { useLoading } from "../useLoading";
import { PATH } from "@/lib/constant/paths";

export const useDeleteCode = () => {
  const { isLoading, startLoading } = useLoading();

  const deleteCodeFetcher = async (id: CodeData["id"]) => {
    return await startLoading(async () => {
      const response = await fetch(PATH.api.CODE(id), {
        method: "DELETE",
      });
      const data = response;
      if (!data.ok) {
        throw new Error("コードデータの削除に失敗しました");
      }
      return await data.json();
    });
  };

  return {
    isLoading,
    deleteCodeFetcher,
  };
};
