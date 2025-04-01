import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

function AdressCard({
  adressInfo,
  handleEdit,
  handleDelete,
  setCurrentAddress,
  selectedId,
}) {

  return (
    <div
      onClick={setCurrentAddress ? () => setCurrentAddress(adressInfo) : null}
      className={`cursor-pointer bg-white p-4 rounded-md shadow space-y-2 border ${
        selectedId?._id === adressInfo?._id ? "border-blue-500 border-4" : "border-black"
      }`}
    >
      <Label>Adress: {adressInfo?.address}</Label>
      <Label>City: {adressInfo?.city}</Label>
      <Label>Pincode: {adressInfo?.pincode}</Label>
      <Label>Phone: {adressInfo?.phone}</Label>
      <Label>Notes: {adressInfo?.notes}</Label>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={() => handleEdit(adressInfo)}>Edit</Button>
        <Button onClick={() => handleDelete(adressInfo)}>Delete</Button>
      </div>
    </div>
  );
}

export default AdressCard;
