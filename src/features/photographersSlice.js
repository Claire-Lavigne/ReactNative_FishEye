import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let baseURL = "https://quiero-web.com/claire-p6-backend";
// adding first param to get only acf fields and author id
// adding second param to get image urls, array or id from acf
let profilURL = `${baseURL}/wp-json/wp/v2/profil?_fields=author,acf&acf_format=standard`;

export const getPhotographers = createAsyncThunk(
  "photographers/getPhotographers",
  async () => {
    const response = await axios.get(profilURL);
    return response.data;
  }
);

export const photographersSlice = createSlice({
  name: "photographers",
  initialState: {
    photographers: [],
    photographerID: null,
    photographersLoading: "idle",
    photographersError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPhotographers.pending, (state, action) => {
      if (state.photographersLoading === "idle") {
        state.photographersLoading = "pending";
      }
    });

    builder.addCase(getPhotographers.fulfilled, (state, action) => {
      if (state.photographersLoading === "pending") {
        state.photographers = action.payload;
        state.photographerID = action.payload;
        state.photographersLoading = "idle";
      }
    });

    builder.addCase(getPhotographers.rejected, (state, action) => {
      if (state.photographersLoading === "pending") {
        state.photographersLoading = "idle";
        state.photographersError = "Error";
      }
    });
  },
});

export default photographersSlice.reducer;
