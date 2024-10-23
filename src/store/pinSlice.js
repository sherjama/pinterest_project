import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  totalpins: 0,
  pins: [],
  searchResult: [],
  isSearching: false,
  savedPins: [],
  savedPinsDATA: [],
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
    addSearchPins: (state, action) => {
      state.searchResult = action.payload;
      state.isSearching = true;
    },
    deleteSearchPins: (state, action) => {
      state.searchResult = 0;
      state.isSearching = false;
    },
    saved: (state, action) => {
      state.savedPins = action.payload.documents;
    },
    displaySaved: (state, action) => {
      state.savedPinsDATA = action.payload;
    },
  },
});

export const {
  addPins,
  deletePins,
  addSearchPins,
  deleteSearchPins,
  saved,
  displaySaved,
} = pinSlice.actions;

export default pinSlice.reducer;
