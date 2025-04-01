import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/Cart-slice";
import { toast } from "sonner";

function CartItemContent({ item }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { productList } = useSelector((state) => state.shopProduct);
  const dispatch = useDispatch();

  const handleDeleteCartItem = (cartItem) => {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: cartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Product removed Successfully");
      }
    });
  };

  const handleUpdateCartItem = (cartItem, typeOfAction) => {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems?.items || [];

      if (getCartItems?.length > 0) {
        const indexOfCurrentItem = getCartItems?.findIndex(
          (item) => item.productId === cartItem.productId
        );

        const indexOfCurrentProduct = productList?.findIndex(
          (product) => product._id === cartItem.productId
        );
        const getTotalStock = productList[indexOfCurrentProduct]?.totalStock;

        if (indexOfCurrentItem >= 0) {
          const getQuantity = getCartItems[indexOfCurrentItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast.error(`Only ${getQuantity} can be added for this items`);
            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: cartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? cartItem?.quantity + 1
            : cartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Product updated Successfully");
      }
    });
  };

  return (
    <div>
      <div className="flex gap-2">
        <img
          className="w-20 min-w-20 h-20 rounded object-cover "
          src={item.image}
          alt=""
        />
        <div className="w-full">
          <div className="flex justify-between ">
            <p className="font-bold line-clamp-1">{item.title}</p>
            <Trash2
              onClick={() => handleDeleteCartItem(item)}
              className="text-gray-500 cursor-pointer min-w-6"
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-2 items-center ">
              <Button
                variant="outline"
                className="rounded-full w-8 h-8"
                disabled={item?.quantity === 1}
                onClick={() => handleUpdateCartItem(item, "minus")}
              >
                <Minus />
              </Button>
              <p className="font-bold">{item.quantity}</p>
              <Button
                variant="outline"
                className="rounded-full w-8 h-8"
                onClick={() => handleUpdateCartItem(item, "plus")}
              >
                <Plus />
              </Button>
            </div>
            <p className="font-bold">
              {(
                (item.salePrice ? item.salePrice : item.price) * item.quantity
              ).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <hr className="my-1" />
    </div>
  );
}

export default CartItemContent;
