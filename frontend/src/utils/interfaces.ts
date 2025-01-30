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
  jobTitile: string;
}

export interface UserState {
  user: User[];
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
  budget: number;
}
