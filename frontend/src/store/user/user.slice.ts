import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../../utils/interfaces";

const initialState: UserState = {
  user: [
    {
      userId: 1,
      firstName: "Jane",
      middleName: "B.",
      lastName: "Smith",
      aboutMe:
        "An experienced UI/UX designer with a love for minimalistic design.",
      email: "janesmith@example.com",
      password: "StrongPass456!",
      gender: "Female",
      dateOfBirth: "1992-08-25",
      phoneNumber: "+1 987-654-3210",
      education: "Master's in Graphic Design",
      city: "New York",
      website: "https://janesmith.design",
      state: "New York",
      streetAddress: "456 Broadway Ave",
      jobTitile: "UI/UX Designer",
      budgetLimit: 7000,
      profilePicture: "https://example.com/profile2.jpg",
      zipCode: "10001",
      isLoggedIn: false,
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user.push(action.payload);
    },
    updateUser: (
      state,
      action: PayloadAction<Partial<User> & { userId: number }>
    ) => {
      if (action.payload.userId === 0) {
        state.user.forEach((user) => {
          user.isLoggedIn = false;
        });
      } else {
        const index = state.user.findIndex(
          (user) => user.userId === action.payload.userId
        );
        if (index !== -1) {
          state.user[index] = { ...state.user[index], ...action.payload };
        }
      }
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
