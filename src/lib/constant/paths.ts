export const IMAGE_FOLDER = "images";

export const PATH = {
  HOME: "/",
  DETAIL: (id: string | number) => `/${id}`,
  CREATE: "/create",
  EDIT: (id: string | number) => `/${id}/edit`,
  HEADERS: "/data/headers.json",
  IMAGES: (id?: string) => `/data/${id ? `codes/${id}` : "temporary"}/`,

  GITHUB_PAGES: "https://i-x-ce.github.io/poke-code/",

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
