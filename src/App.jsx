import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Registre";
import Layout from "./components/admin-view/Layout";
import Dashboard from "./pages/admin-view/Dashboard";
import Orders from "./pages/admin-view/Orders";
import Products from "./pages/admin-view/Products";
import Features from "./pages/admin-view/Features";
import ShoppingLayout from "./components/shopping-view/Layout";
import Account from "./pages/shopping-view/Account";
import Checkout from "./pages/shopping-view/Checkout";
import Home from "./pages/shopping-view/Home";
import Listing from "./pages/shopping-view/Listing";
import CheckAuth from "./components/common/Check-auth";
import UnAuth from "./pages/unauth-page";
import NotFound from "./pages/not-found";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturn from "./pages/shopping-view/PaypalReturn";
import PaymentSuccess from "./pages/shopping-view/PaymentSuccess";
import Search from "./pages/shopping-view/Search";

function App() {
  const { user, isAuthentecated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-full bg-black h-screen" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthentecated={isAuthentecated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthentecated={isAuthentecated} user={user}>
              <Layout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="features" element={<Features />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthentecated={isAuthentecated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="account" element={<Account />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<Listing />} />
          <Route path="paypal-return" element={<PaypalReturn />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="/unauth" element={<UnAuth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
