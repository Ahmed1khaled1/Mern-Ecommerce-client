import ProductDetails from "@/components/shopping-view/ProductDetails";
import ProductTile from "@/components/shopping-view/ProductTile";
import { Input } from "@/components/ui/input";
import { addToCart, fetchCartItem } from "@/store/shop/Cart-slice";
import { fetchProduct } from "@/store/shop/Product-slice";
import { getSearchResults, resetSearshResults } from "@/store/shop/SearchSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

function Search() {
  const [keyword, setKeyword] = React.useState("");
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);

  const { searchResults } = useSelector((state) => state.shopSearch);
  const [searchParams, setSearchParams] = useSearchParams();
  const { productDetails } = useSelector((state) => state.shopProduct);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length >= 3) {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(getSearchResults(keyword));
    } else {
      dispatch(resetSearshResults());
    }
  }, [keyword]);

  console.log(searchResults);

  const handleGetProductDetails = (productId) => {
    setOpen(true);
    dispatch(fetchProduct(productId));
  };

  const handleAddToCart = (productId, getTotalStock) => {
    let getCartItems = cartItems?.items || [];
    if (getCartItems.length) {
      const indexofCurrentItem = getCartItems.findIndex(
        (item) => item.productId === productId
      );
      if (indexofCurrentItem >= 0) {
        const getQuantity = getCartItems[indexofCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(`Only ${getQuantity} can be added for this items`);
          return;
        }
      }
      dispatch(
        addToCart({ userId: user?.id, productId: productId, quantity: 1 })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItem(user?.id));
          toast.success("Product Added To Cart");
        }
      });
    }
  };

  return (
    <div className="">
      <div className="m-4">
        <Input
          className="py-6 max-w-2xl m-4 mx-auto"
          placeholder="Search for product..."
          value={keyword}
          name="keyword"
          onChange={(event) => setKeyword(event.target.value)}
        />
      </div>
      {!searchResults.length ? (
        <div className="text-2xl text-center font-bold">
          No Results Found...
        </div>
      ) : null}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5 sm:px-10 md:px-15 lg:px-20 w-full">
        {searchResults &&
          searchResults.length > 0 &&
          searchResults.map((item, index) => (
            <div key={index}>
              <ProductTile
                handleGetProductDetails={handleGetProductDetails}
                product={item}
              />
            </div>
          ))}
      </div>
      <ProductDetails
        productDetails={productDetails}
        open={open}
        setOpen={setOpen}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default Search;
