import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});
// The store now has redux-thunk added and the Redux DevTools Extension is turned on

export default store;
