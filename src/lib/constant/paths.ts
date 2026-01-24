export const PATH = {
  HOME: "/",
  DETAIL: (id: string | number) => `/${id}`,
  CREATE: "/create",
  EDIT: (id: string | number) => `/edit/${id}`,
};
