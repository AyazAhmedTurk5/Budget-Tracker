import { combineReducers } from "redux";
import userReducer from "./user/user.slice";
import expenseReducer from "./expenses/expenses.slice";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  user: userReducer,
  expenses: expenseReducer,
});

export default rootReducer;
