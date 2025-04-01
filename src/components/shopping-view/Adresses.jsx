import { addressFormControls } from "@/config";
import {
  addNewAdress,
  editAddress,
  fetchAllAddress,
  deleteAddress,
} from "@/store/shop/AdressSlice";
import React, { useEffect, useState } from "react";
import CommonForm from "../common/Form";
import { useDispatch, useSelector } from "react-redux";
import AdressCard from "./AdressCard";
import { toast } from "sonner";


const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Adresses({ setCurrentAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [editAddressId, setEditAddressId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { adressList } = useSelector((state) => state.adress);

  const handleMangeAdresses = (event) => {
    event.preventDefault();
    editAddressId !== null
      ? dispatch(
          editAddress({
            formData,
            userId: user?.id,
            addressId: editAddressId,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id));
            setFormData(initialAddressFormData);
            setEditAddressId(null);
            toast.success("Adress Updated Successfully");
          }
        })
      : dispatch(addNewAdress({ ...formData, userId: user?.id })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllAddress(user?.id));
              setFormData(initialAddressFormData);
              toast.success("Adress Created Successfully");
            }
          }
        );
  };

  const handleEdit = (address) => {
    setEditAddressId(address._id);
    setFormData({
      ...formData,
      address: address.address,
      city: address.city,
      phone: address.phone,
      pincode: address.pincode,
      notes: address.notes,
    });
  };

  const handleDelete = (address) => {
    dispatch(deleteAddress({ userId: user?.id, addressId: address._id })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddress(user?.id));
        }
      }
    );
  };

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch, user?.id]);

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  return (
    <div className="w-full">
      <div className="">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {adressList && adressList.length > 0
            ? adressList.map((singleAdress) => (
                <div key={singleAdress._id}>
                  <AdressCard
                    adressInfo={singleAdress}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    setCurrentAddress={setCurrentAddress}
                    selectedId={selectedId}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
      <div className="">
        <h1 className="text-2xl font-bold py-5">Add New Adress</h1>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleMangeAdresses}
          buttonText={editAddressId !== null ? "Edit" : "Add"}
          isButtonDisabld={!isFormValid()}
        />
      </div>
    </div>
  );
}

export default Adresses;
