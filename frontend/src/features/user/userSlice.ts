import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  budget: number;
}

const initialState: UserState = {
  firstName: "",
  lastName: "",
  email: "",
  budget: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.budget = action.payload.budget;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
