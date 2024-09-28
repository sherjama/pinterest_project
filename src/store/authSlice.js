import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: JSON.parse(localStorage.getItem("status")),
  userdata: JSON.parse(localStorage.getItem("userdata")),
  session: JSON.parse(localStorage.getItem("session")),
  id: JSON.parse(localStorage.getItem("id")),
  password: JSON.parse(localStorage.getItem("password")),
};

const authSlice = createSlice({
  name: "authStatus",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userdata = action.payload;
      state.id = action.payload.id;
      state.password = action.payload.password;
    },
    logout: (state, action) => {
      state.status = false;
      state.userdata = null;
      state.session = null;
      state.id = "";
      state.password = "";
    },
    session: (state, action) => {
      state.session = action.payload;
    },
  },
});

export const { login, logout, session } = authSlice.actions;

export default authSlice.reducer;
