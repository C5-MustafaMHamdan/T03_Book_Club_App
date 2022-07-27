import { configureStore } from "@reduxjs/toolkit";

// import the reducer
import authReducer from "./reducers/auth";
import bookReducer from "./reducers/books";
 
export default configureStore({
  reducer: {
    // add the reducers to the store
    auth: authReducer,
    books:bookReducer
  },
});
