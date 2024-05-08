import { createSlice } from "@reduxjs/toolkit";
import { setItem, removeItem } from "@/helpers/persistance-storage";

const initialState = {
  isLoading: false,
  loggedIn: false,
  error: null,
  user: {
    id: "" || null,
    firstName: "" || null,
    lastName: "" || null,
    username: "" || null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUserStart: (state) => {
      state.isLoading = true;
    },
    signUserSuccess: (state, action) => {
      state.loggedIn = true;
      state.isLoading = false;
      state.user = action.payload;
      setItem("token", action.payload.token);
    },
    signUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = {
        firstName: null,
        lastName: null,
        username: null,
        id: null,
      };
      state.loggedIn = false;
      removeItem("token");
    },
    setUserData: (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
    },
  },
});

export const {
  signUserFailure,
  signUserStart,
  signUserSuccess,
  logoutUser,
  setUserData,
} = authSlice.actions;
export default authSlice.reducer;
