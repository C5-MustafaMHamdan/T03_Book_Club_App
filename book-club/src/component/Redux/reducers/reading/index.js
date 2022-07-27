import { createSlice } from "@reduxjs/toolkit";

export const readingList = createSlice({
  name: "readingList",
  initialState: {
    readingList: [],
  },
  reducers: {
    setReadingList: (state, action) => {
      state.readingList = action.payload;
    },
    addToReadingList: (state, action) => {
      state.readingList.push(action.payload);
    },

    removeFromReadingList: (state, action) => {
      state.readingList = state.readingList.filter((reader, index) => {
        return reader.id != action.payload;
      });
    },
  },
});

export const { setReadingList, addToReadingList, removeFromReadingList } =
readingList.actions;

export default readingList.reducer;