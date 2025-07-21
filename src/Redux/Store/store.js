import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../States/authSlice";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSlice } from "../App/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
setupListeners(store.dispatch);


