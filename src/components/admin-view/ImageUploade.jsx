import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { API_URL } from "@/config";

function ImageUploade({
  imageFile,
  setImageFile,
  setUploadedImageUrl,
  editMode,
}) {
  const inputRef = useRef(null);

  const handleImageFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };
  const uploadeImage = async () => {

    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `${API_URL}/admin/products/upload-image`,
      data
    );
    if (response?.data?.success) setUploadedImageUrl(response.data.result.url);
  };
  useEffect(() => {
    if (imageFile !== null) uploadeImage();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Label htmlFor="image-upload" className="w-full mb-4">
        Upload Image
      </Label>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 p-5 border-muted border-dashed rounded-lg"
      >
        {editMode ? (
          ""
        ) : (
          <Input
            type="file"
            id="image-upload"
            ref={inputRef}
            onChange={handleImageFileChange}
            className="hidden"
          />
        )}
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              editMode ? "opacity-50" : "cursor-pointer"
            } flex flex-col  justify-center items-center`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-5" />
            <span>Drag & Drop or Click to upload</span>
          </Label>
        ) : (
          <div className="relative">
            <img
              src={URL.createObjectURL(imageFile)}
              alt=""
              className="relative"
            />
            <Button
              className="absolute -top-4 -right-4 h-6 w-6"
              onClick={() => {
                setImageFile(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
            >
              <XIcon className="" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUploade;
