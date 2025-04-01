import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import CommonForm from "../common/Form";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByAdmin,
  getOrderDetails,
  updateOrderStatus,
} from "@/store/admin/OrderSlice";

const initialFormData = {
  status: "",
};

function OrderDetails({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    const { status } = formData;
    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetails(orderDetails?._id));
        dispatch(getAllOrdersByAdmin());
        setFormData(initialFormData);
      }
    });
  };
  return (
    <DialogContent className="pt-10 font-semibold">
      <div className="space-y-2 ">
        <div className="flex justify-between items-center">
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
        <div className="">
          {orderDetails?.cartItems &&
            orderDetails.cartItems.length > 0 &&
            orderDetails?.cartItems.map((item, i) => (
              <div
                className="flex flex-col md:flex-row justify-between md:items-center"
                key={i}
              >
                <p>{item?.title}</p>
                <div className="flex gap-5 text-muted-foreground">
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
      <div>
        <CommonForm
          formControls={[
            {
              label: "Order Status",
              name: "status",
              componentType: "select",
              options: [
                { id: "pending", label: "Pending" },
                { id: "inProcess", label: "In Process" },
                { id: "inShipping", label: "In Shipping" },
                { id: "delivered", label: "Delivered" },
                { id: "rejected", label: "Rejected" },
                { id: "confirmed", label: "Confirmed" },
              ],
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Update"}
          onSubmit={handleUpdate}
        />
      </div>
    </DialogContent>
  );
}

export default OrderDetails;
