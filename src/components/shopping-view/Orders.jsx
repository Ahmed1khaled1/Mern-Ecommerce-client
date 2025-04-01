import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import OrderDetails from "./OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUser,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/OrderSlice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetails, setOpenDetails] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector(
    (state) => state.shoppingOrder
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersByUser(user.id));
  }, [dispatch]);

  const handleGetOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId));
  };

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetails(true);
    }
    
  }, [orderDetails]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.orderDate.slice(0, 10)}</TableCell>
              <TableCell>
                <Badge
                  className={`px-3 py-1 rounded-full ${
                    order?.orderStatus === "confirmed"
                      ? "bg-green-500"
                      : order?.orderStatus === "rejected"
                      ? "bg-red-500"
                      : ""
                  } `}
                >
                  <p>{order?.orderStatus}</p>
                </Badge>
              </TableCell>
              <TableCell>${order.totalAmount}</TableCell>
              <TableCell>
                <Dialog
                  open={openDetails}
                  onOpenChange={() => {
                    setOpenDetails(false);
                    dispatch(resetOrderDetails());
                  }}
                >
                  <DialogHeader className="sr-only">
                    <DialogTitle>Orders</DialogTitle>
                    <DialogDescription>orders</DialogDescription>
                  </DialogHeader>
                  <Button onClick={() => handleGetOrderDetails(order._id)}>
                    View
                  </Button>
                  <OrderDetails order={order} orderDetails={orderDetails} />
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ShoppingOrders;
