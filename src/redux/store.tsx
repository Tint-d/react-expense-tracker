import { configureStore } from "@reduxjs/toolkit";
import { expenseApi } from "./api/expenseApi";
import expenseSlice from "./services/expenseSlice";
import { categoryApi } from "./api/categoryApi";

export const store = configureStore({
  reducer: {
    expense: expenseSlice,
    [expenseApi.reducerPath]: expenseApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      expenseApi.middleware,
      categoryApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
