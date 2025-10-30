export const PATH = {
  HOME: "/",
  DETAIL: (id: string | number) => `/codes/${id}`,
  CREATE: "/create",
  EDIT: (id: string | number) => `/edit/${id}`,
};
