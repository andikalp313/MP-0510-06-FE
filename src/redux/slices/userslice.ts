import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  points: string;
  discountValue: string;
  couponsExpiryDate:Date;
  pointsExpiryDate: Date;
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
  points: "",
  discountValue: "",
  couponsExpiryDate: new Date(),
  pointsExpiryDate: new Date(),
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
      state.couponsExpiryDate = action.payload.couponsExpiryDate;
      state.pointsExpiryDate = action.payload.pointsExpiryDate;
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
      state.points = "";
      state.discountValue = "";
      state.couponsExpiryDate = new Date();
      state.pointsExpiryDate = new Date();
    },
    updateUserAction: (state, action: PayloadAction<Partial<UserState>>) => {
      const { id, name, email, address, profilePicture } = action.payload;
      if (id !== undefined) state.id = id;
      if (name !== undefined) state.name = name;
      if (email !== undefined) state.email = email;
      if (address !== undefined) state.address = address;
      if (profilePicture !== undefined) state.profilePicture = profilePicture;
    },
  },
});

export const { loginAction, logoutAction, updateUserAction } = userSlice.actions;
export default userSlice.reducer;
