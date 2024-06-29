import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import paperSlice from "../features/paperSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    paper: paperSlice,
  },
});
