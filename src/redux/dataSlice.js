import { createSlice } from "@reduxjs/toolkit";

const data = require("../../data.json");
const allPhotographers = data[0].photographers;
const allMedias = data[0].media;
const allTags = allPhotographers.map((item) => item.tags);
const mergeDeduplicate = (arr) => {
  return [...new Set([].concat(...arr))];
};

const initialState = {
  data: data,
  allPhotographers: allPhotographers,
  allMedias: allMedias,
  photographerID: "",
  mediasByID: [],
  tags: mergeDeduplicate(allTags),
  currentTag: "",
  sortBy: "likes",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCurrentTag: (state, action) => {
      state.currentTag = action.payload;
    },
    setPhotographerID: (state, action) => {
      state.photographerID = action.payload;
    },
    setCurrentPhotographer: (state, action) => {
      state.allPhotographers = action.payload;
    },
    setCurrentMedias: (state, action) => {
      state.mediasByID = action.payload;
    },
    sortMediasBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setCurrentTag,
  setPhotographerID,
  setCurrentPhotographer,
  setCurrentMedias,
  sortMediasBy,
} = dataSlice.actions;

export default dataSlice.reducer;
