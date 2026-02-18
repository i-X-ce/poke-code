import { PATH } from "@/lib/constant/paths";
import { useLoading } from "../useLoading";

export const useRefresh = () => {
  const { isLoading, startLoading } = useLoading();

  const refreshFetcher = async () => {
    return await startLoading(async () => {
      const response = await fetch(PATH.api.REFRESH, {
        method: "POST",
      });
      const data = await response.json();
      if (!data.ok) {
        throw new Error("リフレッシュに失敗しました");
      }

      return data;
    });
  };

  return {
    isLoading,
    refreshFetcher,
  };
};
