import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    searchTerm: "",
  },
  reducers: {
    addExpenses: (state, { payload }) => {
      state.expenses = payload;
    },
  },
});

export const { addExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
