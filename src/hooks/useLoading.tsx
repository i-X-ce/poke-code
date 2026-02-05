import { useState } from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = async (callback: Function) => {
    try {
      setIsLoading(true);
      return await callback();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, startLoading };
};
