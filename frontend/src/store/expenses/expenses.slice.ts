import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExpenseFormData, ExpenseState } from "../../utils/interfaces";

const initialState: ExpenseState = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseFormData>) => {
      state.expenses.push(action.payload);
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(
        (expense) => expense._id !== action.payload
      );
    },
    editExpense: (
      state,
      action: PayloadAction<{ id: string; updatedExpense: ExpenseFormData }>
    ) => {
      const { id, updatedExpense } = action.payload;
      const expenseIndex = state.expenses.findIndex(
        (expense) => expense._id === id
      );
      if (expenseIndex !== -1) {
        state.expenses[expenseIndex] = {
          ...state.expenses[expenseIndex],
          ...updatedExpense,
        };
      }
    },
  },
});

export const { addExpense, deleteExpense, editExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
