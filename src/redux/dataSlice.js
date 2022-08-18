import { createSlice } from "@reduxjs/toolkit";

const data = require("../../data.json");
const photographers = data[0].photographers;
const medias = data[0].media;
const allTags = photographers.map((item) => item.tags);
const mergeDeduplicate = (arr) => {
  return [...new Set([].concat(...arr))];
};

const initialState = {
  photographers,
  medias,
  tags: mergeDeduplicate(allTags),
  currentTag: "",
  photographerByID: {},
  mediaByID: {},
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCurrentTag: (state, action) => {
      state.currentTag = action.payload;
    },
    setCurrentPhotographer: (state, action) => {
      state.photographerByID = action.payload;
    },
    setCurrentMedias: (state, action) => {
      state.mediaByID = action.payload;
    },
  },
});

export const { setCurrentTag, setCurrentPhotographer, setCurrentMedias } =
  dataSlice.actions;

export default dataSlice.reducer;
