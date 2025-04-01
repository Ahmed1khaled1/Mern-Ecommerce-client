import React from "react";
import { DialogContent } from "../ui/dialog";
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";

function OrderDetails({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="pt-10 font-semibold">
      <div className="space-y-2 ">
        <div className=" flex justify-between items-center">
          <p>Order ID</p>
          <p>{orderDetails?._id}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Order Date</p>
          <p>{orderDetails?.orderDate.slice(0, 10)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Order Price</p>
          <p>${orderDetails?.totalAmount}</p>
        </div>

        <div className="flex justify-between items-center">
          <p>Payment Method</p>
          <p>{orderDetails?.paymentMethod}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Payment Status</p>
          <p>{orderDetails?.paymentStatus}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Order Status</p>
          <Badge
            className={`px-3 py-1 rounded-full ${
              orderDetails?.orderStatus === "confirmed"
                ? "bg-green-500"
                : orderDetails?.orderStatus === "rejected"
                ? "bg-red-500"
                : ""
            } `}
          >
            <p>{orderDetails?.orderStatus}</p>
          </Badge>
        </div>
      </div>
      <hr />
      <div>
        <h1 className="font-bold">Order Details</h1>
        <div>
          {orderDetails?.cartItems &&
            orderDetails.cartItems.length > 0 &&
            orderDetails?.cartItems.map((item, i) => (
              <div
                className="flex flex-col md:flex-row justify-between md:items-center"
                key={i}
              >
                <p>{item?.title}</p>
                <div className="flex gap-5">
                  <p>quantity: {item?.quantity}</p>
                  <p>Price: ${item?.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <p className="font-bold">Shipping Info </p>
        <div className="text-muted-foreground ">
          <p>UserName: {user.userName}</p>
          <p>Adress: {orderDetails?.addressInfo?.address}</p>
          <p>City: {orderDetails?.addressInfo?.city}</p>
          <p>Pincode: {orderDetails?.addressInfo?.pincode}</p>
          <p>Phone: {orderDetails?.addressInfo?.phone}</p>
          <p>Notes: {orderDetails?.addressInfo?.notes}</p>
        </div>
      </div>
    </DialogContent>
  );
}

export default OrderDetails;
