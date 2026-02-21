import isDevelopment from "../util/isDevelopment";
import { BASE_PATH, USER_ID } from "./userSetting";

export const IMAGE_FOLDER = "images";

/**
 * basePathを考慮してパスを生成する
 *
 * @param path
 * @returns
 */
export const withBasePath = (path: string) => {
  if (!path.startsWith("/") || isDevelopment) {
    return path;
  }

  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) {
    return path;
  }

  if (path === "/") {
    return BASE_PATH;
  }

  return `${BASE_PATH}${path}`;
};

export const PATH = {
  HOME: "/",
  DETAIL: (id: string | number) => `/${id}`,
  CREATE: "/create",
  EDIT: (id: string | number) => `/${id}/edit`,
  HEADERS: withBasePath("/data/headers.json"),
  IMAGES: (id?: string) => `/data/${id ? `codes/${id}` : "temporary"}/`,

  GITHUB_PAGES: `https://${USER_ID}.github.io${BASE_PATH}/`,

  api: {
    CODE: (id: string = "") => `/api/codes/${id}`, // GET, PUT, DELETE
    CODE_CREATE: `/api/codes/create`, // POST, GET, PUT
    IMAGE: `/api/images`, // POST
    REFRESH: `/api/codes/refresh`, // POST
  },

  server: {
    CODE_DATA: (id: string = "") => `/public/data/codes/${id}`,
    TEMPORARY_CODE_DATA: `/public/data/temporary/`,
    HEADERS: `/public/data/headers.json`, // コードデータのヘッダー一覧ファイルパス
    IMAGES: (id?: string) =>
      `/public/data/${id ? `codes/${id}` : "temporary"}/${IMAGE_FOLDER}/`,
  },
} as const;
