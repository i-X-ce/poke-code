import { SearchOptions } from "@/lib/types/SearchOptions";
import { useSearchParams } from "next/navigation";

export const useURLQuery = () => {
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams.toString());

  const updateQuery = (option: Partial<SearchOptions>) => {
    Object.entries(option).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        queryParams.delete(key);
      } else if (Array.isArray(value)) {
        queryParams.delete(key);
        value.forEach((v) => queryParams.append(key, v));
      } else {
        queryParams.set(key, String(value));
      }
    });

    const queryString = queryParams.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
    window.location.reload();
  };

  return { queryParams, updateQuery };
};
