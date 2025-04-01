import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/index";


const initialState = {
  isLoading: false,
  reviews: [],
};

export const getReviews = createAsyncThunk("/review/get", async (id) => {
  const result = await axios.get(`${API_URL}/shop/review/${id}`);
  return result?.data;
});

export const addReview = createAsyncThunk("/review/add", async (formdata) => {
  const result = await axios.post(`${API_URL}/shop/review/add/`, formdata);
  return result?.data;
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
