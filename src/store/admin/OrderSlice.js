import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/index";


const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

export const getAllOrdersByAdmin = createAsyncThunk(
  "/admin/order/getallorders",
  async () => {
    const response = await axios.get(`${API_URL}/admin/orders/get`);
    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getorderdetails",
  async (id) => {
    const response = await axios.get(`${API_URL}/admin/orders/details/${id}`);
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateorderstatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(`${API_URL}/admin/orders/update/${id}`, {
      orderStatus,
    });
    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersByAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
