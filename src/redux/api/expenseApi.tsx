import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Expense } from "../../types/type";

export const expenseApi = createApi({
  reducerPath: "expenseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/expense",
  }),
  endpoints: (builder) => ({
    getExpense: builder.query<Expense, number>({
      query: (page) => `/?page=${page}`,
    }),
    getExpenseByCategory: builder.query<Expense, string>({
      query: (id) => `/category/${id}`,
    }),
  }),
});

export const { useGetExpenseQuery, useGetExpenseByCategoryQuery } = expenseApi;
