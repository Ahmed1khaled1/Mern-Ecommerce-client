import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/index";


const initialState = {
  isLoading: false,
  cartItems: [],
};

export const addToCart = createAsyncThunk(
  "/cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(`${API_URL}/shop/cart/add`, {
      userId,
      productId,
      quantity,
    });
    return response.data;
  }
);
export const fetchCartItem = createAsyncThunk(
  "/cart/fetchCartItem",
  async (userId) => {
    const response = await axios.get(`${API_URL}/shop/cart/get/${userId}`);
    return response.data;
  }
);
export const deleteCartItem = createAsyncThunk(
  "/cart/delete",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${API_URL}/shop/cart/${userId}/${productId}`
    );
    return response.data;
  }
);
export const updateCartQuantity = createAsyncThunk(
  "/cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(`${API_URL}/shop/cart/update-cart`, {
      userId,
      productId,
      quantity,
    });
    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
