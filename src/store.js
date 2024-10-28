// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";

const store = configureStore({
  reducer: {
    product: productReducer, // Make sure the 'product' key is used here
  },
});

export default store;
