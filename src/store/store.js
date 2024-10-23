import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import pinSlice from "./pinSlice";
import loadSlice from "./loadSlice";

const store = configureStore({
  reducer: {
    authStatus: authSlice,
    pins: pinSlice,
    Loading: loadSlice,
  },
});

export default store;
