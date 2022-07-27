import { configureStore } from "@reduxjs/toolkit";

// import the reducer
import authReducer from "./reducers/auth";
 
export default configureStore({
  reducer: {
    // add the reducers to the store
    auth: authReducer,
    
  },
});
