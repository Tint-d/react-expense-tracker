export interface Expense {
  message: string;
  totalExpense: number;
  expenses: ExpenseType[];
  totalCount: number;
}

export interface ExpenseType {
  _id: string;
  title: string;
  amount: number;
  date: string;
  notes: string;
  currency: string;
  category: string;
}

export interface CategoryType {
  _id: string;
  name: string;
}

export interface Category {
  message: string;
  totalCount: number;
  category: CategoryType[];
}
