export const PATH = {
  HOME: "/",
  DETAIL: (id: string | number) => `/${id}`,
  CREATE: "/create",
  EDIT: (id: string | number) => `/${id}/edit`,
  HEADERS: "/data/headers.json",

  api: {
    CODE: (id: string = "") => `/api/codes/${id}`, // GET, PUT, DELETE
    CODE_CREATE: `/api/codes/create`, // POST, GET, PUT
  },

  server: {
    CODE_DATA: (id: string = "") => `/public/data/codes/${id}`,
    TEMPORARY_CODE_DATA: `/public/data/temporary/`,
    HEADERS: `/public/data/headers.json`, // コードデータのヘッダー一覧ファイルパス
  },
} as const;
