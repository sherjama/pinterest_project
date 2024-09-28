import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalpins: 0,
  pins: [],
};

const pinSlice = createSlice({
  name: "pin",
  initialState,
  reducers: {
    addPins: (state, action) => {
      state.totalpins = action.payload.total;
      state.pins = action.payload.documents;
    },
    deletePins: (state, action) => {
      state.totalpins = 0;
      state.pins = [];
    },
  },
});

export const { addPins, deletePins } = pinSlice.actions;

export default pinSlice.reducer;
