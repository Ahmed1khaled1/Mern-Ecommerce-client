import { capturePayment } from "@/store/shop/OrderSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturn() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const currentOrderId = JSON.parse(
        sessionStorage.getItem("currentOrderId")
      );
      dispatch(
        capturePayment({ paymentId, payerId, orderId: currentOrderId })
      ).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <div>
      <div className="w-full text-center ">
        <h1 className="text-2xl font-bold m-5">
          Processing Payment... Please Wait{" "}
        </h1>
        <div className="bg-background border-4  border-b-blue-400 border-r-blue-400 border-t-blue-400 border-white w-20 h-20 mx-auto rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default PaypalReturn;
