import React, { useState } from "react";
import account from "../../assets/account.jpg";
import Adresses from "@/components/shopping-view/Adresses";
import CartItemContent from "@/components/shopping-view/CartItemContent";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/OrderSlice";
import { toast } from "sonner";

function Checkout() {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shoppingOrder);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [paymentStart, setPaymentStart] = useState(false);
  const dispatch = useDispatch();

  const totalPrice =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, item) =>
            sum +
            (item?.salePrice > 0 ? item.salePrice : item.price) *
              item?.quantity,
          0
        )
      : 0;

  const handlePayment = () => {
    if (!currentAddress) {
      toast.warning("Please select Adress");
      return;
    }
    if (!cartItems || !cartItems.items || cartItems.items.length === 0) {
      toast.warning("Your cart is empty!");
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((cartItem) => ({
        productId: cartItem?.productId,
        title: cartItem?.title,
        image: cartItem?.image,
        price: cartItem.salePrice > 0 ? cartItem?.salePrice : cartItem?.price,
        quantity: cartItem?.quantity,
      })),
      addressInfo: {
        address: currentAddress?.address,
        addressId: currentAddress?._id,
        city: currentAddress?.city,
        phone: currentAddress?.phone,
        pincode: currentAddress?.pincode,
        notes: currentAddress?.notes,
      },
      orderStatus: "Pending",
      paymentMethod: "Paypal",
      paymentStatus: "Pending",
      totalAmount: totalPrice,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setPaymentStart(true);
      } else {
        setCurrentAddress(false);
      }
    });
  };
  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div>
      <div className="w-full aspect-[1600/700] md:aspect-[1600/300]">
        <img
          src={account}
          alt="account"
          className="w-full h-full object-center object-cover aspect-[1600/300]"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 m-5">
        <div className="border p-5 rounded-md">
          <Adresses
            setCurrentAddress={setCurrentAddress}
            selectedId={currentAddress}
          />
        </div>
        <div className="border p-5 rounded-md h-fit">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item, index) => (
                <div key={index}>
                  <CartItemContent item={item} />
                </div>
              ))
            : null}
          <div className="flex justify-between items-center font-bold mt-5">
            <p>Total</p>
            <p>${totalPrice}</p>
          </div>
          <div>
            <Button onClick={handlePayment} className="w-full mt-3">
              {paymentStart ? "Processing Payment" : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
