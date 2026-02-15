import { PATH } from "@/lib/constant/paths";
import { useLoading } from "../useLoading";
import { CodeData } from "@/lib/types/CodeDataModel";

export const useImageUpload = () => {
  const { isLoading, startLoading } = useLoading();

  const uploadImageFetcher = async (file: File, id?: CodeData["id"]) => {
    return await startLoading(async () => {
      const reader = new FileReader();
      const readFile = () =>
        new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            if (typeof reader.result === "string") {
              resolve(reader.result.split(",")[1]); // Base64データのみを取得
            } else {
              reject(new Error("ファイルの読み込みに失敗しました"));
            }
          };
          reader.onerror = () => {
            reject(new Error("ファイルの読み込みに失敗しました"));
          };
          reader.readAsDataURL(file);
        });

      const base64Data = await readFile();
      const imageData = {
        name: file.name,
        data: base64Data,
      };

      const response = await fetch(PATH.api.IMAGE, {
        method: "POST",
        body: JSON.stringify({
          imageData,
          id,
        }),
      });

      if (!response.ok) {
        throw new Error("画像のアップロードに失敗しました");
      }

      return await response.text();
    });
  };

  return {
    isLoading,
    uploadImageFetcher,
  };
};
