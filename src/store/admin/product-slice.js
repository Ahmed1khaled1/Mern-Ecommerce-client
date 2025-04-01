import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/index";


const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(`${API_URL}/admin/products/add`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result?.data;
  }
);
export const fetchAllProducts = createAsyncThunk(
  "/products/getall",
  async () => {
    const result = await axios.get(`${API_URL}/admin/products/get`);
    return result?.data?.data;
  }
);
export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${API_URL}/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "/products/delete",
  async ({ id }) => {
    const result = await axios.delete(`${API_URL}/admin/products/delete/${id}`);
    return result?.data;
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductSlice.reducer;
