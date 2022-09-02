import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let baseURL = "https://quiero-web.com/claire-p6-backend";
// adding first param to get IMG acf fields, author id and title
// adding second param to get image urls, array or id from acf
let mediasURL = `${baseURL}/wp-json/wp/v2/medias?_fields=author,title.rendered,acf&acf_format=standard`;

export const getMedias = createAsyncThunk("medias/getMedias", async () => {
  const response = await axios.get(mediasURL);
  return response.data;
});

export const mediasSlice = createSlice({
  name: "medias",
  initialState: {
    medias: [],
    mediasLoading: "idle",
    mediasError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMedias.pending, (state, action) => {
      if (state.mediasLoading === "idle") {
        state.mediasLoading = "pending";
      }
    });

    builder.addCase(getMedias.fulfilled, (state, action) => {
      if (state.mediasLoading === "pending") {
        state.medias = action.payload;
        state.mediasLoading = "idle";
      }
    });

    builder.addCase(getMedias.rejected, (state, action) => {
      if (state.mediasLoading === "pending") {
        state.mediasLoading = "idle";
        state.mediasError = "Error";
      }
    });
  },
});

export default mediasSlice.reducer;
