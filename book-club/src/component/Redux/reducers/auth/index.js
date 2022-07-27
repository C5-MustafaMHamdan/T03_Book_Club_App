import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || "",
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },

  reducers: {
    signin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },

    logout: (state, action) => {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.removeItem("token");
     
  
    },
  },
});

export const { signin, logout } = authSlice.actions;

export default authSlice.reducer;
