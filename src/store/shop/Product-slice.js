import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/index";


const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const fetchAllProducts = createAsyncThunk(
  "/products/getall",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const result = await axios.get(`${API_URL}/shop/products/get?${query}`);
    return result?.data;
  }
);

export const fetchProduct = createAsyncThunk(
  "/products/product",
  async (id) => {
    const result = await axios.get(`${API_URL}/shop/products/get/${id}`);
    return result?.data;
  }
);

const shopProductSlice = createSlice({
  name: "shopProduct",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
        state.productDetails = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});
export const { setProductDetails } = shopProductSlice.actions;

export default shopProductSlice.reducer;
