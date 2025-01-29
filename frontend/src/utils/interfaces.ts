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
}

export interface UsersState {
  users: User[];
  isLoggedIn: boolean;
}
