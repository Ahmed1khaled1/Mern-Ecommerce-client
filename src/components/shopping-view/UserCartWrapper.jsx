import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import CartItemContent from "./CartItemContent";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function UserCartWrapper({ cartItems, setOpenCart }) {
  const navigate = useNavigate();
  const totalPrice =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, item) =>
            sum +
            (item?.salePrice > 0 ? item.salePrice : item.price) *
              item?.quantity,
          0
        )
      : 0;
  return (
    <SheetContent className="max-h-screen overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-xl font-bold ">Your Cart Items</SheetTitle>
      </SheetHeader>
      <div className="px-5">
        <div>
          {cartItems && cartItems.length > 0
            ? cartItems.map((item, index) => (
                <div key={index} className="mb-4">
                  <CartItemContent item={item} />
                </div>
              ))
            : ""}
        </div>
        <div className="flex justify-between items-center font-bold mt-5">
          <p>Total</p>
          <p>${totalPrice}</p>
        </div>
        <Button
          onClick={() => {
            if (cartItems.length === 0) {
              toast.warning(
                "Your cart is empty. Please add items to your cart before checking out."
              );
              return;
            }
            navigate("/shop/checkout");
            setOpenCart(false);
          }}
          className="w-full my-5"
        >
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
