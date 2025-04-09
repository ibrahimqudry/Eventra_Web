import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import savedEventsReducer from "./savedEventsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    savedEvents: savedEventsReducer,
  },
});

export default store;
