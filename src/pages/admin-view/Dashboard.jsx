import ImageUploade from "@/components/admin-view/ImageUploade";
import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  deleteFeatureImage,
  getFeatureImages,
} from "@/store/CommonSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function Dashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const dispatch = useDispatch();
  const { featureImagesList } = useSelector((state) => state.commonSlice);

  const handleUploadePaner = () => {
    if (!uploadedImageUrl) {
      toast.error("No image selected!");
      return;
    }
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  };
  const handleDelete = (getImageId) => {
    dispatch(deleteFeatureImage(getImageId)).then((data) => {

      if (data?.payload?.success) {
        dispatch(getFeatureImages());
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col">
      <ImageUploade
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
      />
      <Button
        onClick={handleUploadePaner}
        className="w-full max-w-md mx-auto my-5 "
      >
        Uploade
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImagesList && featureImagesList.length > 0
          ? featureImagesList.map((featureImgItem, index) => (
              <div className="relative" key={index}>
                <img
                  src={featureImgItem?.image}
                  className="w-full h-[300px] object-cover rounded-t-lg relative"
                />
                <Button
                  onClick={() => handleDelete(featureImgItem?._id)}
                  className="absolute right-2 bottom-2"
                >
                  Delete
                </Button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Dashboard;
