import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import adminProductSlice from "./admin/product-slice"
import shopProductSlice from "./shop/Product-slice";
import shoppingCartSlice from "./shop/Cart-slice";
import adressSlice from "./shop/AdressSlice";
import shoppingOrderSlice from "./shop/OrderSlice";
import adminOrderSlice from "./admin/OrderSlice";
import searchSlice from "./shop/SearchSlice";
import reviewhSlice from "./shop/ReviewSlice";
import commonSlice from "./CommonSlice"


const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductSlice,
    shopProduct: shopProductSlice,
    shoppingCart: shoppingCartSlice,
    adress: adressSlice,
    shoppingOrder: shoppingOrderSlice,
    adminOrder: adminOrderSlice,
    shopSearch: searchSlice,
    reviewhSlice: reviewhSlice,
    commonSlice: commonSlice,
  },
});

export default store;