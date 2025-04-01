import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { setProductDetails } from "@/store/shop/Product-slice";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../common/Rating";
import { Input } from "../ui/input";
import { addReview, getReviews } from "@/store/shop/ReviewSlice";
import { toast } from "sonner";

function ProductDetails({ open, setOpen, productDetails, handleAddToCart }) {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.auth)
  const { reviews } = useSelector((state) => state.reviewhSlice);
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails(null));
    setRating(0)
    setReviewMsg("")
  };

  const handleRatingChange = (getRating) => {
    setRating(getRating);
  };

  const handleAddReview = ()=>{
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data)=>{if(data?.payload?.success){
      setRating(0)
      setReviewMsg("")
      dispatch(getReviews(productDetails?._id))
    }else{
      toast.warning("You already reviewed this product!");
    }})
  }

  useEffect(()=>{
    if(productDetails !== null ){
      dispatch(getReviews(productDetails?._id))
    }
  },[productDetails])

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogHeader className="sr-only">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 max-w-[90vw] md:max-w-[80vw] lg:max-w-[50vw] overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-none">
        <img
          src={productDetails?.image}
          alt={productDetails?.title}
          className="w-100  aspect-square object-contain bg-gray-50 rounded-lg"
        />
        <div className="md:p-6">
          <h1 className="text-3xl font-bold">{productDetails?.title} </h1>
          <p className="text-muted-foreground text-lg mt-2 line-clamp-3">
            {productDetails?.description}
          </p>
          <div className="flex items-center justify-between text-2xl font-bold mt-2">
            <p
              className={`${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice ? (
              <p className="font-bold">{productDetails?.salePrice}$</p>
            ) : (
              ""
            )}{" "}
          </div>
          <div className="flex items-center mt-2">
            <Rating rating={averageReview} />

            <p className="ml-2 text-xl">({averageReview.toFixed(2)})</p>
          </div>
          {productDetails?.totalStock === 0 ? (
            <Button disabled className="cursor-pointer w-full mt-3">
              Out of Stock
            </Button>
          ) : (
            <Button
              onClick={() => {
                handleAddToCart(productDetails._id, productDetails?.totalStock);
              }}
              className="cursor-pointer w-full mt-3"
            >
              Add To Cart
            </Button>
          )}

          <hr className="my-3" />
          <div className="mt-3 flex flex-col gap-2">
            <p className="font-semibold text-xl">Write a review</p>
            <div className="flex">
              <Rating rating={rating} handleRatingChange={handleRatingChange} />
            </div>
            <Input
              placeholder="write a review..."
              name="reviewMsg"
              value={reviewMsg}
              onChange={(e) => setReviewMsg(e.target.value)}
            />
            <Button onClick={handleAddReview} disabled={reviewMsg === ""}>
              Submit
            </Button>
          </div>
          <p className="font-bold text-xl mt-5">Reviews</p>
          <div className="overflow-y-auto max-h-[200px]">
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="flex  gap-2 mt-5">
                  <Avatar className=" w-10 h-10 mt-">
                    <AvatarFallback className="text-xl font-bold pb-2">
                      {review.userName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">{review?.userName}</p>
                    <div className="flex items-start">
                      <Rating rating={review?.reviewValue} />
                    </div>
                    <p className="text-sm">{review?.reviewMessage}</p>
                  </div>
                </div>
              ))
            ) : (
              <h1>No reviews</h1>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetails;
