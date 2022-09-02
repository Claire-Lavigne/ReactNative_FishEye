import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let baseURL = "https://quiero-web.com/claire-p6-backend";
let tagsURL = `${baseURL}/wp-json/wp/v2/tags`;

export const getTags = createAsyncThunk("tags/getTags", async () => {
  const response = await axios.get(tagsURL);
  return response.data;
});

export const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [],
    tagsLoading: "idle",
    tagsError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTags.pending, (state, action) => {
      if (state.tagsLoading === "idle") {
        state.tagsLoading = "pending";
      }
    });

    builder.addCase(getTags.fulfilled, (state, action) => {
      if (state.tagsLoading === "pending") {
        state.tags = action.payload;
        state.tagsLoading = "idle";
      }
    });

    builder.addCase(getTags.rejected, (state, action) => {
      if (state.tagsLoading === "pending") {
        state.tagsLoading = "idle";
        state.tagsError = "Error";
      }
    });
  },
});

export default tagsSlice.reducer;
