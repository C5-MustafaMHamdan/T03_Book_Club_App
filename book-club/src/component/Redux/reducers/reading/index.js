import { createSlice } from "@reduxjs/toolkit";

export const readingList = createSlice({
  name: "readingList",
  initialState: {
    readingList: [],

    /*  readingList : JSON.parse(localStorage.getItem("readList")) || [];
  */
  },
  reducers: {
    setReadingList: (state, action) => {
      state.readingList = action.payload;
    },
    addToReadingList: (state, action) => {
      console.log(action.payload);
      state.readingList.push(action.payload);

/* readingList.push(action.payload);
    localStorage.setItem("readList", JSON.stringify(readList)); */

    },

    removeFromReadingList: (state, action) => {
      state.readingList = state.readingList.filter((reader, index) => {
        console.log(reader,"ggggggggggggggggggg");
        return reader.id != action.payload;
      });
    },
  },
});

export const { setReadingList, addToReadingList, removeFromReadingList } =
readingList.actions;

export default readingList.reducer;