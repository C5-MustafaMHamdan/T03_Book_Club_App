import { createSlice } from "@reduxjs/toolkit";

export const books = createSlice({
  name: "books",
  initialState: {
    books: [],
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    addBook: (state, action) => {
      state.books.push(action.payload);
    },

    deleteBookById: (state, action) => {
      state.articles = state.articles.filter((book, index) => {
        return book.id != action.payload;
      });
    },
  },
});

export const { setBooks, addBook, deleteBookById } =
  books.actions;

export default books.reducer;