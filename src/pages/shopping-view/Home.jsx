import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Airplay,
  BabyIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import ProductTile from "@/components/shopping-view/ProductTile";
import ProductDetails from "@/components/shopping-view/ProductDetails";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, fetchProduct } from "@/store/shop/Product-slice";
import { addToCart, fetchCartItem } from "@/store/shop/Cart-slice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getFeatureImages } from "@/store/CommonSlice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

function Home() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProduct
  );
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const { featureImagesList } = useSelector((state) => state.commonSlice);

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProduct(productId));
  };
  
  const handleAddToCart = (productId) => {
    dispatch(
      addToCart({ userId: user?.id, productId: productId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItem(user?.id));
        toast.success("Product Added To Cart");
      }
    });
  };

  const handleNavigate = (currentItem, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = { [section]: [currentItem.id] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  };

  useEffect(() => {
    dispatch(
      fetchAllProducts({ filterParams: {}, sortParams: "price-lowtohigh" })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpen(true);
  }, [productDetails]);

    useEffect(() => {
      dispatch(getFeatureImages());
    }, [dispatch]);

  return (
    <div className="min-h-screen">
      <div className="relative">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent>
            {featureImagesList &&
              featureImagesList.length > 0 &&
              featureImagesList.map((slide, index) => (
                <CarouselItem key={index}>
                  <img
                    src={slide.image}
                    alt=""
                    className="w-full  aspect-16/9 md:aspect-16/6 object-cover"
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-4 " />
          <CarouselNext className="absolute top-1/2 right-4 " />
        </Carousel>
      </div>

      <div className="py-10 bg-muted mx-auto ">
        <div className="my-10">
          <h1 className="text-3xl font-bold text-center mb-6 ">
            Shop by categories
          </h1>
          <div className="flex max-md:flex-wrap justify-center gap-5 w-fit mx-auto max-md:max-w-[400px]">
            {categoriesWithIcon.map((category) => (
              <div
                onClick={() => handleNavigate(category, "category")}
                key={category.id}
                className="font-semibold md:text-xl flex flex-col items-center justify-center border-2
              bg-white p-4 rounded-2xl w-25 sm:w-30 cursor-pointer"
              >
                <category.icon />
                <span>{category.label} </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-center mb-6 ">
            Shop by brands
          </h1>
          <div className="flex max-lg:flex-wrap justify-center gap-5 w-fit mx-auto max-lg:max-w-[400px]">
            {brandsWithIcon.map((brand) => (
              <div
                onClick={() => handleNavigate(brand, "brand")}
                key={brand.id}
                className="font-semibold md:text-xl flex flex-col items-center justify-center border-2
              bg-white p-4 rounded-2xl  w-25 sm:w-30 cursor-pointer"
              >
                <brand.icon />
                <span>{brand.label} </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10">
        <h1 className="text-3xl font-bold text-center my-6 ">All Products</h1>
        <div className=" grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 mx-auto w-full py-5 p-5 md:px-20">
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

export default Home;
