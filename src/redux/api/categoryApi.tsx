import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "../../types/type";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/category",
  }),
  endpoints: (builder) => ({
    getCategory: builder.query<Category, void>({
      query: () => `/`,
    }),
  }),
});

export const { useGetCategoryQuery } = categoryApi;
