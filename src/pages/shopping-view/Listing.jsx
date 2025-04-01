import Filters from "@/components/shopping-view/Filters";
import ProductDetails from "@/components/shopping-view/ProductDetails";
import ProductTile from "@/components/shopping-view/ProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItem } from "@/store/shop/Cart-slice";
import { fetchAllProducts, fetchProduct } from "@/store/shop/Product-slice";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

function Listing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProduct
  );
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const [sort, setSort] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const categorySearchParams = searchParams.get("category");

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProduct(productId));
  };

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (section, option) => {
    let copyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(copyFilters).indexOf(section);

    if (indexOfCurrentSection < 0) {
      copyFilters = { ...copyFilters, [section]: [option] };
    } else {
      const indexOfCurrentOption = copyFilters[section].indexOf(option);
      if (indexOfCurrentOption < 0) {
        copyFilters[section].push(option);
      } else {
        copyFilters[section].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  };

  const createSearchParamsHelper = (filterParams) => {
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParams))
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    return queryParams.join("&");
  };

  const handleAddToCart = (getproductId, getTotalStock) => {
    
    let getCartItems = cartItems?.items || [];
    
    if (getCartItems.length) {
      const indexofCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getproductId
      );
      if (indexofCurrentItem >= 0) {
        const getQuantity = getCartItems[indexofCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(`Only ${getQuantity} can be added for this items`);
          return;
        }
      }
    }
    dispatch(
      addToCart({ userId: user?.id, productId: getproductId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItem(user?.id));
        toast.success("Product Added To Cart");
      }
    });
  };

  useEffect(() => {
    setSort("price-lowtohigh");

    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParams]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if ((filters !== null, sort !== null))
      dispatch(fetchAllProducts({ filterParams: filters, sortParams: sort }));
  }, [dispatch, filters, sort]);

  useEffect(() => {
    if (productDetails !== null) setOpen(true);
  }, [productDetails]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItem(user?.id));
    }
  }, [dispatch, user?.id]); 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] p-5 gap-6 w-full">
      <Filters filters={filters} handleFilter={handleFilter} />
      <div className="w-full">
        <div className="border-b pb-2 flex justify-between items-center">
          <h1 className="font-bold  text-xl">ALL Products</h1>
          <div className="mr-5">
            <span className="text-muted-foreground mr-2">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <ArrowUpDown />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-14 xl:mr-10" sideOffset={5}>
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem value={option.id} key={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 mx-auto w-full py-5 p-5 md:p-10">
          {productList.map((product) => (
            <div key={product._id}>
              <ProductTile
                handleGetProductDetails={handleGetProductDetails}
                product={product}
              />
            </div>
          ))}
        </div>
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

export default Listing;
