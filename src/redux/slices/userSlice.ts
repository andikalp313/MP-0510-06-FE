import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface UserState {
  id: number;
  name: string;
  email: string;
  token: string;
  organizerName: string;
  address: string;
  role: string;
  profilePicture: string;
  referralCode: string;
  points: number | null;
  discountValue: number | null;
}

const initialState: UserState = {
  id: 0,
  name: "",
  email: "",
  token: "",
  organizerName: "",
  address: "",
  role: "",
  profilePicture: "",
  referralCode: "",
  points: 0,
  discountValue: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.organizerName = action.payload.organizerName;
      state.address = action.payload.address;
      state.role = action.payload.role;
      state.profilePicture = action.payload.profilePicture;
      state.referralCode = action.payload.referralCode;
      state.points = action.payload.points;
      state.discountValue = action.payload.discountValue;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.name = "";
      state.email = "";
      state.token = "";
      state.organizerName = "";
      state.address = "";
      state.role = "";
      state.profilePicture = "";
      state.referralCode = "";
      state.points = 0;
      state.discountValue = 0;
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
