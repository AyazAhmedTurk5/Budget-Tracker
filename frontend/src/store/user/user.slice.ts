import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../../utils/interfaces";

const initialState: UserState = {
  isDrawerOpen: false,
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload; // Set login state
    },
    setToggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const { setUser, updateUser, setToggleDrawer, setLoggedIn } =
  userSlice.actions;
export default userSlice.reducer;
