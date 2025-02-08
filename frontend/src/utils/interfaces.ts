export interface User {
  userId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  aboutMe: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  education: string;
  city: string;
  website: string;
  state: string;
  streetAddress: string;
  budgetLimit: number;
  profilePicture: string;
  zipCode: string;
  isLoggedIn: boolean;
  jobTitle: string;
  fatherName: string;
}

export interface ExpenseFormData {
  _id?: string;
  title: string;
  date: string;
  price: number;
}

export interface UserState {
  user: User | null;
  isDrawerOpen: boolean;
  isLoggedIn: boolean;
}
export interface ExpenseState {
  expenses: ExpenseFormData[];
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  budgetLimit: number;
}
