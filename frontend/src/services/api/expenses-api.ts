import { toast } from "react-toastify";
import { addExpense } from "../../store/expenses/expenses.slice";
import api from "./api";
import { AppDispatch } from "../../store/store";
import {
  ExpenseFormData,
  LoginFormData,
  RegisterFormData,
} from "../../utils/interfaces";

export const fetchExpenses = async (dispatch: AppDispatch) => {
  try {
    const response = await api.get("/budgets");
    const result = response.data;
    if (result.expenses) {
      dispatch(addExpense(result.expenses));
    }
  } catch (error) {
    toast.error(error as string);
  }
};
// Utility function for adding an expense
export const addExpenseApi = async (updatedExpense: ExpenseFormData) => {
  try {
    const response = await api.post("/budgets/add-expense", updatedExpense);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Utility function for deleting an expense
export const deleteExpenseApi = async (id: string) => {
  try {
    const response = await api.delete(`/budgets/delete-expense/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

// Utility function for editing an expense
export const editExpenseApi = async (
  id: string,
  updatedExpense: ExpenseFormData
) => {
  try {
    const response = await api.patch(
      `/budgets/edit-expense/${id}`,
      updatedExpense
    );
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const loginUser = async (data: LoginFormData) => {
  try {
    const response = await api.post("/budgets/login", data);
    return response.data; // Return the data so you can access it in the component
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong!"
    );
  }
};

export const signUpUser = async (data: RegisterFormData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.post("/budgets/signup", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      budgetLimit: data.budgetLimit,
    });

    return response.data; // Return response data for further handling
  } catch (error) {
    throw error; // Throw the error to be handled in the calling component
  }
};
