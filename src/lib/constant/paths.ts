export const PATH = {
  HOME: "/",
  DETAIL: (id: string | number) => `/${id}`,
  CREATE: "/create",
  EDIT: (id: string | number) => `/${id}/edit`,
  HEADERS: "/data/headers.json",

  server: {
    CODE_DATA: (id: string = "") => `/public/data/codes/${id}`,
    TEMPORARY_CODE_DATA: `/public/data/temporary/`,
    HEADERS: `/public/data/headers.json`, // コードデータのヘッダー一覧ファイルパス
  },
} as const;
