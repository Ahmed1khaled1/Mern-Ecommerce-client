import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/index";

const initialState = {
  isLoading: false,
  adressList: [],
};

export const addNewAdress = createAsyncThunk(
  "/address/addadress",
  async (formData) => {
    const response = await axios.post(`${API_URL}/shop/address/add`, formData);
    return response.data;
  }
);

export const editAddress = createAsyncThunk(
  "/address/addadress",
  async ({ formData, userId, addressId }) => {
    const response = await axios.put(
      `${API_URL}/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return response.data;
  }
);

export const fetchAllAddress = createAsyncThunk(
  "/address/getadress",
  async (userId) => {
    const response = await axios.get(`${API_URL}/shop/address/get/${userId}`);
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/address/deletedress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `${API_URL}/shop/address/delete/${userId}/${addressId}`
    );
    return response.data;
  }
);

const adressSlice = createSlice({
  name: "adress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAdress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAdress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewAdress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adressList = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state) => {
        state.isLoading = false;
        state.adressList = [];
      });
  },
});

export default adressSlice.reducer;
