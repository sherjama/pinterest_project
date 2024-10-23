import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

const loadSlice = createSlice({
  name: "Loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadSlice.actions;

export default loadSlice.reducer;
