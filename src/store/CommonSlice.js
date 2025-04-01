import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config/index";

const initialState = {
  isLoading: true,
  featureImagesList: [],
};

export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(`${API_URL}/common/feature/get`);
    return response.data;
  }
);
export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    // Accept image as an argument
    const response = await axios.post(`${API_URL}/common/feature/add`, {
      image,
    });
    return response.data;
  }
);

export const deleteFeatureImage = createAsyncThunk(
  "/order/delete",
  async (id) => {
    const result = await axios.delete(`${API_URL}/common/feature/delete/${id}`);
    return result?.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImagesList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImagesList = [];
      });
  },
});
export default commonSlice.reducer;
