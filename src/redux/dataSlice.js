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
  dataByID: {},
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCurrentTag: (state, action) => {
      state.currentTag = action.payload;
    },
    setCurrentData: (state, action) => {
      state.dataByID = action.payload;
    },
    setCurrentPhotographer: (state, action) => {
      state.photographers = action.payload;
    },
    setCurrentMedias: (state, action) => {
      state.medias = action.payload;
    },
    sortMediasBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setCurrentTag,
  setCurrentData,
  setCurrentPhotographer,
  setCurrentMedias,
  sortMediasBy,
} = dataSlice.actions;

export default dataSlice.reducer;
