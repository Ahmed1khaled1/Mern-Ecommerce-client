import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import CommonForm from "@/components/common/Form";
import { addProductFormElements } from "@/config";
import ImageUploade from "@/components/admin-view/ImageUploade";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/product-slice";
import { toast } from "sonner";


const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function Products() {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [productId, setProductId] = useState(null);
  const { productList } = useSelector((state) => state.adminProduct);
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();

    productId !== null
      ? dispatch(editProduct({ id: productId, formData })).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenAddProduct(false);
            toast("Product Edited Successfully");
          }
        })
      : dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setImageFile(null);
              setFormData(initialFormData);
              setOpenAddProduct(false);
              toast("Product Added Successfully");
            }
          }
        );
  }
  

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  const handleDelete = (getProductId) => {
    dispatch(deleteProduct({id:getProductId})).then((data) => {
      console.log(getProductId);
      
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col items-center w-full h-full">
        <div className="flex justify-end w-full mb-10">
          <Button onClick={() => setOpenAddProduct(true)}>
            Add New Product
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
          {productList &&
            productList.map((product) => (
              <div
                key={product._id}
                className=" h-120 bg-white rounded-lg shadow-xl overflow-hidden"
              >
                <img
                  src={
                    product.image || "https://placehold.co/150?text=No+Photo"
                  }
                  alt=""
                  className="h-80 w-full object-cover"
                />
                <div className="p-4">
                  <p className="font-bold line-clamp-1 text-xl">
                    {product.title}
                  </p>
                  <div className="flex justify-between items-center">
                    <p
                      className={`font-bold mt-2 ${
                        product.salePrice ? "line-through" : ""
                      }`}
                    >
                      {product.price}$
                    </p>
                    {product.salePrice ? (
                      <p className="font-bold">{product.salePrice}$</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-5">
                    <Button
                      onClick={() => {
                        setOpenAddProduct(true);
                        setProductId(product._id);
                        setFormData(product);
                      }}
                    >
                      Edit
                    </Button>
                    <Button onClick={()=>handleDelete(product?._id)}>Delete</Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Sheet
        open={openAddProduct}
        onOpenChange={() => {
          setOpenAddProduct(false);
          setProductId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent
          className="max-h-screen overflow-y-auto"
          aria-describedby={undefined}
        >
          <SheetHeader>
            <SheetTitle className="font-bold text-center">
              {productId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <div className="px-4">
            <ImageUploade
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              productId={productId}
              editMode={productId !== null}
            />
          </div>

          <div className="p-4">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              isButtonDisabld={!isFormValid()}
              buttonText={
                productId !== null ? "Edit Product" : "Add New Product"
              }
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Products;
