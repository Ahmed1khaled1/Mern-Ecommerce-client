import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

function ProductTile({ product, handleGetProductDetails }) {
  
  return (
    <div
      onClick={() => handleGetProductDetails(product?._id)}
      className=" bg-white rounded-sm shadow-xl overflow-hidden "
    >
      <div className="relative">
        <img
          src={product?.image || "https://placehold.co/150?text=No+Photo"}
          alt=""
          className="h-60 w-full object-contain bg-gray-50"
        />
        {product?.totalStock === 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 font-bold">
            Out of Stock
          </Badge>
        ) : product?.totalStock <= 10 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 font-bold">
            {product?.totalStock} items left in Stock
          </Badge>
        ) : 
        product?.salePrice > 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 font-bold">
            Sale
          </Badge>
        ) : null}
      </div>
      <div className="p-4">
        <p className="font-bold line-clamp-1 text-xl">{product.title}</p>
        <div className="flex justify-between items-center">
          <p>{product?.category} </p>
          <p>{product?.brand} </p>
        </div>
        <div className="flex justify-between items-center">
          <p
            className={`font-bold mt-2 ${
              product?.salePrice ? "line-through" : ""
            }`}
          >
            {product?.price}$
          </p>
          {product?.salePrice ? (
            <p className="font-bold">{product?.salePrice}$</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductTile;
