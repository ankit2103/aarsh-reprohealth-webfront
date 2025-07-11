// # Redux store configuration
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth.slice";
import userReducer from "../slice/user.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
