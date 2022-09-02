import { configureStore } from "@reduxjs/toolkit";
import photographersReducer from "../features/photographersSlice";
import mediasReducer from "../features/mediasSlice";
import tagsReducer from "../features/tagsSlice";

// The store has redux-thunk and Redux DevTools Extension
const store = configureStore({
  reducer: {
    photographers: photographersReducer,
    medias: mediasReducer,
    tags: tagsReducer,
  },
});

export default store;
