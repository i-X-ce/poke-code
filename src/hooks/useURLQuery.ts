import { PATH } from "@/lib/constant/paths";
import { PokeVersions, PokeVersionType } from "@/lib/types/PokeVersion";
import { SearchOptions } from "@/lib/types/SearchOptions";
import { useRouter, useSearchParams } from "next/navigation";

export const useURLQuery = () => {
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const parsedParams: Partial<SearchOptions> = (() => {
    const params: Partial<SearchOptions> = {};

    const page = searchParams.get("page");
    if (page !== null) params.page = Number(page);

    const limit = searchParams.get("limit");
    if (limit !== null) params.limit = Number(limit);

    const q = searchParams.get("q");
    if (q) params.q = q;

    const tags = searchParams.getAll("tags");
    if (tags.length) params.tags = tags;

    const versions = searchParams.getAll("versions");
    const validVersions = versions.filter((v) =>
      Object.values(PokeVersions).includes(v as PokeVersionType),
    ) as PokeVersionType[];
    if (validVersions.length) params.versions = validVersions;

    const sizeMin = searchParams.get("sizeMin");
    if (sizeMin !== null) params.sizeMin = Number(sizeMin);

    const sizeMax = searchParams.get("sizeMax");
    if (sizeMax !== null) params.sizeMax = Number(sizeMax);

    const orderBy = searchParams.get("orderBy") as SearchOptions["orderBy"];
    if (orderBy) params.orderBy = orderBy;

    const orderDirection = searchParams.get(
      "orderDirection",
    ) as SearchOptions["orderDirection"];
    if (orderDirection) params.orderDirection = orderDirection;

    const onlyBookmarked = searchParams.get("onlyBookmarked");
    if (onlyBookmarked !== null)
      params.onlyBookmarked = onlyBookmarked === "true";

    return params;
  })();

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
    const newUrl = `${PATH.HOME}?${queryString}`;
    router.replace(newUrl);
    router.refresh();
  };

  const toggleArrayQuery = (key: keyof SearchOptions, value: string) => {
    const currentValues = parsedParams[key] || [];
    if (!Array.isArray(currentValues)) return;

    if (currentValues.includes(value)) {
      const newValues = currentValues.filter((v) => v !== value);
      updateQuery({ [key]: newValues.length ? newValues : undefined });
    } else {
      updateQuery({ [key]: [...currentValues, value] });
    }
  };

  return { parsedParams, searchParams, updateQuery, toggleArrayQuery };
};
