import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types/user";

type State = {
  authenticated: boolean;
  currentUser: User | null;
};

const initialState: State = {
  authenticated: false,
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<User>) => {
      state.authenticated = true;
      state.currentUser = {
        email: action.payload.email,
        photoUrl: "/user.png",
      };
    },
    signOut: (state) => {
      state.authenticated = false;
      state.currentUser = null;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
