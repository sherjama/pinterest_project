import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import pinSlice from "./pinSlice";

const store = configureStore({
  reducer: {
    authStatus: authSlice,
    pins: pinSlice,
  },
});

export default store;
